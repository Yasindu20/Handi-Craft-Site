import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // ✅ FIXED: Immediate scroll to top for better UX
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Instant scroll instead of smooth for page changes
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;