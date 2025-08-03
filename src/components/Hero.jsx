import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-bg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-gray-900 mb-4 sm:mb-6 leading-tight">
            Authentic
            <span className="text-primary-600 block">Handloom Crafts</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
            Discover the timeless beauty of traditional handloom artistry. Each piece tells a story 
            of skilled craftsmanship passed down through generations.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <Link
              to="/products"
              className="btn-primary flex items-center space-x-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto justify-center"
            >
              <span>Shop Now</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary-600 font-medium text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 hover:border-primary-600 rounded-lg transition-colors w-full sm:w-auto text-center"
            >
              Learn Our Story
            </Link>
          </div>

          {/* Feature Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 px-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-sm sm:text-base text-gray-700">Handcrafted Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">100+</div>
              <div className="text-sm sm:text-base text-gray-700">Skilled Artisans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-sm sm:text-base text-gray-700">Years of Tradition</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;