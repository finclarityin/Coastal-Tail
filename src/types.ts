export type PetCategory = 'dogs' | 'cats' | 'spa' | 'mobile';

export type DogSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface DogSizeInfo {
  id: DogSize;
  name: string;
  weight: string;
  examples: string;
  baseInternalCost?: number;
}

export type CatCoatType = 'short' | 'long' | 'matting' | 'senior';

export interface CatCoatInfo {
  id: CatCoatType;
  name: string;
  description: string;
  examples: string;
}

// ----------------------------------------------------
// GROOMING PACKAGES & ADD-ONS (STRICT: PUBLIC NEVER SEES PRICES)
// ----------------------------------------------------
export interface GroomingPackage {
  id: string;
  petType: 'dog' | 'cat';
  title: string;
  subtitle?: string;
  slug?: string;
  tagline: string;
  description: string;
  duration: string;
  image?: string;
  isPopular?: boolean;
  popular?: boolean;
  isFeatured?: boolean;
  badge?: string;
  displayOrder?: number;
  visibility?: 'published' | 'draft' | 'archived';
  includedTreatments: string[];
  includes?: string[];
  bestFor?: string;
  priceMode: 'ask' | 'custom_quote' | 'contact'; // Always 'ask' / non-numeric on customer website
  // Internal-only fields for staff calculation (NEVER exposed to customer site)
  internalBaseCost?: number;
  internalMinPrice?: number;
  internalMaxPrice?: number;
  internalMobileSurcharge?: number;
  internalMemberDiscount?: number;
  staffNotes?: string;
  sizeInternalCosts?: {
    small?: number;
    medium?: number;
    large?: number;
    xlarge?: number;
  };
  coatModifiers?: {
    matting?: number;
    heavyShedding?: number;
    difficultHandling?: number;
    afterHours?: number;
    mobile?: number;
  };
  seoTitle?: string;
  seoDescription?: string;
}

export interface GroomingAddOn {
  id: string;
  name: string;
  category: 'spa' | 'hygiene' | 'coat' | 'specialty';
  description: string;
  benefits: string;
  suitableFor: 'dogs' | 'cats' | 'all';
  petType?: 'dog' | 'cat' | 'both';
  priceMode: 'ask';
  duration: string;
  iconName: string;
  image?: string;
  active?: boolean;
  displayOrder?: number;
  internalPrice?: number; // Staff internal reference only
  includedTreatmentLines?: string[];
}

// ----------------------------------------------------
// E-COMMERCE PRODUCTS & VARIANTS
// ----------------------------------------------------
export type ProductCategory =
  | 'dog-food'
  | 'cat-food'
  | 'puppy-food'
  | 'kitten-food'
  | 'treats'
  | 'wet-food'
  | 'supplements'
  | 'dental-care'
  | 'wellness'
  | 'special-diet'
  | 'collars'
  | 'leashes'
  | 'harnesses'
  | 'beds'
  | 'toys'
  | 'bowls'
  | 'grooming-essentials'
  | 'travel'
  | 'pet-care-accessories';

export interface ProductVariant {
  id: string;
  name: string; // e.g. "1.2 kg", "4 kg", "Red / Medium"
  sizeOrWeight: string;
  sku: string;
  barcode?: string;
  mrp: number;
  price: number; // Selling Price
  costPrice?: number; // Internal cost
  stock: number;
  image?: string;
  inStock: boolean;
}

export interface BundleItemReference {
  productId: string;
  productName: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  shortName?: string;
  type: 'food' | 'accessory';
  category: ProductCategory;
  subcategory?: string;
  categoryLabel: string;
  brand: string;
  sku?: string;
  barcode?: string;
  petType?: 'dog' | 'cat' | 'both';
  image: string;
  thumbnailImage?: string;
  galleryImages?: string[];
  lifestyleImages?: string[];
  
  // Pricing & Math
  price: number; // Selling price
  originalPrice?: number; // MRP
  costPrice?: number; // Internal business cost
  discountPercentage?: number; // Auto-calculated
  discountAmount?: number; // Auto-calculated (MRP - Selling Price)
  gstRate?: number; // e.g. 5, 12, 18%
  
