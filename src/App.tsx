import { motion } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import StoreLocator from './components/StoreLocator';
import HowItWorks from './components/HowItWorks';
import Guidelines from './components/Guidelines';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  
  // Callback to handle smooth scrolling directly down to Locator Section
  const handleScrollToLocator = () => {
    const element = document.getElementById('locator');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="root-container" className="min-h-screen bg-transparent text-slate-800 antialiased selection:bg-emerald-500/25 selection:text-emerald-900">
      
      {/* Sticky glass Header */}
      <Header onLocateClick={handleScrollToLocator} />

      {/* Pages Sections Sequence */}
      <main>
        
        {/* Landing SaaS Hero */}
        <Hero onLocateClick={handleScrollToLocator} />

        {/* Corporate core principles: Easy, Convenient, Sustainable */}
        <About />

        {/* Interactive Google Map + Vector Fallback Locator Panel */}
        <StoreLocator />

        {/* 4-Step Action Timeline */}
        <HowItWorks />

        {/* Materials Guidelines Compliance Matrix */}
        <Guidelines />

        {/* Responsive Accordion FAQs */}
        <FAQ />

        {/* Contact Form & Coordinate Hotlines */}
        <Contact />

      </main>

      {/* Corporate Sitemap and credits */}
      <Footer />

    </div>
  );
}
