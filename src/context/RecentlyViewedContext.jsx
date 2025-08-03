import { createContext, useContext, useReducer, useEffect } from 'react';

const RecentlyViewedContext = createContext();

const recentlyViewedReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_RECENTLY_VIEWED':
      const filtered = state.items.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        items: [action.payload, ...filtered].slice(0, 10) // Keep last 10 items
      };
    
    case 'CLEAR_RECENTLY_VIEWED':
      return {
        ...state,
        items: []
      };
    
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        items: action.payload
      };
    
    default:
      return state;
  }
};

export const RecentlyViewedProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recentlyViewedReducer, { items: [] });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      try {
        const items = JSON.parse(stored);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: items });
      } catch (error) {
        console.error('Error loading recently viewed items:', error);
      }
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(state.items));
  }, [state.items]);

  const addToRecentlyViewed = (product) => {
    dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: product });
  };

  const clearRecentlyViewed = () => {
    dispatch({ type: 'CLEAR_RECENTLY_VIEWED' });
  };

  return (
    <RecentlyViewedContext.Provider value={{
      items: state.items,
      addToRecentlyViewed,
      clearRecentlyViewed
    }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  }
  return context;
};