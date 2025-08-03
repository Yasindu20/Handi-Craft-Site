import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SearchModal from './SearchModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const { getWishlistCount } = useWishlist();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActiveLink = (href) => {
    return location.pathname === href;
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <span className="text-2xl font-bold font-serif text-primary-600 group-hover:text-primary-700 transition-colors">
                  HandloomCraft
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
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
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors hover:bg-gray-100 rounded-lg"
                title="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              
              <Link 
                to="/wishlist" 
                className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors hover:bg-gray-100 rounded-lg"
                title="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {getWishlistCount() > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    {getWishlistCount()}
                  </span>
                )}
              </Link>

              <Link 
                to="/cart" 
                className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors hover:bg-gray-100 rounded-lg"
                title="Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-medium animate-pulse">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>

              <button 
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors hover:bg-gray-100 rounded-lg"
                title="Account"
              >
                <User className="h-5 w-5" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors hover:bg-gray-100 rounded-lg"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-lg ${
                      isActiveLink(item.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
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