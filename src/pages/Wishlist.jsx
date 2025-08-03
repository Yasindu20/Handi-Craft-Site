import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import Breadcrumb from '../components/ui/Breadcrumb';

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const breadcrumbItems = [
    { label: 'Wishlist' }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} has been added to your cart.`
    });
  };

  const handleRemoveFromWishlist = (productId, productName) => {
    removeFromWishlist(productId);
    addToast({
      type: 'info',
      message: `${productName} removed from wishlist`
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="text-center bg-white p-12 rounded-xl shadow-lg">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Save your favorite items for later by adding them to your wishlist.
            </p>
            <Link to="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold font-serif text-gray-900">My Wishlist</h1>
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                
                <button
                  onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  <Link to={`/product/${item.id}`} className="hover:text-primary-600 transition-colors">
                    {item.name}
                  </Link>
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary-600">
                    ${item.price}
                  </span>
                  
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      item.inStock
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
                
                {!item.inStock && (
                  <p className="text-red-600 text-sm mt-2 font-medium">Out of Stock</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;