  // Inventory & Logistics
  sizeOrWeight: string;
  stockQuantity?: number;
  lowStockThreshold?: number;
  maxPurchaseQuantity?: number;
  stockStatus?: 'in_stock' | 'low_stock' | 'out_of_stock' | 'backorder';
  inStock: boolean;
  
  // Flags & Visibility
  visibility?: 'published' | 'draft' | 'archived';
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  badge?: string;
  tags: string[];
  
  // Product Details
  description: string;
  shortDescription?: string;
  keyFeatures: string[];
  ingredients?: string[];
  specifications?: Record<string, string>;
  suitableFor?: string;
  ageGroup?: string; // 'Puppy' | 'Adult' | 'Senior' | 'All'
  color?: string;
  material?: string;
  
  // Advanced Features
  variants?: ProductVariant[];
  isBundle?: boolean;
  bundleItems?: BundleItemReference[];
  shippingWeight?: string;
  deliveryInfo?: string;
  returnEligible?: boolean;
  productNotes?: string;
  
  // Reviews & SEO
  rating: number;
  reviewsCount: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
  selectedVariantObject?: ProductVariant;
}

// ----------------------------------------------------
// CATEGORY MANAGEMENT
// ----------------------------------------------------
export interface Category {
  id: ProductCategory | string;
  name: string;
  slug: string;
  type: 'food' | 'accessory' | 'both';
  petType: 'dog' | 'cat' | 'both';
  description: string;
  image: string;
  iconName?: string;
  parentCategory?: string | null;
  subcategories?: string[];
  displayOrder: number;
  visibility: 'published' | 'hidden';
  seoTitle?: string;
  seoDescription?: string;
  itemCount?: number;
}

// ----------------------------------------------------
// ORDER & FULFILLMENT MANAGEMENT
// ----------------------------------------------------
export type OrderStatus =
  | 'new'
  | 'contacted'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'ready_for_delivery'
  | 'out_for_delivery'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'unreachable'
  | 'refund_requested'
  | 'refunded';

export type PaymentStatus = 'pending' | 'paid' | 'cod' | 'refunded';

export interface OrderItem {
  productId?: string;
  productName?: string;
  productImage?: string;
  sku?: string;
  unitPrice: number;
  quantity: number;
  mrp?: number;
  product?: Product;
}

export interface OrderTimelineEvent {
  timestamp: string;
  status: OrderStatus;
  note: string;
  adminName: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string; // e.g. CT-2026-1082
  date: string;
  customerName: string;
  mobileNumber: string;
  whatsappNumber: string;
  email?: string;
  deliveryAddress: string;
  areaLocation: string; // Kankanady, Kadri, Bejai, etc.
  deliveryType?: 'home_delivery' | 'store_pickup';
  deliveryFee?: number;
  items: (CartItem | OrderItem)[];
  subtotal: number;
  discount: number;
  appliedCoupon?: string;
  deliveryCharge?: number;
  total: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: 'whatsapp_assisted' | 'upi' | 'cod' | 'card' | 'cash_on_delivery';
  source?: 'website' | 'whatsapp' | 'manual_admin';
  orderNotes?: string;
  adminStaffNotes?: string;
  whatsappRef?: string;
  timeline: OrderTimelineEvent[];
}

export interface ProductOrder {
  customerName: string;
  mobileNumber: string;
  whatsappNumber: string;
  deliveryAddress: string;
  areaLocation: string;
  preferredContactTime: string;
  orderNotes?: string;
}

// ----------------------------------------------------
// INVENTORY & STOCK LOGS
// ----------------------------------------------------
export type StockAdjustmentReason =
  | 'new_stock'
  | 'damaged'
  | 'returned'
  | 'manual_correction'
  | 'sold'
  | 'sold_instore'
  | 'promotional_sample'
  | 'other';

export interface InventoryLogEntry {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  variantName?: string;
  previousStock: number;
  change: number;
  newStock: number;
  reason: StockAdjustmentReason;
  adminName: string;
  timestamp: string;
  notes?: string;
}

// ----------------------------------------------------
// OFFERS, PROMOTIONS & TOP-BAR BANNERS
// ----------------------------------------------------
export type OfferType =
  | 'percentage'
  | 'flat'
  | 'bogo'
  | 'bundle'
  | 'free_delivery'
  | 'first_order'
  | 'membership'
  | 'festival'
  | 'seasonal'
  | 'grooming_promo';

