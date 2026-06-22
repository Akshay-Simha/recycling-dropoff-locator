import { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Navigation, Star, Phone, Clock, Filter, AlertTriangle, Sparkles, Check, Key, Share2 } from 'lucide-react';
import centersData from '../data/centers.json';
import { RecyclingCenter } from '../types';

// Extract the Google Maps API Key
const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY.trim() !== '';

// Available materials for filter pills
const FILTER_MATERIALS = [
  { id: 'all', label: 'All Materials' },
  { id: 'paper', label: 'Paper' },
  { id: 'batteries', label: 'Batteries' },
  { id: 'tires', label: 'Tires' },
  { id: 'scrap_metal', label: 'Scrap Metal' },
  { id: 'aluminum', label: 'Aluminium' },
  { id: 'oil_filters', label: 'Oil Filters' },
];

// Helper to compute coordinates distance using Haversine formula
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

export default function StoreLocator() {
  const [centers, setCenters] = useState<RecyclingCenter[]>(centersData as RecyclingCenter[]);
  const [filteredCenters, setFilteredCenters] = useState<RecyclingCenter[]>(centersData as RecyclingCenter[]);
  const [selectedCenter, setSelectedCenter] = useState<RecyclingCenter | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  
  // Geolocation & nearest states
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestCenter, setNearestCenter] = useState<(RecyclingCenter & { distance: number }) | null>(null);
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Map viewport bounds controls
  const [mapCenter, setMapCenter] = useState({ lat: 12.9719, lng: 77.5946 }); // Default Bangalore Center
  const [mapZoom, setMapZoom] = useState(12);

  // For visual alerts
  const [activeAlert, setActiveAlert] = useState<string | null>(null);

  // Synchronize searching and filtering
  useEffect(() => {
    let result = [...centers];

    // Filter by search term
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        c => c.name.toLowerCase().includes(q) || c.address.toLowerCase().includes(q)
      );
    }

    // Filter by materials (e.g. paper, batteries)
    if (selectedMaterial !== 'all') {
      result = result.filter(c => c.materials.includes(selectedMaterial));
    }

    setFilteredCenters(result);

    // If active coordinates, sort results by distance
    if (userCoords) {
      const sorted = [...result].sort((a, b) => {
        const distA = getDistance(userCoords.lat, userCoords.lng, a.lat, a.lng);
        const distB = getDistance(userCoords.lat, userCoords.lng, b.lat, b.lng);
        return distA - distB;
      });
      setFilteredCenters(sorted);
    }
  }, [searchQuery, selectedMaterial, userCoords, centers]);

  // Request browser GPS position
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('error');
      triggerSnackbar('Geolocation is not supported by your browser');
      return;
    }

    setGeoStatus('loading');
    
    // Request permission and fetch
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coords = { lat: latitude, lng: longitude };
        setUserCoords(coords);
        setGeoStatus('success');

        // Locate nearest location out of all centers
        let closest: RecyclingCenter | null = null;
        let minDistance = Infinity;

        centers.forEach(c => {
          const dist = getDistance(latitude, longitude, c.lat, c.lng);
          if (dist < minDistance) {
            minDistance = dist;
            closest = c;
          }
        });

        if (closest) {
          setNearestCenter({ ...(closest as RecyclingCenter), distance: parseFloat(minDistance.toFixed(1)) });
          setSelectedCenter(closest);
          setMapCenter({ lat: (closest as RecyclingCenter).lat, lng: (closest as RecyclingCenter).lng });
          setMapZoom(14);
          triggerSnackbar(`Success! Nearest center is ${(closest as RecyclingCenter).name} (${minDistance.toFixed(1)} km)`);
        }
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setGeoStatus('error');
        triggerSnackbar('Location permission denied or lookup failed. Emulating standard search...');
        // Standard placeholder center search as emulation
        setUserCoords({ lat: 12.97244, lng: 77.59065 });
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  const triggerSnackbar = (msg: string) => {
    setActiveAlert(msg);
    setTimeout(() => setActiveAlert(null), 4000);
  };

  const handleCenterClick = (center: RecyclingCenter) => {
    setSelectedCenter(center);
    setMapCenter({ lat: center.lat, lng: center.lng });
    setMapZoom(14);
  };

  const formatMaterialLabel = (key: string) => {
    const found = FILTER_MATERIALS.find(m => m.id === key);
    return found ? found.label : key.replace('_', ' ');
  };

  return (
    <section id="locator" className="py-20 bg-transparent relative border-t border-slate-200/30">
      
      {/* Visual alert toast */}
      <AnimatePresence>
        {activeAlert && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-950/95 backdrop-blur-lg text-white px-6 py-3.5 rounded-full shadow-2xl border border-emerald-800/60 flex items-center space-x-3 text-sm font-sans font-semibold tracking-wide"
          >
            <Sparkles className="w-5 h-5 text-emerald-400 stretch-0 shrink-0" />
            <span>{activeAlert}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro copy */}
        <div className="mb-12 max-w-3xl">
          <span className="font-mono text-[9px] font-bold text-emerald-600 uppercase tracking-[0.2em] block mb-2 font-black">
            Interactive SaaS Engine
          </span>
          <h2 className="font-sans font-extrabold text-slate-900 tracking-tight text-3xl sm:text-4xl">
            Locate a Drop-Off Location
          </h2>
          <p className="mt-3 text-slate-655 font-sans text-sm sm:text-base">
            Use our interactive database and Google Maps panel to discover authorized drop-off stations near you. Toggle material filters, compute instant travel distances, and read operational center guidelines.
          </p>
        </div>

        {/* Outer Application Bento Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden min-h-[600px]">
          
          {/* LEFT GRID PANEL: Filter Inputs and List (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col border-r border-slate-200/50 bg-white/30 backdrop-blur-md">
            
            {/* Search Input Box */}
            <div className="p-6 border-b border-slate-200/50 flex flex-col space-y-4">
              
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search city or zip..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 placeholder-slate-400 font-sans text-sm text-slate-800 hover:border-slate-350 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 rounded-xl transition-all shadow-2xs"
                />
              </div>

              {/* Geolocation Finder Trigger */}
              <button
                onClick={handleGeolocation}
                disabled={geoStatus === 'loading'}
                className={`w-full h-11 rounded-full font-sans font-bold text-xs uppercase tracking-wider text-white flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg ${
                  geoStatus === 'loading'
                    ? 'bg-emerald-700/60'
                    : 'bg-emerald-600 hover:bg-emerald-750 hover:scale-[1.01] active:scale-[0.99] shadow-emerald-600/20'
                }`}
              >
                <Navigation className={`w-3.5 h-3.5 ${geoStatus === 'loading' ? 'animate-spin' : ''}`} />
                <span>
                  {geoStatus === 'loading'
                    ? 'Determining coordinates...'
                    : 'Find Center (Use GPS Location)'}
                </span>
              </button>

            </div>

            {/* Material Filter Pill Tabs */}
            <div className="px-6 py-4 border-b border-slate-200/50 bg-white/45 flex flex-col space-y-2">
              <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-black block">
                Filter by material accepted:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto no-scrollbar pt-1">
                {FILTER_MATERIALS.map((mat) => {
                  const isActive = selectedMaterial === mat.id;
                  return (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat.id)}
                      className={`px-3 py-1 text-xs font-sans font-semibold rounded-full border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-3xs font-black'
                          : 'bg-white/80 text-slate-600 border-slate-250/50 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      {mat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Locator Centers List Scroll */}
            <div className="flex-1 overflow-y-auto max-h-[420px] lg:max-h-[500px] p-6 space-y-4 custom-scrollbar">
              
              {/* Highlight if GeoNearest matches */}
              {nearestCenter && (
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex items-start space-x-3.5 mb-2 shadow-xs transition-all">
                  <div className="p-2.5 rounded-xl bg-emerald-600 text-white mt-0.5 shrink-0 shadow-md shadow-emerald-500/20">
                    <Navigation className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] font-bold text-emerald-700 uppercase tracking-widest block bg-emerald-100/60 rounded-md px-2 py-0.5 max-w-max">
                      NEAREST DETECTED — {nearestCenter.distance} KM AWAY
                    </span>
                    <h4 className="font-sans font-bold text-slate-900 mt-1.5 text-sm">{nearestCenter.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{nearestCenter.address}</p>
                    <button
                      onClick={() => handleCenterClick(nearestCenter)}
                      className="mt-2.5 text-xs text-emerald-700 hover:text-emerald-800 font-sans font-black flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Focus on Map &rarr;</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Center Cards Listing */}
              {filteredCenters.length > 0 ? (
                filteredCenters.map((center) => {
                  const isSelected = selectedCenter?.id === center.id;
                  
                  // Geodesic representation if coordinates acquired
                  const userDist = userCoords
                    ? getDistance(userCoords.lat, userCoords.lng, center.lat, center.lng).toFixed(1)
                    : null;

                  return (
                    <div
                      key={center.id}
                      id={`card-${center.id}`}
                      onClick={() => handleCenterClick(center)}
                      className={`group border rounded-2xl p-4 cursor-pointer transition-all duration-300 flex flex-col space-y-3 ${
                        isSelected
                          ? 'bg-emerald-50/40 border-emerald-250 ring-2 ring-emerald-500/10 shadow-md'
                          : 'bg-transparent border-transparent hover:bg-white/60 hover:border-slate-200'
                      }`}
                    >
                      
                      {/* Name & Distance */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-sans font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-sm">
                            {center.name}
                          </h3>
                          {userDist && (
                            <span className="text-[9px] text-emerald-700 font-mono font-bold uppercase tracking-wider block mt-0.5">
                              Distance: {userDist} km matches
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-[10px] bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded-lg border border-amber-300/20 font-bold">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
                          <span>{center.rating}</span>
                        </div>
                      </div>

                      {/* Details & Address summaries */}
                      <p className="font-sans text-xs text-slate-500 leading-normal block">
                        {center.address}
                      </p>

                      {/* Timing & Contact */}
                      <div className="flex flex-col space-y-1.5 pt-2 border-t border-slate-200/40 text-[10px] text-slate-450">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3.5 h-3.5 text-slate-350" />
                          <span className="font-sans font-medium">{center.hours}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-3.5 h-3.5 text-slate-350" />
                          <span className="font-mono">{center.phone}</span>
                        </div>
                      </div>

                      {/* Supported Tag Badges */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {center.materials.map(mat => (
                          <span
                            key={mat}
                            className="bg-emerald-500/10 text-emerald-805 text-[9px] font-mono font-black tracking-tight px-2 py-0.5 rounded-md uppercase"
                          >
                            {formatMaterialLabel(mat)}
                          </span>
                        ))}
                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 px-4 bg-white/20 border border-dashed border-slate-200 rounded-2xl">
                  <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                  <p className="font-sans font-semibold text-slate-900 text-sm">
                    No centers found
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Try modifying your search text or select 'All Materials' above.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedMaterial('all');
                    }}
                    className="mt-4 text-xs font-sans text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-full cursor-pointer font-bold shadow-md shadow-emerald-500/20"
                  >
                    Clear Filter Locks
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* RIGHT GRID PANEL: Live Map Canvas or Fallback Sandbox (7 Cols) */}
          <div className="lg:col-span-7 relative h-[450px] lg:h-auto min-h-[450px] bg-slate-100 flex flex-col justify-stretch">
            
            {hasValidKey ? (
              /* REAL LIVE GOOGLE MAPS INTEGRATION */
              <APIProvider apiKey={API_KEY} version="weekly">
                <MapRenderer
                  center={mapCenter}
                  zoom={mapZoom}
                  centers={filteredCenters}
                  selectedCenter={selectedCenter}
                  onSelectCenter={setSelectedCenter}
                  onToast={triggerSnackbar}
                />
              </APIProvider>
            ) : (
              /* PORTFOLIO-GRADE INTERACTIVE Fallback SVG MAP (Rule 1C Compliance & Resiliency) */
              <PortfolioMockMap
                mapCenter={mapCenter}
                zoom={mapZoom}
                centers={filteredCenters}
                selectedCenter={selectedCenter}
                onSelectCenter={handleCenterClick}
                onToast={triggerSnackbar}
              />
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

// -------------------------------------------------------------
// CHILD COMPONENT: Real Google Maps API wrapper
// -------------------------------------------------------------
interface MapProps {
  center: { lat: number; lng: number };
  zoom: number;
  centers: RecyclingCenter[];
  selectedCenter: RecyclingCenter | null;
  onSelectCenter: (c: RecyclingCenter) => void;
  onToast: (msg: string) => void;
}

function MapRenderer({ center, zoom, centers, selectedCenter, onSelectCenter, onToast }: MapProps) {
  const [activeCenterId, setActiveCenterId] = useState<string | null>(null);

  // Auto zoom track on changes
  useEffect(() => {
    if (selectedCenter) {
      setActiveCenterId(selectedCenter.id);
    } else {
      setActiveCenterId(null);
    }
  }, [selectedCenter]);

  return (
    <div className="w-full h-full relative" style={{ minHeight: '450px' }}>
      
      {/* Visual Header Indicator in map */}
      <div className="absolute top-4 left-4 z-40 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gray-100 shadow-md flex items-center space-x-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-mono text-[9px] font-bold text-gray-700 tracking-wider">
          LIVE GOOGLE MAPS SERVICE ACTIVE
        </span>
      </div>

      <Map
        center={center}
        zoom={zoom}
        mapId="DEMO_MAP_ID"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
        gestureHandling="cooperative"
      >
        {centers.map((c) => (
          <AdvancedMarker
            key={c.id}
            position={{ lat: c.lat, lng: c.lng }}
            onClick={() => {
              onSelectCenter(c);
              setActiveCenterId(c.id);
              onToast(`Focused: ${c.name}`);
            }}
          >
            <Pin
              background={selectedCenter?.id === c.id ? '#10b981' : '#3b82f6'}
              glyphColor="#fff"
              borderColor={selectedCenter?.id === c.id ? '#047857' : '#1d4ed8'}
            />
          </AdvancedMarker>
        ))}

        {/* Current Active InfoWindow */}
        {selectedCenter && activeCenterId === selectedCenter.id && (
          <InfoWindow
            position={{ lat: selectedCenter.lat, lng: selectedCenter.lng }}
            onCloseClick={() => {
              setActiveCenterId(null);
            }}
          >
            <div className="p-2.5 min-w-[200px] font-sans">
              <h4 className="font-bold text-gray-900 text-sm leading-tight flex items-center mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                {selectedCenter.name}
              </h4>
              <p className="text-[11px] text-gray-600 leading-normal block mb-2">{selectedCenter.address}</p>
              
              <div className="space-y-1 text-[10px] text-gray-500 pt-1.5 border-t border-gray-150">
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <strong>Hours:</strong>
                  <span>{selectedCenter.hours}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <strong>Phone:</strong>
                  <span>{selectedCenter.phone}</span>
                </div>
              </div>

              <div className="mt-2.5 bg-emerald-50 border border-emerald-100 rounded px-1.5 py-0.5 text-center text-[10px] text-emerald-800 font-semibold block">
                ⭐ {selectedCenter.rating} rating ({selectedCenter.reviewsCount} reviews)
              </div>
            </div>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
}

// -------------------------------------------------------------
// FALLBACK: Interactive Vector Canvas Map component (Strict Resiliency)
// -------------------------------------------------------------
interface FallbackProps {
  mapCenter: { lat: number; lng: number };
  zoom: number;
  centers: RecyclingCenter[];
  selectedCenter: RecyclingCenter | null;
  onSelectCenter: (c: RecyclingCenter) => void;
  onToast: (msg: string) => void;
}

function PortfolioMockMap({ mapCenter, zoom, centers, selectedCenter, onSelectCenter, onToast }: FallbackProps) {
  const [showConfigAlert, setShowConfigAlert] = useState(true);

  // Bengaluru Map Simulation reference geometry
  const defaultSuburbs = [
    { name: 'Malleswaram', lat: 13.0055, lng: 77.5691, x: 25, y: 25 },
    { name: 'Indiranagar', lat: 12.9719, lng: 77.6412, x: 75, y: 45 },
    { name: 'Kumaraswamy Layout', lat: 12.9081, lng: 77.5664, x: 22, y: 80 },
    { name: 'Majestic Centra', lat: 12.97244, lng: 77.59065, x: 45, y: 45 },
    { name: 'Koramangala Hub', lat: 12.9352, lng: 77.6244, x: 65, y: 70 },
  ];

  return (
    <div className="relative w-full h-full min-h-[450px] bg-slate-50 overflow-hidden flex flex-col justify-between">
      
      {/* Visual blueprint dotted background */}
      <div className="absolute inset-0 bg-slate-50">
        <div 
          className="absolute inset-0 opacity-25" 
          style={{ 
            backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }} 
        />
        {/* Subtle grid concentric rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-slate-200 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-slate-150 pointer-events-none" />
      </div>

      {/* HEADER SECTION: Setup Instructions Drawer */}
      <AnimatePresence>
        {showConfigAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-4 right-4 z-40 bg-slate-900 border border-slate-800 shadow-xl p-4 rounded-xl text-slate-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex space-x-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Key className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-sm text-white flex items-center space-x-1.5">
                    <span>Google Maps API Key Required</span>
                    <span className="font-mono text-[9px] bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      Configuration Warning
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-xl">
                    Our platform uses standard GCP integrations. To enable live satellite street map tracking:
                  </p>
                  <ol className="text-[11px] text-slate-400 list-decimal pl-4 mt-2 space-y-1 font-sans">
                    <li>Get an API key: <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">GCP Start Guide</a></li>
                    <li>Open <strong>Settings</strong> (⚙️ cog icon, top-right) &rarr; <strong>Secrets</strong></li>
                    <li>Create <code>GOOGLE_MAPS_PLATFORM_KEY</code> as the name, paste key as value and click Save</li>
                  </ol>
                </div>
              </div>
              <button
                onClick={() => setShowConfigAlert(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md opacity-70 hover:opacity-100 cursor-pointer text-xs font-mono border border-slate-800"
              >
                DISMISS
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating fallback indicator */}
      {!showConfigAlert && (
        <button
          onClick={() => setShowConfigAlert(true)}
          className="absolute top-4 left-4 z-40 bg-slate-900/95 hover:bg-slate-900 text-[9px] text-white font-mono font-bold tracking-widest uppercase border border-slate-800 px-3 py-1.5 rounded-full flex items-center space-x-1.5 cursor-pointer transition-all shadow-md"
        >
          <Key className="w-3 h-3 text-emerald-400" />
          <span>VIEW GOOGLE MAPS SETUP GUIDE</span>
        </button>
      )}

      {/* Environmental Impact metric widget (Crafted from template design rules) */}
      <div className="absolute top-4 right-4 z-30 w-52 p-4 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xl hidden md:block">
        <h4 className="text-[9px] font-mono font-black text-slate-450 uppercase tracking-widest mb-1.5">Local Environmental Impact</h4>
        <div className="flex items-baseline space-x-1">
          <span className="text-xl font-bold text-slate-950 font-sans">1,284<span className="text-[9px] text-slate-450 font-normal uppercase ml-0.5">kg</span></span>
          <span className="text-emerald-600 text-[10px] font-black font-sans shrink-0 ml-1">+12%</span>
        </div>
        <p className="text-[9px] text-slate-500 font-sans mt-0.5">Carbon emissions offset in Bangalore this week.</p>
        <div className="mt-3.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full w-4/5" />
        </div>
      </div>

      {/* Map simulation info badge */}
      <div className="absolute bottom-4 right-4 z-40 bg-slate-900/95 border border-slate-850 p-3 rounded-2xl text-slate-200 shadow-xl max-w-[200px]">
        <span className="font-mono text-[8px] font-bold block uppercase tracking-widest text-emerald-405 leading-none mb-1">
          VECTOR DEMO ACTIVE
        </span>
        <span className="text-[10px] block font-sans text-slate-400">
          Fully interactive sandbox coordinates
        </span>
      </div>

      {/* SIMULATED MAP CANVAS */}
      <div className="flex-1 w-full relative flex items-center justify-center p-4">
        
        {/* Draw Simulated Bengaluru Area Paths */}
        <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 0,25 Q 50,50 100,25" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
          <path d="M 25,0 Q 50,50 25,100" fill="none" stroke="#cbd5e1" strokeWidth="1.2" />
          <path d="M 0,75 Q 60,30 100,85" fill="none" stroke="#cbd5e1" strokeWidth="1" />
        </svg>

        {/* Vector Grid labels */}
        {defaultSuburbs.map((sub, i) => (
          <div
            key={i}
            className="absolute font-mono text-[9px] text-slate-400 pointer-events-none select-none tracking-widest uppercase font-bold"
            style={{ left: `${sub.x}%`, top: `${sub.y}%` }}
          >
            {sub.name}
          </div>
        ))}

        {/* Dynamic active user geolocation coordinates radar */}
        <div className="absolute top-[45%] left-[45%] w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <div className="absolute text-[8px] text-emerald-600 font-mono tracking-widest mt-7 font-black">
            MY GRID GPS
          </div>
        </div>

        {/* Active Pins */}
        {centers.map((center) => {
          const isSelected = selectedCenter?.id === center.id;
          
          // Geometry translation
          let x = 45;
          let y = 45;
          if (center.id === 'e_greenhub') { x = 24; y = 72; }
          if (center.id === 'wastecycle_bengaluru') { x = 72; y = 41; }
          if (center.id === 'gorecycle_bangalore') { x = 28; y = 29; }

          return (
            <div
              key={center.id}
              className="absolute z-20 transition-all duration-300"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <button
                onClick={() => {
                  onSelectCenter(center);
                  onToast(`Point Match: ${center.name}`);
                }}
                className={`p-2 rounded-full cursor-pointer transition-all flex flex-col items-center ${
                  isSelected ? 'scale-115' : 'hover:scale-108'
                }`}
              >
                {/* Custom styled SVG Map Pins */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
                  isSelected 
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-400/20 shadow-emerald-500/10' 
                    : 'bg-white border border-slate-200 text-slate-705 hover:bg-slate-50'
                }`}>
                  <MapPin className="w-4 h-4 fill-current" />
                </div>

                {/* Micro Label */}
                <span className={`px-2 py-0.5 rounded-md mt-1 block font-sans text-[8px] font-bold truncate max-w-[100px] shadow-3xs z-30 transition-all ${
                  isSelected 
                    ? 'bg-emerald-100 text-emerald-805 border border-emerald-300' 
                    : 'bg-white text-slate-500 border border-slate-150'
                }`}>
                  {center.name}
                </span>
              </button>
            </div>
          );
        })}

        {/* Overlay popup (Simulates InfoWindow) */}
        {selectedCenter &&
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-6 left-6 right-6 z-30 bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-5 shadow-2xl text-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="font-sans font-bold text-sm text-slate-900">{selectedCenter.name}</h4>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-lg">
                {selectedCenter.address}
              </p>
              
              <div className="flex flex-wrap gap-4 mt-2.5 text-[10px] text-slate-405 items-center font-semibold">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{selectedCenter.hours}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-mono">{selectedCenter.phone}</span>
                </span>
              </div>
            </div>

            <div className="flex shrink-0 w-full sm:w-auto items-center space-x-3">
              <span className="text-amber-700 text-xs font-bold bg-amber-500/10 border border-amber-300/30 px-2 py-1 rounded-lg">
                ★ {selectedCenter.rating}
              </span>
              <a
                href="#contact"
                className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-600 hover:bg-emerald-700 font-sans font-bold text-xs text-white rounded-full shadow-md shadow-emerald-500/10 transition-colors text-center cursor-pointer"
              >
                Inquire Drop-Off
              </a>
            </div>
          </motion.div>
        }

      </div>
    </div>
  );
}
