export type PageView = 'home' | 'menu' | 'custom-cakes' | 'about' | 'gallery' | 'contact';

export type ProductCategory =
  | 'Croissants & Viennoiseries'
  | 'Artisan Pastries'
  | 'Cakes & Celebration Cakes'
  | 'Tarts & Desserts'
  | 'Cookies & Sweet Treats'
  | 'Savoury Bakes';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Croissants & Viennoiseries',
  'Artisan Pastries',
  'Cakes & Celebration Cakes',
  'Tarts & Desserts',
  'Cookies & Sweet Treats',
  'Savoury Bakes',
];

export interface StoreConfig {
  announcementText: string;
  announcementEnabled: boolean;
  streetAddress: string;
  cityCountry: string;
  openingHours: { days: string; hours: string }[];
  phone: string;
  whatsappNumber: string;
  email: string;
  directionsUrl: string;
  instagramHandle: string;
  instagramUrl: string;
  facebookUrl: string;
  pickupAvailable: boolean;
  deliveryAvailable: boolean;
  currencySymbol: string;
  pricesConfirmed: boolean;
  locationConfirmed: boolean;
  customLogoUrl?: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  priceDelta: number;
}

export interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  fullDescription: string;
  price: number;
  priceNote: string;
  image: string;
  availability: 'Available Daily' | 'Pre-Order 24h' | 'Weekend Special' | 'Sold Out';
  featured: boolean;
  hidden: boolean;
  dietaryNotes: string[];
  allergens: string[];
  variants?: ProductVariant[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  customerName: string;
  context: string;
  quote: string;
  verified: boolean;
}

export interface CartItem {
  cartItemId: string;
  product: ProductItem;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
}

export interface OrderSubmission {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  fulfillmentMethod: 'pickup' | 'delivery';
  collectionDate: string;
  collectionTime: string;
  deliveryAddress?: string;
  specialNotes?: string;
  items: {
    productId: string;
    productName: string;
    variantLabel?: string;
    quantity: number;
    unitPrice: number;
  }[];
  estimatedTotal: number;
  status: 'Pending Bakery Confirmation' | 'Confirmed' | 'Completed';
}

export interface CustomCakeInquiry {
  id: string;
  inquiryNumber: string;
  createdAt: string;
  customerName: string;
  email: string;
  phoneOrWhatsapp: string;
  occasion: string;
  desiredDate: string;
  servings: string;
  preferredFlavor: string;
  designDescription: string;
  budgetRange?: string;
  inspirationImageName?: string;
  inspirationImagePreview?: string;
  additionalNotes?: string;
  status: 'Awaiting Consultation' | 'Reviewed';
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
