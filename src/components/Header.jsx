import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SearchModal from './SearchModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const { getWishlistCount } = useWishlist();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActiveLink = (href) => {
    return location.pathname === href;
  };

  return (
    <>
      <header className={`bg-white shadow-lg sticky top-0 z-40 transition-all duration-200 ${
        isScrolled ? 'py-2' : 'py-0'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex-shrink-0 z-50">
              <Link to="/" className="flex items-center group">
                <span className="text-lg sm:text-2xl font-bold font-serif text-primary-600 group-hover:text-primary-700 transition-colors">
                  HandloomCraft
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 relative ${
                    isActiveLink(item.href)
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  {item.name}
                  {isActiveLink(item.href) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3 z-50">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors hover:bg-gray-100 rounded-lg"
                title="Search"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              
              <Link 
                to="/wishlist" 
                className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors hover:bg-gray-100 rounded-lg"
                title="Wishlist"
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                {getWishlistCount() > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    {getWishlistCount() > 9 ? '9+' : getWishlistCount()}
                  </span>
                )}
              </Link>

              <Link 
                to="/cart" 
                className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors hover:bg-gray-100 rounded-lg"
                title="Shopping Cart"
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-medium animate-pulse">
                    {getCartItemsCount() > 9 ? '9+' : getCartItemsCount()}
                  </span>
                )}
              </Link>

              <button 
                className="hidden sm:block p-2 text-gray-600 hover:text-primary-600 transition-colors hover:bg-gray-100 rounded-lg"
                title="Account"
              >
                <User className="h-5 w-5" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors hover:bg-gray-100 rounded-lg relative z-50"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            ></div>
            
            {/* Menu Panel */}
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <span className="text-lg font-semibold text-gray-900">Menu</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 py-6 overflow-y-auto">
                  <div className="space-y-2 px-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block px-4 py-3 text-base font-medium transition-colors duration-200 rounded-lg ${
                          isActiveLink(item.href)
                            ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  
                  {/* Mobile Account Link */}
                  <div className="mt-6 px-4 pt-6 border-t border-gray-200">
                    <button className="flex items-center space-x-3 w-full px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <User className="h-5 w-5" />
                      <span>My Account</span>
                    </button>
                  </div>
                </div>

                {/* Footer with cart/wishlist summary */}
                <div className="border-t border-gray-200 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      to="/cart"
                      className="flex items-center justify-center space-x-2 bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors hover:bg-primary-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Cart ({getCartItemsCount()})</span>
                    </Link>
                    <Link
                      to="/wishlist"
                      className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium transition-colors hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Heart className="h-4 w-4" />
                      <span>Wishlist ({getWishlistCount()})</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Header;