export interface OfferPromotion {
  id: string;
  name: string;
  code: string;
  type: OfferType;
  value: number; // e.g. 15 for 15%, 200 for ₹200 off
  discountType?: OfferType;
  discountValue?: number;
  applicableProducts: string[]; // product IDs or empty for all
  applicableCategories: string[];
  applicableCategory?: string;
  applicablePetType: 'all' | 'dog' | 'cat';
  targetAudience?: 'all' | 'vip_only' | 'first_order';
  minOrderValue: number;
  maxDiscount?: number;
  maxDiscountAmount?: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  usageCount?: number;
  perCustomerLimit: number;
  memberOnly: boolean;
  firstOrderOnly: boolean;
  active: boolean;
  bannerText: string;
  description?: string;
  terms: string[];
}

export interface TopBarOffer {
  id: string;
  title: string;
  shortMessage: string;
  message?: string;
  desktopMessage: string;
  mobileMessage: string;
  linkText?: string;
  link?: string;
  ctaText: string;
  ctaDestination: ActivePage | string;
  startDate: string;
  endDate: string;
  priority: number;
  active: boolean;
  bgStyle: 'teal' | 'coral' | 'ocean' | 'gold' | 'dark';
  backgroundColor?: string;
  textColor?: string;
  textStyle: 'light' | 'dark';
}

export interface WebsiteBanner {
  id: string;
  title: string;
  eyebrow?: string;
  headline: string;
  subheadline: string;
  desktopImage: string;
  mobileImage: string;
  primaryCtaText?: string;
  primaryButtonText?: string;
  primaryCtaLink?: ActivePage | string;
  primaryButtonLink?: string;
  secondaryCtaText?: string;
  secondaryButtonText?: string;
  secondaryCtaLink?: ActivePage | string;
  secondaryButtonLink?: string;
  bgStyle?: string;
  startDate: string;
  endDate: string;
  priority: number;
  displayOrder?: number;
  active: boolean;
}

// ----------------------------------------------------
// MEMBERSHIP CONFIGURATION
// ----------------------------------------------------
export interface MembershipBenefitItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  iconName: string;
}

export interface MembershipConfig {
  name: string;
  annualPrice: number;
  tagline: string;
  benefits: MembershipBenefitItem[];
  groomingDiscountPercentage: number;
  retailDiscountPercentage: number;
  freeAddOnsCount: number;
  terms: string[];
}

export interface MembershipTier {
  id: string;
  name: string;
  tagline: string;
  annualFee: number;
  discountPercentageGrooming: number;
  discountPercentageProducts: number;
  benefits: string[];
  active?: boolean;
}

// ----------------------------------------------------
// CRM: CUSTOMERS & REVIEWS
// ----------------------------------------------------
export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email?: string;
  address?: string;
  areaLocation?: string;
  area?: string;
  petType?: 'dog' | 'cat' | 'both';
  petName?: string;
  petBreed?: string;
  totalOrders: number;
  totalSpending: number;
  totalSpent?: number;
  lastOrderDate?: string;
  joinedDate?: string;
  groomingVisits: number;
  isVipMember: boolean;
  membershipStatus?: 'standard' | 'vip' | 'silver' | 'gold';
  memberSince?: string;
  notes?: string;
  status: 'active' | 'inactive' | 'blocked';
  createdAt: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  petInfo: string;
  petType: 'dog' | 'cat';
  rating: number;
  text: string;
  image?: string;
  verified: boolean;
  status: 'approved' | 'pending' | 'rejected';
  isFeatured?: boolean;
  date: string;
}

export type Customer = CustomerRecord;
export type DiscountType = OfferType;
export type CustomerReview = ReviewItem;

// ----------------------------------------------------
// MEDIA ASSETS LIBRARY
// ----------------------------------------------------
export type MediaFolder =
  | 'All'
  | 'Products'
  | 'Dogs'
  | 'Cats'
  | 'Grooming'
  | 'Food'
  | 'Accessories'
  | 'Banners'
  | 'Membership'
  | 'Gallery';

export interface MediaAsset {
  id: string;
  title?: string;
  name: string;
  folder: MediaFolder;
  category?: string;
  tags?: string[];
  url: string;
  size: string;
  dimensions?: string;
  uploadedAt: string;
}

