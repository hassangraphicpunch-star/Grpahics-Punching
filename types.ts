export type ServiceCategory = 'digitizing' | 'vector' | 'patches';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  startingPrice: string;
  turnaround: string;
  features: string[];
  image: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'embroidery' | 'vector' | 'patches' | '3d-puff';
  placement: string;
  stitches?: number;
  colors?: number;
  beforeImage: string; // Original artwork/image
  afterImage: string; // Digitized/Stitched/Vector outcome
  description: string;
  formats: string[];
}

export interface ThreadColor {
  brand: 'Madeira Classic' | 'Madeira Polyneon' | 'Isacord' | 'Robison-Anton';
  code: string;
  name: string;
  hex: string;
  category: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  category: ServiceCategory;
  price: string;
  unit: string;
  popular?: boolean;
  description: string;
  features: string[];
  turnaround: string;
}

export interface OrderQuoteRequest {
  serviceType: ServiceCategory;
  designName: string;
  placement: string;
  targetWidth: number; // inches
  targetHeight: number; // inches
  machineFormat: string;
  fabricType: string;
  threadBrand: string;
  turnaround: 'express' | 'standard' | 'rush';
  comments: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  files: Array<{ name: string; size: string; type: string }>;
  estimatedStitches?: number;
  estimatedPrice: number;
}

export interface TrackedOrder {
  orderId: string;
  clientEmail: string;
  designName: string;
  serviceType: string;
  dateSubmitted: string;
  status: 'Received' | 'In Digitizing' | 'Quality Check & Test Stitch' | 'Completed';
  estimatedCompletion: string;
  previewImage: string;
  downloadFormats: string[];
  stitches: number;
  colors: number;
  dimensions: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
  location: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Digitizing' | 'Vector' | 'Formats & Machines' | 'Payment';
}
