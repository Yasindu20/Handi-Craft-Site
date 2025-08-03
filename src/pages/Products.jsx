import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/ui/Breadcrumb';
import { products, categories } from '../data/products';
import { Filter, Grid, List, ChevronLeft, ChevronRight, X } from 'lucide-react';

const PRODUCTS_PER_PAGE = 12;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: '',
    sortBy: 'name',
    inStock: false
  });

  useEffect(() => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        }
        return product.price >= min;
      });
    }

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));

    if (key === 'category') {
      if (value) {
        setSearchParams({ category: value });
      } else {
        setSearchParams({});
      }
    }
  };

  const clearFilters = () => {
    setFilters({ category: '', priceRange: '', sortBy: 'name', inStock: false });
    setSearchParams({});
  };

  // Enhanced pagination logic for mobile
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const activeFiltersCount = Object.values(filters).filter(value =>
    value && value !== 'name' && value !== false
  ).length;

  // Mobile-friendly pagination logic
  const generatePaginationItems = () => {
    const items = [];
    const isMobile = window.innerWidth < 640; // sm breakpoint
    const maxVisiblePages = isMobile ? 3 : 5;
    const sidePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - sidePages);
    let endPage = Math.min(totalPages, currentPage + sidePages);

    // Adjust if we're at the beginning or end
    if (currentPage <= sidePages) {
      endPage = Math.min(totalPages, maxVisiblePages);
    }
    if (currentPage > totalPages - sidePages) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    // Add first page if not included
    if (startPage > 1) {
      items.push(1);
      if (startPage > 2) {
        items.push('...');
      }
    }

    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }

    // Add last page if not included
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push('...');
      }
      items.push(totalPages);
    }

    return items;
  };

  const breadcrumbItems = [
    { label: 'Products', href: '/products' }
  ];

  if (filters.category) {
    const categoryName = categories.find(cat => cat.id === filters.category)?.name;
    if (categoryName) {
      breadcrumbItems.push({ label: categoryName });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-4 sm:pt-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Breadcrumb */}
        <div className="hidden sm:block">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-2 sm:mb-4">
            Our Products
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Discover our complete collection of handloom crafts
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Mobile Filter Overlay */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsFilterOpen(false)}></div>
              <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl z-50 overflow-y-auto">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Filter content - same as desktop but in mobile overlay */}
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary-600 hover:text-primary-700 transition-colors mb-4"
                    >
                      Clear All ({activeFiltersCount})
                    </button>
                  )}

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                    <div className="space-y-3">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value=""
                          checked={filters.category === ''}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">All Categories</span>
                      </label>
                      {categories.map((category) => (
                        <label key={category.id} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            value={category.id}
                            checked={filters.category === category.id}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="text-primary-600 focus:ring-primary-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">{category.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'All Prices', value: '' },
                        { label: 'Under $25', value: '0-25' },
                        { label: '$25 - $50', value: '25-50' },
                        { label: '$50 - $100', value: '50-100' },
                        { label: '$100 - $200', value: '100-200' },
                        { label: 'Over $200', value: '200' }
                      ].map((range) => (
                        <label key={range.value} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="priceRange"
                            value={range.value}
                            checked={filters.priceRange === range.value}
                            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                            className="text-primary-600 focus:ring-primary-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Availability Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Availability</h4>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.inStock}
                        onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                        className="text-primary-600 focus:ring-primary-500 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700">In Stock Only</span>
                    </label>
                  </div>

                  {/* Apply Filters Button for Mobile */}
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full btn-primary"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:w-64">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Desktop filter content - same structure as mobile but different layout */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={filters.category === ''}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">All Categories</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={filters.category === category.id}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {[
                    { label: 'All Prices', value: '' },
                    { label: 'Under $25', value: '0-25' },
                    { label: '$25 - $50', value: '25-50' },
                    { label: '$50 - $100', value: '50-100' },
                    { label: '$100 - $200', value: '100-200' },
                    { label: 'Over $200', value: '200' }
                  ].map((range) => (
                    <label key={range.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        value={range.value}
                        checked={filters.priceRange === range.value}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Availability</h4>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center space-x-2 w-full bg-white px-4 py-3 rounded-lg shadow-md border hover:shadow-lg transition-shadow"
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Sort and Results Count */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 mb-6 bg-white p-3 sm:p-4 rounded-lg shadow-md">
              <div>
                <p className="text-sm sm:text-base text-gray-600">
                  <span className="hidden sm:inline">Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of </span>
                  <span className="sm:hidden">{filteredProducts.length} </span>
                  <span className="hidden sm:inline">{filteredProducts.length} </span>
                  products
                </p>
              </div>

              <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                {/* View Mode Toggle - Hidden on mobile */}
                <div className="hidden md:flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-700 whitespace-nowrap">Sort by:</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-w-0 flex-1 sm:flex-none"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="rating">Customer Rating</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <>
                <div className={`grid gap-4 sm:gap-6 lg:gap-8 ${viewMode === 'grid'
                    ? 'grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
                    : 'grid-cols-1'
                  }`}>
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Enhanced Mobile-Friendly Pagination */}
                {totalPages > 1 && (
                  <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mt-12 sm:mt-16 mb-8 sm:mb-12">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                      {/* Page Info */}
                      <div className="text-sm text-gray-600">
                        <span className="hidden sm:inline">
                          Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                        </span>
                        <span className="sm:hidden">
                          Page {currentPage} of {totalPages}
                        </span>
                      </div>

                      {/* Pagination Controls */}
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
                          aria-label="Previous page"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span className="hidden sm:inline">Previous</span>
                        </button>

                        <div className="flex items-center space-x-1">
                          {generatePaginationItems().map((item, index) => {
                            if (item === '...') {
                              return (
                                <span key={`ellipsis-${index}`} className="px-2 py-2 text-gray-500 text-sm">
                                  ...
                                </span>
                              );
                            }

                            return (
                              <button
                                key={item}
                                onClick={() => setCurrentPage(item)}
                                className={`px-3 py-2 sm:px-4 sm:py-2 min-w-[40px] text-sm font-medium rounded-lg border transition-all duration-200 ${currentPage === item
                                    ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                                    : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                  }`}
                              >
                                {item}
                              </button>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
                          aria-label="Next page"
                        >
                          <span className="hidden sm:inline">Next</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8-4 4-4-4m-6 8-4 4-4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;