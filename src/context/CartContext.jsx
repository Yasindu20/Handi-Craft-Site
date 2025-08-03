import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    loading: false 
  });

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const addToCart = (product) => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      dispatch({ type: 'ADD_TO_CART', payload: product });
      setLoading(false);
    }, 100);
  };

  const removeFromCart = (productId) => {
    setLoading(true);
    setTimeout(() => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
      setLoading(false);
    }, 100);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setLoading(true);
      setTimeout(() => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
        setLoading(false);
      }, 100);
    }
  };

  const clearCart = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      setLoading(false);
    }, 100);
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartWeight = () => {
    // Estimate weight for shipping calculation
    return state.items.reduce((total, item) => total + (item.weight || 0.5) * item.quantity, 0);
  };

  const value = {
    items: state.items,
    loading: state.loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getCartWeight,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};