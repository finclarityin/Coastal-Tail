import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  GroomingPackage,
  GroomingAddOn,
  TopBarOffer,
  WebsiteBanner,
  MembershipConfig,
  MembershipTier,
  OfferPromotion,
  AdminOrder,
  InventoryLogEntry,
  CustomerRecord,
  ReviewItem,
  MediaAsset,
  AdminNotification,
  AdminAuditLog,
  StudioSettings,
  GroomingEnquiry,
  OrderStatus,
  StockAdjustmentReason,
} from '../types';

import { FOOD_PRODUCTS, ACCESSORY_PRODUCTS } from '../data/productsData';
import { DOG_GROOMING_PACKAGES, CAT_GROOMING_PACKAGES, GROOMING_ADD_ONS } from '../data/groomingData';
import { INITIAL_CATEGORIES } from '../data/categoriesData';
import {
  INITIAL_TOP_BAR_OFFERS,
  INITIAL_WEBSITE_BANNERS,
  INITIAL_MEMBERSHIP_CONFIG,
  INITIAL_OFFERS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_REVIEWS,
  INITIAL_MEDIA,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_STUDIO_SETTINGS,
} from '../data/storeDefaults';

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>, adminName?: string) => Product;
  updateProduct: (id: string, updates: Partial<Product>, adminName?: string) => void;
  deleteProduct: (id: string, adminName?: string) => void;
  archiveProduct: (id: string, adminName?: string) => void;
  duplicateProduct: (id: string, adminName?: string) => Product;
  
  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>, adminName?: string) => void;
  updateCategory: (id: string, updates: Partial<Category>, adminName?: string) => void;
  deleteCategory: (id: string, adminName?: string) => void;
  reorderCategories: (newOrder: Category[], adminName?: string) => void;

  // Grooming Packages (Dog & Cat)
  groomingPackages: GroomingPackage[];
  addGroomingPackage: (pkg: Omit<GroomingPackage, 'id'>, adminName?: string) => void;
  updateGroomingPackage: (id: string, updates: Partial<GroomingPackage>, adminName?: string) => void;
  deleteGroomingPackage: (id: string, adminName?: string) => void;

  // Grooming Add-ons
  groomingAddOns: GroomingAddOn[];
  addGroomingAddOn: (addOn: Omit<GroomingAddOn, 'id'>, adminName?: string) => void;
  updateGroomingAddOn: (id: string, updates: Partial<GroomingAddOn>, adminName?: string) => void;
  deleteGroomingAddOn: (id: string, adminName?: string) => void;

  // Top Bar Announcement Offers
  topBarOffers: TopBarOffer[];
  addTopBarOffer: (offer: Omit<TopBarOffer, 'id'>, adminName?: string) => void;
  updateTopBarOffer: (id: string, updates: Partial<TopBarOffer>, adminName?: string) => void;
  deleteTopBarOffer: (id: string, adminName?: string) => void;
  activeTopBarOffer: TopBarOffer | null;

  // Website Banners
  banners: WebsiteBanner[];
  addBanner: (banner: Omit<WebsiteBanner, 'id'>, adminName?: string) => void;
  updateBanner: (id: string, updates: Partial<WebsiteBanner>, adminName?: string) => void;
  deleteBanner: (id: string, adminName?: string) => void;

  // Offers & Promo Codes
  offers: OfferPromotion[];
  addOffer: (offer: Omit<OfferPromotion, 'id'>, adminName?: string) => void;
  updateOffer: (id: string, updates: Partial<OfferPromotion>, adminName?: string) => void;
  deleteOffer: (id: string, adminName?: string) => void;

  // Orders
  orders: AdminOrder[];
  addOrder: (order: Omit<AdminOrder, 'id' | 'orderNumber'>, adminName?: string) => AdminOrder;
  updateOrderStatus: (id: string, newStatus: OrderStatus, note?: string, adminName?: string) => void;
  updateOrderDetails: (id: string, updates: Partial<AdminOrder>, adminName?: string) => void;

  // Inventory & Stock
  inventoryLogs: InventoryLogEntry[];
  adjustStock: (
    productId: string,
    change: number,
    reason: StockAdjustmentReason,
    adminName: string,
    variantId?: string,
    notes?: string
  ) => void;

  // Membership Config
  membershipConfig: MembershipConfig;
  updateMembershipConfig: (updates: Partial<MembershipConfig>, adminName?: string) => void;
  membershipTiers: MembershipTier[];
  updateMembershipTier: (id: string, updates: Partial<MembershipTier>, adminName?: string) => void;

  // Customers CRM
  customers: CustomerRecord[];
  addCustomer: (customer: Omit<CustomerRecord, 'id' | 'createdAt'>, adminName?: string) => void;
  updateCustomer: (id: string, updates: Partial<CustomerRecord>, adminName?: string) => void;
  deleteCustomer: (id: string, adminName?: string) => void;

  // Reviews Moderation
  reviews: ReviewItem[];
  addReview: (review: Omit<ReviewItem, 'id' | 'date'>) => void;
  updateReviewStatus: (id: string, status: 'approved' | 'pending' | 'rejected', isFeatured?: boolean, adminName?: string) => void;
  deleteReview: (id: string, adminName?: string) => void;

  // Media Assets Library
  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>, adminName?: string) => void;
  deleteMediaAsset: (id: string, adminName?: string) => void;

  // Grooming Enquiries
  groomingEnquiries: GroomingEnquiry[];
  submitGroomingEnquiry: (enquiry: GroomingEnquiry) => void;
  updateEnquiryStatus: (index: number, status: GroomingEnquiry['status'], adminName?: string) => void;

  // Notifications & Audit Logs
  notifications: AdminNotification[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  auditLogs: AdminAuditLog[];
  addAuditLog: (entry: Omit<AdminAuditLog, 'id' | 'timestamp'>) => void;

  // Studio Settings
  settings: StudioSettings;
  updateSettings: (updates: Partial<StudioSettings>, adminName?: string) => void;

  // Reset to Clean Starter Data (for demo/testing)
  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORE_STORAGE_KEY = 'coastal_tails_store_v1';

// Initial enriched product catalog
const INITIAL_PRODUCTS: Product[] = [
  ...FOOD_PRODUCTS.map((p, idx) => ({
    ...p,
    sku: `CT-FOOD-${(100 + idx).toString()}`,
    barcode: `890123456${100 + idx}`,
    costPrice: Math.round(p.price * 0.7),
    discountAmount: (p.originalPrice || p.price) - p.price,
    stockQuantity: idx === 2 ? 4 : 24, // low stock on one item
    lowStockThreshold: 5,
    maxPurchaseQuantity: 10,
    stockStatus: (idx === 2 ? 'low_stock' : 'in_stock') as Product['stockStatus'],
    visibility: 'published' as const,
    petType: (p.category === 'cat-food' || p.category === 'kitten-food' ? 'cat' : 'dog') as Product['petType'],
    createdAt: '2026-08-01',
    updatedAt: '2026-08-24',
  })),
  ...ACCESSORY_PRODUCTS.map((p, idx) => ({
    ...p,
    sku: `CT-ACC-${(200 + idx).toString()}`,
    barcode: `890123456${200 + idx}`,
    costPrice: Math.round(p.price * 0.65),
    discountAmount: (p.originalPrice || p.price) - p.price,
    stockQuantity: idx === 1 ? 0 : 18, // out of stock on one item
    lowStockThreshold: 5,
    maxPurchaseQuantity: 5,
    stockStatus: (idx === 1 ? 'out_of_stock' : 'in_stock') as Product['stockStatus'],
    inStock: idx !== 1,
    visibility: 'published' as const,
    petType: 'both' as Product['petType'],
    createdAt: '2026-08-05',
    updatedAt: '2026-08-24',
  })),
];

const INITIAL_GROOMING_ALL_PACKAGES: GroomingPackage[] = [
  ...DOG_GROOMING_PACKAGES.map((pkg, idx) => ({
    ...pkg,
    slug: pkg.id,
    displayOrder: idx + 1,
    visibility: 'published' as const,
    internalBaseCost: 500 + idx * 250,
    internalMinPrice: 1200 + idx * 600,
    internalMaxPrice: 2200 + idx * 900,
    internalMobileSurcharge: 300,
    internalMemberDiscount: 15,
    staffNotes: 'Standard dog package with botanical shampoos.',
    sizeInternalCosts: {
      small: 1200 + idx * 500,
      medium: 1500 + idx * 600,
      large: 1800 + idx * 700,
      xlarge: 2200 + idx * 900,
    },
    coatModifiers: {
      matting: 400,
      heavyShedding: 350,
      difficultHandling: 300,
      afterHours: 500,
      mobile: 300,
    },
  })),
  ...CAT_GROOMING_PACKAGES.map((pkg, idx) => ({
    ...pkg,
    slug: pkg.id,
    displayOrder: idx + 4,
    visibility: 'published' as const,
    internalBaseCost: 600 + idx * 200,
    internalMinPrice: 1400 + idx * 500,
    internalMaxPrice: 2400 + idx * 700,
    internalMobileSurcharge: 350,
    internalMemberDiscount: 15,
    staffNotes: 'Feline room strictly quiet with calming pheromone diffusers.',
  })),
];

const INITIAL_GROOMING_ALL_ADDONS: GroomingAddOn[] = GROOMING_ADD_ONS.map((a, idx) => ({
  ...a,
  active: true,
  displayOrder: idx + 1,
  internalPrice: 250 + idx * 75,
  includedTreatmentLines: [a.description, a.benefits],
}));

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persisted state or defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_products`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_categories`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CATEGORIES;
  });

  const [groomingPackages, setGroomingPackages] = useState<GroomingPackage[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_packages`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_GROOMING_ALL_PACKAGES;
  });

  const [groomingAddOns, setGroomingAddOns] = useState<GroomingAddOn[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_addons`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_GROOMING_ALL_ADDONS;
  });

  const [topBarOffers, setTopBarOffers] = useState<TopBarOffer[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_topbar`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_TOP_BAR_OFFERS;
  });

  const [banners, setBanners] = useState<WebsiteBanner[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_banners`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_WEBSITE_BANNERS;
  });

  const [offers, setOffers] = useState<OfferPromotion[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_offers`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_OFFERS;
  });

  const [orders, setOrders] = useState<AdminOrder[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_orders`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  });

  const [inventoryLogs, setInventoryLogs] = useState<InventoryLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_inv_logs`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [membershipConfig, setMembershipConfig] = useState<MembershipConfig>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_membership`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_MEMBERSHIP_CONFIG;
  });

  const [customers, setCustomers] = useState<CustomerRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_customers`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CUSTOMERS;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_reviews`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_media`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_MEDIA;
  });

  const [notifications, setNotifications] = useState<AdminNotification[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_notifs`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_audit`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_AUDIT_LOGS;
  });

  const [settings, setSettings] = useState<StudioSettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_settings`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_STUDIO_SETTINGS;
  });

  const [groomingEnquiries, setGroomingEnquiries] = useState<GroomingEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORE_STORAGE_KEY}_enquiries`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'enq-1',
        dateSubmitted: '2026-08-24 10:15 AM',
        petType: 'dog',
        petName: 'Bruno',
        breed: 'Golden Retriever',
        sizeOrCoat: 'Large (28 kg)',
        coatCondition: 'Moderate Tangling',
        requestedPackage: 'Signature Coastal Groom',
        selectedAddOns: ['Dead Sea Mineral Mud Pack', 'Paw Butter Balm Massage'],
        preferredDate: '2026-08-27',
        preferredTimeSlot: '10:30 AM',
        serviceMode: 'studio',
        customerName: 'Vikram Hegde',
        customerMobile: '+91 97410 67890',
        notes: 'Needs extra time for undercoat deshedding.',
        status: 'new',
      },
      {
        id: 'enq-2',
        dateSubmitted: '2026-08-23 04:30 PM',
        petType: 'cat',
        petName: 'Chloe',
        breed: 'Persian Cat',
        sizeOrCoat: 'Long Hair & Fluffy',
        coatCondition: 'Healthy',
        requestedPackage: 'Signature Cat Groom',
        selectedAddOns: ['Organic Blueberry Facial Scrub'],
        preferredDate: '2026-08-25',
        preferredTimeSlot: '02:00 PM',
        serviceMode: 'studio',
        customerName: 'Deepika Kamath',
        customerMobile: '+91 98450 99887',
        notes: 'Quiet room requested.',
        status: 'contacted',
      },
    ];
  });

  // Persistent storage synchronizer
  useEffect(() => {
    try {
      localStorage.setItem(`${STORE_STORAGE_KEY}_products`, JSON.stringify(products));
      localStorage.setItem(`${STORE_STORAGE_KEY}_categories`, JSON.stringify(categories));
      localStorage.setItem(`${STORE_STORAGE_KEY}_packages`, JSON.stringify(groomingPackages));
      localStorage.setItem(`${STORE_STORAGE_KEY}_addons`, JSON.stringify(groomingAddOns));
      localStorage.setItem(`${STORE_STORAGE_KEY}_topbar`, JSON.stringify(topBarOffers));
      localStorage.setItem(`${STORE_STORAGE_KEY}_banners`, JSON.stringify(banners));
      localStorage.setItem(`${STORE_STORAGE_KEY}_offers`, JSON.stringify(offers));
      localStorage.setItem(`${STORE_STORAGE_KEY}_orders`, JSON.stringify(orders));
      localStorage.setItem(`${STORE_STORAGE_KEY}_inv_logs`, JSON.stringify(inventoryLogs));
      localStorage.setItem(`${STORE_STORAGE_KEY}_membership`, JSON.stringify(membershipConfig));
      localStorage.setItem(`${STORE_STORAGE_KEY}_customers`, JSON.stringify(customers));
      localStorage.setItem(`${STORE_STORAGE_KEY}_reviews`, JSON.stringify(reviews));
      localStorage.setItem(`${STORE_STORAGE_KEY}_media`, JSON.stringify(mediaAssets));
      localStorage.setItem(`${STORE_STORAGE_KEY}_notifs`, JSON.stringify(notifications));
      localStorage.setItem(`${STORE_STORAGE_KEY}_audit`, JSON.stringify(auditLogs));
      localStorage.setItem(`${STORE_STORAGE_KEY}_settings`, JSON.stringify(settings));
      localStorage.setItem(`${STORE_STORAGE_KEY}_enquiries`, JSON.stringify(groomingEnquiries));
    } catch {
      // Storage quota or sandboxed fallback
    }
  }, [
    products,
    categories,
    groomingPackages,
    groomingAddOns,
    topBarOffers,
    banners,
    offers,
    orders,
    inventoryLogs,
    membershipConfig,
    customers,
    reviews,
    mediaAssets,
    notifications,
    auditLogs,
    settings,
    groomingEnquiries,
  ]);

  // Helper for audit logs
  const addAuditLog = (entry: Omit<AdminAuditLog, 'id' | 'timestamp'>) => {
    const newLog: AdminAuditLog = {
      ...entry,
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // ----------------------------------------------------
  // PRODUCTS METHODS
  // ----------------------------------------------------
  const addProduct = (productData: Omit<Product, 'id'>, adminName = 'Admin'): Product => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...productData,
      id,
      inStock: (productData.stockQuantity ?? 1) > 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [newProduct, ...prev]);
    addAuditLog({
      action: 'Created Product',
      category: 'product',
      entityId: id,
      entityName: newProduct.name,
      adminName,
      adminEmail: 'staff@coastaltails.in',
      details: `Created product "${newProduct.name}" at ₹${newProduct.price}`,
    });
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>, adminName = 'Admin') => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated: Product = {
            ...p,
            ...updates,
            inStock: updates.stockQuantity !== undefined ? updates.stockQuantity > 0 : p.inStock,
            updatedAt: new Date().toISOString().split('T')[0],
          };
          return updated;
        }
        return p;
      })
    );
    const existing = products.find((p) => p.id === id);
    addAuditLog({
      action: 'Updated Product',
      category: 'product',
      entityId: id,
      entityName: existing?.name || id,
      adminName,
      adminEmail: 'staff@coastaltails.in',
      details: `Modified product details for ${existing?.name || id}`,
    });
  };

  const deleteProduct = (id: string, adminName = 'Admin') => {
    const existing = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addAuditLog({
      action: 'Deleted Product',
      category: 'product',
      entityId: id,
      entityName: existing?.name || id,
      adminName,
      adminEmail: 'staff@coastaltails.in',
      details: `Permanently removed product ${existing?.name || id}`,
    });
  };

  const archiveProduct = (id: string, adminName = 'Admin') => {
    updateProduct(id, { visibility: 'archived' }, adminName);
  };

  const duplicateProduct = (id: string, adminName = 'Admin'): Product => {
    const source = products.find((p) => p.id === id);
    if (!source) throw new Error('Product not found');

    const newId = `prod-${Date.now()}`;
    const newSku = `${source.sku || 'CT-PROD'}-COPY-${Math.floor(Math.random() * 900 + 100)}`;
    const duplicated: Product = {
      ...source,
      id: newId,
      name: `${source.name} (Draft Copy)`,
      sku: newSku,
      visibility: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setProducts((prev) => [duplicated, ...prev]);
    addAuditLog({
      action: 'Duplicated Product',
      category: 'product',
      entityId: newId,
      entityName: duplicated.name,
      adminName,
      adminEmail: 'staff@coastaltails.in',
      details: `Duplicated from ${source.name} to draft SKU: ${newSku}`,
    });

    return duplicated;
  };

  // ----------------------------------------------------
  // CATEGORIES METHODS
  // ----------------------------------------------------
  const addCategory = (categoryData: Omit<Category, 'id'>, adminName = 'Admin') => {
    const id = categoryData.slug || `cat-${Date.now()}`;
    const newCategory: Category = { ...categoryData, id };
    setCategories((prev) => [...prev, newCategory]);
    addAuditLog({
      action: 'Created Category',
      category: 'category',
      entityId: id,
      entityName: newCategory.name,
      adminName,
      adminEmail: 'staff@coastaltails.in',
    });
  };

  const updateCategory = (id: string, updates: Partial<Category>, adminName = 'Admin') => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    addAuditLog({
      action: 'Updated Category',
      category: 'category',
      entityId: id,
      entityName: updates.name || id,
      adminName,
      adminEmail: 'staff@coastaltails.in',
    });
  };

  const deleteCategory = (id: string, adminName = 'Admin') => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    addAuditLog({
      action: 'Deleted Category',
      category: 'category',
      entityId: id,
      entityName: id,
      adminName,
      adminEmail: 'staff@coastaltails.in',
    });
  };

  const reorderCategories = (newOrder: Category[], adminName = 'Admin') => {
    setCategories(newOrder);
    addAuditLog({
      action: 'Reordered Categories',
      category: 'category',
      entityName: 'Categories Menu',
      adminName,
      adminEmail: 'staff@coastaltails.in',
    });
  };

  // ----------------------------------------------------
  // GROOMING PACKAGES METHODS (DOGS & CATS)
  // ----------------------------------------------------
  const addGroomingPackage = (pkgData: Omit<GroomingPackage, 'id'>, adminName = 'Admin') => {
    const id = `${pkgData.petType}-${Date.now()}`;
    const newPkg: GroomingPackage = {
      ...pkgData,
      id,
      priceMode: 'ask', // Strict customer policy
    };
    setGroomingPackages((prev) => [...prev, newPkg]);
    addAuditLog({
      action: 'Created Grooming Package',
      category: 'package',
      entityId: id,
      entityName: newPkg.title,
      adminName,
      adminEmail: 'staff@coastaltails.in',
    });
  };

  const updateGroomingPackage = (id: string, updates: Partial<GroomingPackage>, adminName = 'Admin') => {
    setGroomingPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, ...updates, priceMode: 'ask' } : pkg))
    );
    addAuditLog({
      action: 'Updated Grooming Package',
      category: 'package',
      entityId: id,
      entityName: updates.title || id,
      adminName,
      adminEmail: 'staff@coastaltails.in',
    });
  };

  const deleteGroomingPackage = (id: string, adminName = 'Admin') => {
    setGroomingPackages((prev) => prev.filter((p) => p.id !== id));
    addAuditLog({
      action: 'Deleted Grooming Package',
      category: 'package',
      entityId: id,
      entityName: id,
      adminName,
      adminEmail: 'staff@coastaltails.in',
    });
  };

  // ----------------------------------------------------
  // GROOMING ADD-ONS METHODS
  // ----------------------------------------------------
  const addGroomingAddOn = (addOnData: Omit<GroomingAddOn, 'id'>, adminName = 'Admin') => {
    const id = `addon-${Date.now()}`;
    const newAddOn: GroomingAddOn = { ...addOnData, id, priceMode: 'ask' };
    setGroomingAddOns((prev) => [...prev, newAddOn]);
    addAuditLog({
      action: 'Created Grooming Add-On',
      category: 'package',
      entityId: id,
      entityName: newAddOn.name,
      adminName,
      adminEmail: 'staff@coastaltails.in',
    });
  };

  const updateGroomingAddOn = (id: string, updates: Partial<GroomingAddOn>, adminName = 'Admin') => {
    setGroomingAddOns((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates, priceMode: 'ask' } : a))
    );
    addAuditLog({
      action: 'Updated Grooming Add-On',
      category: 'package',
      entityId: id,
      entityName: updates.name || id,
      adminName,
      adminEmail: 'staff@coastaltails.in',
    });
  };

  const deleteGroomingAddOn = (id: string, adminName = 'Admin') => {
    setGroomingAddOns((prev) => prev.filter((a) => a.id !== id));
  };

  // ----------------------------------------------------
  // TOP BAR OFFERS
  // ----------------------------------------------------
  const addTopBarOffer = (offerData: Omit<TopBarOffer, 'id'>, adminName = 'Admin') => {
    const id = `top-${Date.now()}`;
    const newOffer: TopBarOffer = { ...offerData, id };
    setTopBarOffers((prev) => [newOffer, ...prev]);
    addAuditLog({
      action: 'Created Top Bar Offer',
      category: 'offer',
      entityId: id,
      entityName: newOffer.title,
      adminName,
      adminEmail: 'staff@coastaltails.in',
    });
  };

  const updateTopBarOffer = (id: string, updates: Partial<TopBarOffer>, adminName = 'Admin') => {
    setTopBarOffers((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)));
  };

  const deleteTopBarOffer = (id: string) => {
    setTopBarOffers((prev) => prev.filter((o) => o.id !== id));
  };

  // Active top bar offer calculation (respects date schedule and priority)
  const activeTopBarOffer = React.useMemo(() => {
    const now = new Date().toISOString().split('T')[0];
    const valid = topBarOffers
      .filter((o) => o.active && o.startDate <= now && o.endDate >= now)
      .sort((a, b) => a.priority - b.priority);
    return valid[0] || null;
  }, [topBarOffers]);

  // ----------------------------------------------------
  // WEBSITE BANNERS
  // ----------------------------------------------------
  const addBanner = (bannerData: Omit<WebsiteBanner, 'id'>, adminName = 'Admin') => {
    const id = `banner-${Date.now()}`;
    const newBanner: WebsiteBanner = { ...bannerData, id };
    setBanners((prev) => [...prev, newBanner]);
  };

  const updateBanner = (id: string, updates: Partial<WebsiteBanner>, adminName = 'Admin') => {
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const deleteBanner = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  // ----------------------------------------------------
  // OFFERS & PROMOTIONS
  // ----------------------------------------------------
  const addOffer = (offerData: Omit<OfferPromotion, 'id'>, adminName = 'Admin') => {
    const id = `off-${Date.now()}`;
    const newOffer: OfferPromotion = { ...offerData, id };
    setOffers((prev) => [newOffer, ...prev]);
    addAuditLog({
      action: 'Created Promo Code',
      category: 'offer',
      entityId: id,
      entityName: `${newOffer.name} (${newOffer.code})`,
      adminName,
      adminEmail: 'staff@coastaltails.in',
    });
  };

  const updateOffer = (id: string, updates: Partial<OfferPromotion>, adminName = 'Admin') => {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)));
  };

  const deleteOffer = (id: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };

  // ----------------------------------------------------
  // ORDERS MANAGEMENT
  // ----------------------------------------------------
  const addOrder = (orderData: Omit<AdminOrder, 'id' | 'orderNumber'>, adminName = 'System'): AdminOrder => {
    const randomSeq = Math.floor(Math.random() * 900 + 1000);
    const orderNumber = `CT-2026-${randomSeq}`;
    const id = `ord-${Date.now()}`;

    const newOrder: AdminOrder = {
      ...orderData,
      id,
      orderNumber,
      timeline: [
        {
          timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
          status: orderData.orderStatus || 'new',
          note: 'Order entered into system.',
          adminName,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Also link or update customer record
    setCustomers((prev) => {
      const existing = prev.find(
        (c) => c.phone.replace(/\D/g, '') === newOrder.mobileNumber.replace(/\D/g, '')
      );
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpending: c.totalSpending + newOrder.total,
                lastOrderDate: new Date().toISOString().split('T')[0],
              }
            : c
        );
      } else {
        const newCust: CustomerRecord = {
          id: `cust-${Date.now()}`,
          name: newOrder.customerName,
          phone: newOrder.mobileNumber,
          whatsapp: newOrder.whatsappNumber,
          address: newOrder.deliveryAddress,
          areaLocation: newOrder.areaLocation,
          totalOrders: 1,
          totalSpending: newOrder.total,
          lastOrderDate: new Date().toISOString().split('T')[0],
          groomingVisits: 0,
          isVipMember: false,
          status: 'active',
          createdAt: new Date().toISOString().split('T')[0],
        };
        return [newCust, ...prev];
      }
    });

    // Create Notification
    const notif: AdminNotification = {
      id: `notif-${Date.now()}`,
      type: 'order',
      title: `New Order #${orderNumber}`,
      message: `${newOrder.customerName} placed order for ₹${newOrder.total}`,
      timestamp: 'Just now',
      read: false,
      link: 'orders',
    };
    setNotifications((prev) => [notif, ...prev]);

    return newOrder;
  };

  const updateOrderStatus = (
    id: string,
    newStatus: OrderStatus,
    note = '',
    adminName = 'Staff'
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === id) {
          const newEvent = {
            timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
            status: newStatus,
            note: note || `Order marked as ${newStatus.replace(/_/g, ' ')}`,
            adminName,
          };
          return {
            ...ord,
            orderStatus: newStatus,
            timeline: [newEvent, ...ord.timeline],
          };
        }
        return ord;
      })
    );
    addAuditLog({
      action: `Status: ${newStatus}`,
      category: 'order',
      entityId: id,
      entityName: `Order ${id}`,
      adminName,
      adminEmail: 'staff@coastaltails.in',
      details: note,
    });
  };

  const updateOrderDetails = (id: string, updates: Partial<AdminOrder>, adminName = 'Staff') => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)));
  };

  // ----------------------------------------------------
  // INVENTORY & STOCK ADJUSTMENTS
  // ----------------------------------------------------
  const adjustStock = (
    productId: string,
    change: number,
    reason: StockAdjustmentReason,
    adminName: string,
    variantId?: string,
    notes?: string
  ) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const currentQty = p.stockQuantity ?? 0;
          const newQty = Math.max(0, currentQty + change);
          const threshold = p.lowStockThreshold || 5;
          const status = newQty === 0 ? 'out_of_stock' : newQty <= threshold ? 'low_stock' : 'in_stock';
          
          // Log adjustment
          const logEntry: InventoryLogEntry = {
            id: `inv-${Date.now()}`,
            productId,
            productName: p.name,
            sku: p.sku || 'SKU-N/A',
            previousStock: currentQty,
            change,
            newStock: newQty,
            reason,
            adminName,
            timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
            notes,
          };
          setInventoryLogs((l) => [logEntry, ...l]);

          // Trigger notification if low/out
          if (newQty <= threshold) {
            const notif: AdminNotification = {
              id: `notif-${Date.now()}`,
              type: newQty === 0 ? 'out_of_stock' : 'low_stock',
              title: newQty === 0 ? `Out of Stock: ${p.name}` : `Low Stock Alert: ${p.name}`,
              message: `Current stock: ${newQty} units (Threshold: ${threshold}).`,
              timestamp: 'Just now',
              read: false,
              link: 'inventory',
            };
            setNotifications((n) => [notif, ...n]);
          }

          return {
            ...p,
            stockQuantity: newQty,
            stockStatus: status,
            inStock: newQty > 0,
            updatedAt: new Date().toISOString().split('T')[0],
          };
        }
        return p;
      })
    );
  };

  // ----------------------------------------------------
  // MEMBERSHIP CONFIG
  // ----------------------------------------------------
  const updateMembershipConfig = (updates: Partial<MembershipConfig>, adminName = 'Admin') => {
    setMembershipConfig((prev) => ({ ...prev, ...updates }));
    addAuditLog({
      action: 'Updated Membership Perks',
      category: 'settings',
      entityName: 'VIP Club Configuration',
      adminName,
      adminEmail: 'admin@coastaltails.in',
    });
  };

  const membershipTiers: MembershipTier[] = [
    {
      id: 'tier-vip-1',
      name: membershipConfig.name,
      tagline: membershipConfig.tagline,
      annualFee: membershipConfig.annualPrice,
      discountPercentageGrooming: membershipConfig.groomingDiscountPercentage,
      discountPercentageProducts: membershipConfig.retailDiscountPercentage,
      benefits: membershipConfig.benefits.map((b) => b.title),
      active: true,
    },
  ];

  const updateMembershipTier = (id: string, updates: Partial<MembershipTier>, adminName = 'Admin') => {
    updateMembershipConfig(
      {
        name: updates.name ?? membershipConfig.name,
        tagline: updates.tagline ?? membershipConfig.tagline,
        annualPrice: updates.annualFee ?? membershipConfig.annualPrice,
        groomingDiscountPercentage: updates.discountPercentageGrooming ?? membershipConfig.groomingDiscountPercentage,
        retailDiscountPercentage: updates.discountPercentageProducts ?? membershipConfig.retailDiscountPercentage,
      },
      adminName
    );
  };

  // ----------------------------------------------------
  // CUSTOMERS CRM
  // ----------------------------------------------------
  const addCustomer = (custData: Omit<CustomerRecord, 'id' | 'createdAt'>, adminName = 'Staff') => {
    const id = `cust-${Date.now()}`;
    const newCust: CustomerRecord = {
      ...custData,
      id,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCustomers((prev) => [newCust, ...prev]);
  };

  const updateCustomer = (id: string, updates: Partial<CustomerRecord>, adminName = 'Staff') => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  // ----------------------------------------------------
  // REVIEWS MODERATION
  // ----------------------------------------------------
  const addReview = (reviewData: Omit<ReviewItem, 'id' | 'date'>) => {
    const id = `rev-${Date.now()}`;
    const newReview: ReviewItem = {
      ...reviewData,
      id,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const updateReviewStatus = (
    id: string,
    status: 'approved' | 'pending' | 'rejected',
    isFeatured?: boolean,
    adminName = 'Staff'
  ) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              isFeatured: isFeatured !== undefined ? isFeatured : r.isFeatured,
            }
          : r
      )
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  // ----------------------------------------------------
  // MEDIA ASSETS
  // ----------------------------------------------------
  const addMediaAsset = (assetData: Omit<MediaAsset, 'id' | 'uploadedAt'>, adminName = 'Staff') => {
    const id = `med-${Date.now()}`;
    const newAsset: MediaAsset = {
      ...assetData,
      id,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setMediaAssets((prev) => [newAsset, ...prev]);
  };

  const deleteMediaAsset = (id: string) => {
    setMediaAssets((prev) => prev.filter((m) => m.id !== id));
  };

  // ----------------------------------------------------
  // GROOMING ENQUIRIES
  // ----------------------------------------------------
  const submitGroomingEnquiry = (enquiry: GroomingEnquiry) => {
    const newEnq: GroomingEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      dateSubmitted: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'new',
    };
    setGroomingEnquiries((prev) => [newEnq, ...prev]);

    // Create Notification
    const notif: AdminNotification = {
      id: `notif-${Date.now()}`,
      type: 'enquiry',
      title: `Grooming Enquiry: ${newEnq.petName} (${newEnq.breed})`,
      message: `${newEnq.customerName} requested ${newEnq.requestedPackage} for ${newEnq.preferredDate}`,
      timestamp: 'Just now',
      read: false,
      link: 'orders',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const updateEnquiryStatus = (index: number, status: GroomingEnquiry['status'], adminName = 'Staff') => {
    setGroomingEnquiries((prev) =>
      prev.map((e, idx) => (idx === index ? { ...e, status } : e))
    );
  };

  // ----------------------------------------------------
  // NOTIFICATIONS
  // ----------------------------------------------------
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // ----------------------------------------------------
  // STUDIO SETTINGS
  // ----------------------------------------------------
  const updateSettings = (updates: Partial<StudioSettings>, adminName = 'Admin') => {
    setSettings((prev) => ({ ...prev, ...updates }));
    addAuditLog({
      action: 'Updated Studio Settings',
      category: 'settings',
      entityName: 'Studio Configuration',
      adminName,
      adminEmail: 'admin@coastaltails.in',
    });
  };

  // ----------------------------------------------------
  // RESET DEFAULTS
  // ----------------------------------------------------
  const resetToDefaults = () => {
    localStorage.clear();
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setGroomingPackages(INITIAL_GROOMING_ALL_PACKAGES);
    setGroomingAddOns(INITIAL_GROOMING_ALL_ADDONS);
    setTopBarOffers(INITIAL_TOP_BAR_OFFERS);
    setBanners(INITIAL_WEBSITE_BANNERS);
    setOffers(INITIAL_OFFERS);
    setOrders(INITIAL_ORDERS);
    setMembershipConfig(INITIAL_MEMBERSHIP_CONFIG);
    setCustomers(INITIAL_CUSTOMERS);
    setReviews(INITIAL_REVIEWS);
    setMediaAssets(INITIAL_MEDIA);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setSettings(INITIAL_STUDIO_SETTINGS);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        archiveProduct,
        duplicateProduct,

        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        reorderCategories,

        groomingPackages,
        addGroomingPackage,
        updateGroomingPackage,
        deleteGroomingPackage,

        groomingAddOns,
        addGroomingAddOn,
        updateGroomingAddOn,
        deleteGroomingAddOn,

        topBarOffers,
        addTopBarOffer,
        updateTopBarOffer,
        deleteTopBarOffer,
        activeTopBarOffer,

        banners,
        addBanner,
        updateBanner,
        deleteBanner,

        offers,
        addOffer,
        updateOffer,
        deleteOffer,

        orders,
        addOrder,
        updateOrderStatus,
        updateOrderDetails,

        inventoryLogs,
        adjustStock,

        membershipConfig,
        updateMembershipConfig,
        membershipTiers,
        updateMembershipTier,

        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,

        reviews,
        addReview,
        updateReviewStatus,
        deleteReview,

        mediaAssets,
        addMediaAsset,
        deleteMediaAsset,

        groomingEnquiries,
        submitGroomingEnquiry,
        updateEnquiryStatus,

        notifications,
        markNotificationRead,
        clearAllNotifications,
        auditLogs,
        addAuditLog,

        settings,
        updateSettings,

        resetToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
