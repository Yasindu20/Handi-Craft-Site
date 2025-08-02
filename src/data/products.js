export const products = [
  {
    id: 1,
    name: "Handwoven Silk Tapestry",
    description: "Exquisite silk tapestry featuring traditional patterns, handwoven by master artisans using centuries-old techniques.",
    price: 899.99,
    originalPrice: 1199.99,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&sat=20"
    ],
    category: "Textiles",
    artist: {
      id: 1,
      name: "Maria Rodriguez",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b619?w=100&h=100&fit=crop&crop=face"
    },
    tags: ["handwoven", "silk", "traditional", "wall-art"],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 23,
    materials: ["100% Silk", "Natural Dyes"],
    dimensions: "36\" x 24\"",
    weight: "2.5 lbs"
  },
  {
    id: 2,
    name: "Ceramic Pottery Set",
    description: "Beautiful handcrafted ceramic pottery set including bowls, plates, and mugs. Perfect for everyday use or special occasions.",
    price: 249.99,
    originalPrice: 299.99,
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68629?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68629?w=500&h=500&fit=crop&sat=20"
    ],
    category: "Ceramics",
    artist: {
      id: 2,
      name: "James Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    tags: ["ceramic", "handmade", "dinnerware", "artisan"],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 41,
    materials: ["High-fire Ceramic", "Food-safe Glaze"],
    dimensions: "Various sizes",
    weight: "8 lbs"
  },
  {
    id: 3,
    name: "Wooden Sculpture Art",
    description: "Intricate wooden sculpture carved from sustainable hardwood. A unique piece that brings natural beauty to any space.",
    price: 1299.99,
    images: [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop&contrast=20"
    ],
    category: "Sculptures",
    artist: {
      id: 3,
      name: "Sarah Thompson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    tags: ["wood", "sculpture", "handcarved", "sustainable"],
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: 15,
    materials: ["Reclaimed Oak", "Natural Finish"],
    dimensions: "18\" x 12\" x 8\"",
    weight: "12 lbs"
  },
  {
    id: 4,
    name: "Hand-painted Canvas Art",
    description: "Original acrylic painting on canvas featuring vibrant colors and abstract patterns. Each piece is unique and signed by the artist.",
    price: 599.99,
    images: [
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop&brightness=10"
    ],
    category: "Paintings",
    artist: {
      id: 4,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    tags: ["painting", "canvas", "original", "abstract"],
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 28,
    materials: ["Acrylic Paint", "Canvas", "Wooden Frame"],
    dimensions: "24\" x 18\"",
    weight: "3 lbs"
  },
  {
    id: 5,
    name: "Handmade Jewelry Collection",
    description: "Elegant jewelry collection featuring precious stones and metals. Each piece is carefully crafted with attention to detail.",
    price: 399.99,
    originalPrice: 499.99,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop&sat=30"
    ],
    category: "Jewelry",
    artist: {
      id: 5,
      name: "Elena Vasquez",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    },
    tags: ["jewelry", "handmade", "precious-stones", "elegant"],
    inStock: true,
    featured: false,
    rating: 4.9,
    reviews: 67,
    materials: ["Sterling Silver", "Semi-precious Stones"],
    dimensions: "Various",
    weight: "0.5 lbs"
  },
  {
    id: 6,
    name: "Traditional Basket Weaving",
    description: "Authentic woven baskets made using traditional techniques passed down through generations. Perfect for storage or decoration.",
    price: 189.99,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop&sepia=20"
    ],
    category: "Textiles",
    artist: {
      id: 6,
      name: "Robert Tall Bear",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
    },
    tags: ["basket", "traditional", "handwoven", "functional"],
    inStock: true,
    featured: false,
    rating: 4.8,
    reviews: 19,
    materials: ["Natural Reed", "Cotton Binding"],
    dimensions: "16\" x 12\" x 8\"",
    weight: "2 lbs"
  }
];

export const categories = [
  { id: 1, name: "Paintings", count: 45, image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop" },
  { id: 2, name: "Sculptures", count: 23, image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop" },
  { id: 3, name: "Ceramics", count: 67, image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68629?w=300&h=200&fit=crop" },
  { id: 4, name: "Textiles", count: 34, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop" },
  { id: 5, name: "Jewelry", count: 89, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop" },
  { id: 6, name: "Wood Work", count: 28, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop" }
];