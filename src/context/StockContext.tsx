// src/context/StockContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from "react";
import { Stock } from "../types/stock.ts";
import { stockApi } from "../api/stockApi.ts";

interface StockState {
  searchQuery: string;
  searchResults: Stock[];
  loading: boolean;
  showResults: boolean;
  error: string | null;
}

type StockAction =
  | { type: "SET_SEARCH_RESULTS"; payload: Stock[] }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_SHOW_RESULTS"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SELECT_STOCK"; payload: Stock }
  | { type: "CLEAR_SEARCH" }
  | { type: "SET_ERROR"; payload: string | null };

interface StockContextType extends StockState {
  setSearchQuery: (query: string) => void;
  searchStocks: (query: string) => Promise<void>;
  clearSearch: () => void;
  setShowResults: (show: boolean) => void;
  selectStock: (stock: Stock) => void;
}

const initialState: StockState = {
  searchQuery: "",
  searchResults: [],
  loading: false,
  showResults: false,
  error: null,
};

const StockContext = createContext<StockContextType | undefined>(undefined);

function stockReducer(state: StockState, action: StockAction): StockState {
  switch (action.type) {
    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload, loading: false };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_SHOW_RESULTS":
      return { ...state, showResults: action.payload };
    case "SELECT_STOCK":
      return {
        ...state,
        searchResults: [action.payload], // Keep only selected stock
        showResults: true,
        searchQuery: action.payload.symbol,
      };
    case "CLEAR_SEARCH":
      return {
        ...state,
        searchQuery: "",
        searchResults: [],
        loading: false,
        showResults: false,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function StockProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(stockReducer, initialState);

  const searchStocks = useCallback(async (query: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });
      const results = await stockApi.searchStocks(query);
      dispatch({ type: "SET_SEARCH_RESULTS", payload: results });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error ? error.message : "Failed to search stocks",
      });
    }
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
  }, []);

  const clearSearch = useCallback(() => {
    dispatch({ type: "CLEAR_SEARCH" });
  }, []);

  const setShowResults = useCallback((show: boolean) => {
    dispatch({ type: "SET_SHOW_RESULTS", payload: show });
  }, []);

  const selectStock = useCallback((stock: Stock) => {
    dispatch({ type: "SELECT_STOCK", payload: stock });
  }, []);

  const value: StockContextType = {
    searchQuery: state.searchQuery,
    searchResults: state.searchResults,
    loading: state.loading,
    showResults: state.showResults,
    error: state.error,
    setSearchQuery,
    searchStocks,
    clearSearch,
    setShowResults,
    selectStock,
  };

  return (
    <StockContext.Provider value={value}>{children}</StockContext.Provider>
  );
}

export function useStock(): StockContextType {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error("useStock must be used within a StockProvider");
  }
  return context;
}
