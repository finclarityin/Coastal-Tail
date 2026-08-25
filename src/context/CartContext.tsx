import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, GroomingPackage } from '../types';

interface CartContextType {
  items: CartItem[];
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  // Grooming Modal state
  isGroomingModalOpen: boolean;
  selectedGroomingPackage: GroomingPackage | null;
  groomingDefaultPetType: 'dog' | 'cat';
  groomingDefaultMode: 'studio' | 'doorstep';
  openGroomingEnquiry: (
    pkg?: GroomingPackage | null,
    defaultTypeOrMode?: 'dog' | 'cat' | 'doorstep' | 'studio'
  ) => void;
  closeGroomingEnquiry: () => void;
  // Product Detail Modal state
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  // Toast notifications
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'coastal_tails_cart_v1';
const WISHLIST_STORAGE_KEY = 'coastal_tails_wishlist_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isGroomingModalOpen, setIsGroomingModalOpen] = useState(false);
  const [selectedGroomingPackage, setSelectedGroomingPackage] = useState<GroomingPackage | null>(null);
  const [groomingDefaultPetType, setGroomingDefaultPetType] = useState<'dog' | 'cat'>('dog');
  const [groomingDefaultMode, setGroomingDefaultMode] = useState<'studio' | 'doorstep'>('studio');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
    showToast(`Added "${product.name}" to cart! 🐾`);
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openGroomingEnquiry = (
    pkg?: GroomingPackage | null,
    defaultTypeOrMode?: 'dog' | 'cat' | 'doorstep' | 'studio'
  ) => {
    setSelectedGroomingPackage(pkg || null);
    if (defaultTypeOrMode === 'dog' || defaultTypeOrMode === 'cat') {
      setGroomingDefaultPetType(defaultTypeOrMode);
    } else if (pkg?.petType) {
      setPetTypeHelper: setGroomingDefaultPetType(pkg.petType);
    }
    
    if (defaultTypeOrMode === 'doorstep' || defaultTypeOrMode === 'studio') {
      setGroomingDefaultMode(defaultTypeOrMode);
    } else {
      setGroomingDefaultMode('studio');
    }
    setIsGroomingModalOpen(true);
  };

  const closeGroomingEnquiry = () => {
    setIsGroomingModalOpen(false);
    setSelectedGroomingPackage(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from favorites');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to favorites! ❤️');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        cart: items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isGroomingModalOpen,
        selectedGroomingPackage,
        groomingDefaultPetType,
        groomingDefaultMode,
        openGroomingEnquiry,
        closeGroomingEnquiry,
        selectedProductForDetail,
        setSelectedProductForDetail,
        wishlist,
        toggleWishlist,
        isInWishlist,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
