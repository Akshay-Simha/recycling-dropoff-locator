export interface RecyclingCenter {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  hours: string;
  phone: string;
  rating: number;
  reviewsCount: number;
  materials: string[];
  details: string;
}

export interface GuidelineItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  centerId?: string;
  message: string;
}
