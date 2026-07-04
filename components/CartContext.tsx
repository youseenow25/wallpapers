"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { CartItem, Wallpaper } from "@/lib/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type Action =
  | { type: "ADD"; wallpaper: Wallpaper; quantity: number }
  | { type: "REMOVE"; id: number }
  | { type: "UPDATE_QTY"; id: number; quantity: number }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "HYDRATE"; items: CartItem[] };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find(
        (i) => i.wallpaper.id === action.wallpaper.id,
      );
      return {
        ...state,
        items: existing
          ? state.items.map((i) =>
              i.wallpaper.id === action.wallpaper.id
                ? { ...i, quantity: i.quantity + action.quantity }
                : i,
            )
          : [...state.items, { wallpaper: action.wallpaper, quantity: action.quantity }],
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.wallpaper.id !== action.id) };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.wallpaper.id === action.id ? { ...i, quantity: action.quantity } : i,
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "HYDRATE":
      return { ...state, items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  count: number;
  total: number;
  addItem: (wallpaper: Wallpaper, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("wv-cart");
    if (stored) {
      try {
        dispatch({ type: "HYDRATE", items: JSON.parse(stored) });
      } catch {}
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("wv-cart", JSON.stringify(state.items));
    }
  }, [state.items, hydrated]);

  const count = state.items.reduce((s, i) => s + i.quantity, 0);
  const total = state.items.reduce(
    (s, i) => s + Number(i.wallpaper.price) * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        count,
        total,
        addItem: (wallpaper, quantity = 1) =>
          dispatch({ type: "ADD", wallpaper, quantity }),
        removeItem: (id) => dispatch({ type: "REMOVE", id }),
        updateQuantity: (id, quantity) =>
          dispatch({ type: "UPDATE_QTY", id, quantity }),
        clearCart: () => dispatch({ type: "CLEAR" }),
        openCart: () => dispatch({ type: "OPEN" }),
        closeCart: () => dispatch({ type: "CLOSE" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
