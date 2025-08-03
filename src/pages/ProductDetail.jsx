import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { Star, Heart, ShoppingCart, ArrowLeft, Truck, Shield, RotateCcw, Share2, Plus, Minus, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/ui/Breadcrumb';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [imageZoomed, setImageZoomed] = useState(false);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const { addToast } = useToast();

  // ✅ FIXED: Remove artificial delay, load immediately
  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    
    if (foundProduct) {
      addToRecentlyViewed(foundProduct);
      // Reset states when product changes
      setSelectedImage(0);
      setQuantity(1);
      setActiveTab('description');
      setImageZoomed(false);
    }
  }, [id, addToRecentlyViewed]);

  // Show loading only if product is not found yet
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // Mock additional images
  const productImages = Array(4).fill(product.image);
  
  // Related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Products', href: '/products' },
    { label: product.name }
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${quantity} ${product.name} added to your cart.`
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      addToast({
        type: 'info',
        message: 'Removed from wishlist'
      });
    } else {
      addToWishlist(product);
      addToast({
        type: 'success',
        message: 'Added to wishlist'
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'success',
        message: 'Product link copied to clipboard!'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-w-1 aspect-h-1 rounded-xl overflow-hidden bg-white shadow-lg">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className={`w-full h-96 object-cover cursor-zoom-in transition-transform duration-300 ${
                  imageZoomed ? 'scale-150' : 'scale-100'
                }`}
                onClick={() => setImageZoomed(!imageZoomed)}
              />
              
              {/* Image zoom indicator */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                <Zap className="h-4 w-4" />
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index 
                      ? 'border-primary-600 ring-2 ring-primary-600 ring-opacity-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold font-serif text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>

                <button
                  onClick={handleShare}
                  className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                  title="Share Product"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="text-3xl font-bold text-primary-600">
                  ${product.price}
                </div>
                {product.originalPrice && (
                  <div className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </div>
                )}
                {product.originalPrice && (
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </div>
                )}
              </div>
            </div>

            {/* Product Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'features', label: 'Features' },
                  { id: 'reviews', label: 'Reviews' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="py-4">
              {activeTab === 'description' && (
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              )}
              
              {activeTab === 'features' && (
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              
              {activeTab === 'reviews' && (
                <div className="text-gray-600">
                  <p>Customer reviews coming soon!</p>
                </div>
              )}
            </div>

            {/* Add to Cart Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-6 py-3 bg-gray-50 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-lg font-medium transition-all transform hover:scale-105 ${
                    product.inStock
                      ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleWishlistToggle}
                  className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 ${
                    isInWishlist(product.id)
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-gray-300 hover:border-gray-400 text-gray-600'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Product Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md">
                <Truck className="h-6 w-6 text-primary-600" />
                <div>
                  <div className="font-medium text-gray-900">Free Shipping</div>
                  <div className="text-sm text-gray-600">On orders over $50</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md">
                <Shield className="h-6 w-6 text-primary-600" />
                <div>
                  <div className="font-medium text-gray-900">Authentic</div>
                  <div className="text-sm text-gray-600">100% handmade</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md">
                <RotateCcw className="h-6 w-6 text-primary-600" />
                <div>
                  <div className="font-medium text-gray-900">30-Day Return</div>
                  <div className="text-sm text-gray-600">Easy returns</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold font-serif text-gray-900 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;