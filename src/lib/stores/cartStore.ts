import { writable } from 'svelte/store';
import Cookies from 'js-cookie';
import type { Product } from '$lib/types';
import { toast } from '$lib/utils/toast';

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: string;
}

interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Cookie configuration
const CART_COOKIE_NAME = 'emb_cart';
const COOKIE_EXPIRY_DAYS = 7;

// Initialize cart from cookies or empty
const initialCart: Cart = getCartFromCookies();

export const cart = writable<Cart>(initialCart);

// Helper function to get cart from cookies
function getCartFromCookies(): Cart {
  try {
    const cartData = Cookies.get(CART_COOKIE_NAME);
    if (cartData) {
      return JSON.parse(cartData);
    }
  } catch (error) {
    console.error('Error parsing cart from cookies:', error);
  }
  return { items: [], total: 0, itemCount: 0 };
}

// Helper function to save cart to cookies
function saveCartToCookies(cartData: Cart) {
  try {
    Cookies.set(CART_COOKIE_NAME, JSON.stringify(cartData), {
      expires: COOKIE_EXPIRY_DAYS,
      sameSite: 'strict',
      secure: true
    });
  } catch (error) {
    console.error('Error saving cart to cookies:', error);
  }
}

// Calculate cart totals
function calculateTotals(items: CartItem[]): { total: number; itemCount: number } {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
}

// Cart actions
export const cartActions = {
  addToCart(product: Product, quantity: number = 1) {
    cart.update(currentCart => {
      const existingItemIndex = currentCart.items.findIndex(
        item => item.product.name === product.name
      );

      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        newItems = currentCart.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast.success('Cart updated!', `${product.name} quantity increased.`);
      } else {
        const newItem: CartItem = {
          product,
          quantity,
          addedAt: new Date().toISOString()
        };
        newItems = [...currentCart.items, newItem];
        toast.success('Added to cart!', `${product.name} has been added to your cart.`);
      }

      const { total, itemCount } = calculateTotals(newItems);
      const newCart = { items: newItems, total, itemCount };
      saveCartToCookies(newCart);
      return newCart;
    });
  },

  removeFromCart(productId: string, productName?: string) {
    cart.update(currentCart => {
      const newItems = currentCart.items.filter(item => item.product.name !== productId);
      const { total, itemCount } = calculateTotals(newItems);
      const newCart = { items: newItems, total, itemCount };

      saveCartToCookies(newCart);

      if (productName) {
        toast.info('Item removed', `${productName} was removed from your cart.`);
      }

      return newCart;
    });
  },

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      cartActions.removeFromCart(productId);
      return;
    }

    cart.update(currentCart => {
      const newItems = currentCart.items.map(item =>
        item.product.name === productId
          ? { ...item, quantity }
          : item
      );
      const { total, itemCount } = calculateTotals(newItems);
      const newCart = { items: newItems, total, itemCount };

      // Save to cookies
      saveCartToCookies(newCart);

      return newCart;
    });
  },

  clearCart() {
    const newCart: Cart = { items: [], total: 0, itemCount: 0 };

    // Remove from cookies
    Cookies.remove(CART_COOKIE_NAME);

    cart.set(newCart);
  },

  getCartItemCount() {
    let count = 0;
    cart.subscribe($cart => {
      count = $cart.itemCount;
    })();
    return count;
  }
};