// ----------------------------------------------------
// ADMIN AUTH, ROLES & AUDIT LOGS
// ----------------------------------------------------
export type AdminRole = 'owner' | 'manager' | 'groomer' | 'staff';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar: string;
  phone?: string;
  permissions: string[];
  active: boolean;
  lastLogin?: string;
}

export interface AdminNotification {
  id: string;
  type:
    | 'order'
    | 'low_stock'
    | 'out_of_stock'
    | 'enquiry'
    | 'membership'
    | 'review'
    | 'offer_expiry'
    | 'banner_expiry';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface AdminAuditLog {
  id: string;
  action: string;
  category: 'product' | 'category' | 'package' | 'order' | 'inventory' | 'offer' | 'banner' | 'settings' | 'auth';
  entityId?: string;
  entityName: string;
  entity?: string;
  adminName: string;
  adminEmail: string;
  timestamp: string;
  details?: string;
}

// ----------------------------------------------------
// STUDIO SETTINGS
// ----------------------------------------------------
export interface StudioSettings {
  businessName: string;
  tagline: string;
  logo: string;
  customLogoUrl?: string; // Optional custom uploaded Base64 or image URL
  logoDisplayMode?: 'vector' | 'image' | 'pill'; // Custom display preference
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  area: string;
  city: string;
  pincode: string;
  openingHours: string;
  currency: string;
  currencySymbol: string;
  taxRate: number; // e.g. 5%
  freeDeliveryThreshold: number;
  deliveryCharge: number;
  socialInstagram: string;
  socialFacebook: string;
  whatsappTemplates: {
    groomingEnquiry: string;
    orderSummary: string;
    membershipEnquiry: string;
  };
  seoDefaults: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  notificationPreferences: {
    emailOnNewOrder: boolean;
    whatsappOnGrooming: boolean;
    lowStockAlerts: boolean;
    dailyDigest: boolean;
  };
}

// ----------------------------------------------------
// PUBLIC ENQUIRIES & PAGES
// ----------------------------------------------------
export interface GroomingEnquiry {
  id?: string;
  dateSubmitted?: string;
  petType: 'dog' | 'cat';
  petName: string;
  breed: string;
  sizeOrCoat: string;
  coatCondition: 'Healthy' | 'Moderate Tangling' | 'Severe Matting' | 'Sensitive Skin / Allergies' | 'Shedding Heavily';
  requestedPackage: string;
  selectedAddOns: string[];
  preferredDate: string;
  preferredTimeSlot: string;
  serviceMode: 'studio' | 'doorstep';
  customerName: string;
  customerMobile: string;
  notes?: string;
  status?: 'new' | 'contacted' | 'booked' | 'completed' | 'cancelled';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'grooming' | 'happy-pets' | 'studio' | 'before-after' | 'products' | 'cats' | 'spa';
  image: string;
  beforeImage?: string;
  afterImage?: string;
  description: string;
  petName?: string;
  breed?: string;
  tag?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  petInfo: string;
  rating: number;
  text: string;
  image: string;
  verified: boolean;
}

export type ActivePage =
  | 'home'
  | 'about'
  | 'services'
  | 'dog-grooming'
  | 'cat-grooming'
  | 'spa-addons'
  | 'mobile-grooming'
  | 'pet-grooming-mangalore'
  | 'dog-grooming-mangalore'
  | 'cat-grooming-mangalore'
  | 'pet-spa-mangalore'
  | 'mobile-pet-grooming-mangalore'
  | 'home-pet-grooming-mangalore'
  | 'dog-grooming-at-home-mangalore'
  | 'location-detail'
  | 'locations'
  | 'education'
  | 'shop'
  | 'food'
  | 'accessories'
  | 'membership'
  | 'gallery'
  | 'contact'
  | 'cart'
  | 'policies'
  | 'privacy'
  | 'terms'
  | 'grooming-policy'
  | 'cancellation-policy'
  | 'refund-policy'
  | 'shipping-policy'
  | 'membership-terms'
  | '404'
  | 'admin';

export type AdminActiveTab =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'orders'
  | 'inventory'
  | 'packages'
  | 'addons'
  | 'offers'
  | 'topbar'
  | 'banners'
  | 'content'
  | 'membership'
  | 'customers'
  | 'media'
  | 'reviews'
  | 'reports'
  | 'settings';
