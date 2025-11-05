// Lumera Market - Static Site JavaScript
// All functionality in vanilla JavaScript

// ===================
// DATA
// ===================

const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299.99,
        originalPrice: 399.99,
        images: [
            "https://images.unsplash.com/photo-1713618651165-a3cf7f85506c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2MjI3NTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1080",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1080",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=1080"
        ],
        rating: 4.8,
        reviews: 342,
        category: "Technology & Devices",
        seller: "TechForge Lumera",
        sellerContact: "12683215960",
        description: "High-quality wireless headphones with noise cancellation, premium sound quality, and 30-hour battery life."
    },
    {
        id: 2,
        name: "Designer Luxury Watch",
        price: 549.00,
        originalPrice: 699.00,
        images: [
            "https://images.unsplash.com/photo-1751437730397-ef83024b5339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHdhdGNofGVufDF8fHx8MTc2MjI4NzEzNXww&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1080",
            "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1080"
        ],
        rating: 4.9,
        reviews: 128,
        category: "Handcrafted Goods",
        seller: "Artisan Timepieces",
        sellerContact: "12683215961",
        description: "Handcrafted luxury timepiece with Swiss movement and genuine leather strap."
    },
    {
        id: 3,
        name: "Professional Camera Equipment",
        price: 1249.99,
        images: [
            "https://images.unsplash.com/photo-1512025316832-8658f04f8a83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYyMjg0MDU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.unsplash.com/photo-1606988527806-2a0e0afa3d6b?w=1080",
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1080",
            "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1080"
        ],
        rating: 4.7,
        reviews: 89,
        category: "Technology & Devices",
        seller: "VisualArts Studio",
        sellerContact: "12683215962",
        description: "Professional-grade camera with 4K video, advanced autofocus, and weather-sealed body."
    },
    {
        id: 4,
        name: "Athletic Running Sneakers",
        price: 129.99,
        originalPrice: 179.99,
        images: [
            "https://images.unsplash.com/photo-1656944227480-98180d2a5155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHNob2VzfGVufDF8fHx8MTc2MjMwNDczNHww&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1080",
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1080"
        ],
        rating: 4.6,
        reviews: 456,
        category: "Handcrafted Goods",
        seller: "Stride Makers",
        sellerContact: "12683215963",
        description: "Lightweight running shoes with responsive cushioning and breathable mesh upper."
    },
    {
        id: 5,
        name: "Travel Backpack Pro",
        price: 89.99,
        images: [
            "https://images.unsplash.com/photo-1680039211156-66c721b87625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGJhZ3xlbnwxfHx8fDE3NjIyMjU0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1080",
            "https://images.unsplash.com/photo-1622260614927-9c57e632e4c3?w=1080"
        ],
        rating: 4.5,
        reviews: 234,
        category: "Handcrafted Goods",
        seller: "Nomad Leather Co.",
        sellerContact: "12683215964",
        description: "Durable travel backpack with laptop compartment, USB charging port, and water-resistant material."
    },
    {
        id: 6,
        name: "Polarized Designer Sunglasses",
        price: 159.99,
        originalPrice: 249.99,
        images: [
            "https://images.unsplash.com/photo-1663585703603-9be01a72a62a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjIyMjc5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1080",
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1080"
        ],
        rating: 4.4,
        reviews: 167,
        category: "Art & Design",
        seller: "Clear Vision Optics",
        sellerContact: "12683215965",
        description: "UV-protective polarized sunglasses with lightweight titanium frame and scratch-resistant lenses."
    },
    {
        id: 7,
        name: "Ultra-Slim Laptop",
        price: 999.99,
        images: [
            "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjIyNTE0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1080",
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1080",
            "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1080"
        ],
        rating: 4.9,
        reviews: 523,
        category: "Technology & Devices",
        seller: "TechForge Lumera",
        sellerContact: "12683215960",
        description: "Ultra-portable laptop with 12-hour battery life, SSD storage, and brilliant display."
    },
    {
        id: 8,
        name: "5G Smartphone Pro",
        price: 799.99,
        originalPrice: 899.99,
        images: [
            "https://images.unsplash.com/photo-1732998369893-af4c9a4695fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZGV2aWNlfGVufDF8fHx8MTc2MjI5ODIyNnww&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1080",
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1080"
        ],
        rating: 4.7,
        reviews: 678,
        category: "Technology & Devices",
        seller: "Mobile Innovations",
        sellerContact: "12683215966",
        description: "Latest 5G smartphone with advanced camera system, fast charging, and premium display."
    }
];

const sellers = {
    "TechForge Lumera": {
        name: "TechForge Lumera",
        description: "Leading technology provider in Lumera, specializing in cutting-edge electronics and gadgets. We bring the latest innovations to Lumeran citizens with exceptional service and warranty support.",
        contact: {
            whatsapp: "12683215960",
            phone: "+1 (268) 321-5960",
            email: "contact@techforge.lumera"
        },
        location: "Central District, Lumera",
        rating: 4.9,
        totalProducts: 2,
        joinedDate: "January 2024"
    },
    "Artisan Timepieces": {
        name: "Artisan Timepieces",
        description: "Handcrafted luxury watches made by master Lumeran artisans. Each timepiece is a unique blend of traditional craftsmanship and modern design.",
        contact: {
            whatsapp: "12683215961",
            phone: "+1 (268) 321-5961",
            email: "info@artisantimepieces.lumera"
        },
        location: "Heritage Quarter, Lumera",
        rating: 4.9,
        totalProducts: 1,
        joinedDate: "March 2024"
    },
    "VisualArts Studio": {
        name: "VisualArts Studio",
        description: "Professional photography and videography equipment supplier. Serving Lumera's creative community with top-tier gear and expert advice.",
        contact: {
            whatsapp: "12683215962",
            phone: "+1 (268) 321-5962",
            email: "hello@visualarts.lumera"
        },
        location: "Arts District, Lumera",
        rating: 4.7,
        totalProducts: 1,
        joinedDate: "February 2024"
    },
    "Stride Makers": {
        name: "Stride Makers",
        description: "Premium athletic footwear designed for performance and style. Trusted by Lumeran athletes and fitness enthusiasts.",
        contact: {
            whatsapp: "12683215963",
            phone: "+1 (268) 321-5963",
            email: "support@stridemakers.lumera"
        },
        location: "Sports Complex, Lumera",
        rating: 4.6,
        totalProducts: 1,
        joinedDate: "April 2024"
    },
    "Nomad Leather Co.": {
        name: "Nomad Leather Co.",
        description: "Quality leather goods and travel accessories handcrafted in Lumera. Combining durability with timeless design.",
        contact: {
            whatsapp: "12683215964",
            phone: "+1 (268) 321-5964",
            email: "contact@nomadleather.lumera"
        },
        location: "Market Street, Lumera",
        rating: 4.5,
        totalProducts: 1,
        joinedDate: "May 2024"
    },
    "Clear Vision Optics": {
        name: "Clear Vision Optics",
        description: "Designer eyewear and sunglasses with UV protection. Protecting Lumeran eyes with style and quality.",
        contact: {
            whatsapp: "12683215965",
            phone: "+1 (268) 321-5965",
            email: "info@clearvision.lumera"
        },
        location: "Fashion Avenue, Lumera",
        rating: 4.4,
        totalProducts: 1,
        joinedDate: "June 2024"
    },
    "Mobile Innovations": {
        name: "Mobile Innovations",
        description: "Latest smartphones and mobile accessories. Keeping Lumera connected with cutting-edge mobile technology.",
        contact: {
            whatsapp: "12683215966",
            phone: "+1 (268) 321-5966",
            email: "sales@mobileinnovations.lumera"
        },
        location: "Tech Plaza, Lumera",
        rating: 4.7,
        totalProducts: 1,
        joinedDate: "March 2024"
    }
};

// ===================
// STATE MANAGEMENT
// ===================

let state = {
    currentPage: 'home',
    selectedProduct: null,
    selectedSeller: null,
    favorites: JSON.parse(localStorage.getItem('lumeraFavorites') || '[]'),
    filters: {
        search: '',
        category: 'all',
        maxPrice: 1500
    }
};

// ===================
// UTILITY FUNCTIONS
// ===================

function saveFavorites() {
    localStorage.setItem('lumeraFavorites', JSON.stringify(state.favorites));
    updateFavoritesCount();
}

function updateFavoritesCount() {
    const count = state.favorites.length;
    const desktopCount = document.getElementById('favoritesCount');
    const mobileCount = document.getElementById('favoritesCountMobile');
    
    if (desktopCount) desktopCount.textContent = count;
    if (mobileCount) mobileCount.textContent = count;
}

function isFavorite(productId) {
    return state.favorites.includes(productId);
}

function toggleFavorite(productId) {
    if (isFavorite(productId)) {
        state.favorites = state.favorites.filter(id => id !== productId);
        showToast('Removed from favorites', 'info');
    } else {
        state.favorites.push(productId);
        showToast('Added to favorites', 'success');
    }
    saveFavorites();
    renderCurrentPage();
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="flex items-center gap-2">
            <i data-lucide="${type === 'success' ? 'check-circle' : 'info'}" class="w-5 h-5 ${type === 'success' ? 'text-green-500' : 'text-blue-500'}"></i>
            <span>${message}</span>
        </div>
    `;
    container.appendChild(toast);
    lucide.createIcons();
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function createStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
            stars += '<i data-lucide="star" class="star w-4 h-4 fill-current inline"></i>';
        } else if (i < rating) {
            stars += '<i data-lucide="star-half" class="star w-4 h-4 fill-current inline"></i>';
        } else {
            stars += '<i data-lucide="star" class="w-4 h-4 text-gray-300 inline"></i>';
        }
    }
    return stars;
}

// ===================
// NAVIGATION
// ===================

function navigateTo(page, data = null) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Update state
    state.currentPage = page;
    
    if (page === 'home') {
        document.getElementById('homePage').classList.add('active');
        document.getElementById('searchInput').value = state.filters.search;
    } else if (page === 'product') {
        state.selectedProduct = data;
        document.getElementById('productDetailPage').classList.add('active');
        renderProductDetail();
    } else if (page === 'favorites') {
        document.getElementById('favoritesPage').classList.add('active');
        renderFavorites();
    } else if (page === 'seller') {
        state.selectedSeller = data;
        document.getElementById('sellerProfilePage').classList.add('active');
        renderSellerProfile();
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// ===================
// FILTERING
// ===================

function getFilteredProducts() {
    return products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
                             product.description.toLowerCase().includes(state.filters.search.toLowerCase()) ||
                             product.seller.toLowerCase().includes(state.filters.search.toLowerCase());
        const matchesCategory = state.filters.category === 'all' || product.category === state.filters.category;
        const matchesPrice = product.price <= state.filters.maxPrice;
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
}

function handleSearch(value) {
    state.filters.search = value;
    
    // Sync both search inputs
    const desktopSearch = document.getElementById('searchInput');
    const mobileSearch = document.getElementById('searchInputMobile');
    if (desktopSearch && desktopSearch.value !== value) desktopSearch.value = value;
    if (mobileSearch && mobileSearch.value !== value) mobileSearch.value = value;
    
    renderProducts();
}

function handleCategoryChange(category) {
    state.filters.category = category;
    
    // Sync desktop and mobile filters
    renderCategoryFilters();
    updateActiveFiltersCount();
    renderProducts();
}

function handlePriceChange(value) {
    state.filters.maxPrice = parseInt(value);
    
    // Sync both price displays and sliders
    const priceText = value >= 1500 ? '$1500+' : formatPrice(parseInt(value));
    const desktopValue = document.getElementById('priceValue');
    const mobileValue = document.getElementById('priceValueMobile');
    const desktopRange = document.getElementById('priceRange');
    const mobileRange = document.getElementById('priceRangeMobile');
    
    if (desktopValue) desktopValue.textContent = priceText;
    if (mobileValue) mobileValue.textContent = priceText;
    if (desktopRange) desktopRange.value = value;
    if (mobileRange) mobileRange.value = value;
    
    updateActiveFiltersCount();
    renderProducts();
}

function resetFilters() {
    state.filters = {
        search: '',
        category: 'all',
        maxPrice: 1500
    };
    
    // Reset desktop inputs
    const desktopSearch = document.getElementById('searchInput');
    const desktopPrice = document.getElementById('priceRange');
    const desktopPriceValue = document.getElementById('priceValue');
    
    if (desktopSearch) desktopSearch.value = '';
    if (desktopPrice) desktopPrice.value = 1500;
    if (desktopPriceValue) desktopPriceValue.textContent = '$1500+';
    
    // Reset mobile inputs
    const mobileSearch = document.getElementById('searchInputMobile');
    const mobilePrice = document.getElementById('priceRangeMobile');
    const mobilePriceValue = document.getElementById('priceValueMobile');
    
    if (mobileSearch) mobileSearch.value = '';
    if (mobilePrice) mobilePrice.value = 1500;
    if (mobilePriceValue) mobilePriceValue.textContent = '$1500+';
    
    // Reset category filters (both desktop and mobile)
    document.querySelectorAll('input[name="category"], input[name="categoryMobile"]').forEach(input => {
        input.checked = input.value === 'all';
    });
    
    updateActiveFiltersCount();
    renderProducts();
}

// ===================
// RENDERING FUNCTIONS
// ===================

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    const filteredProducts = getFilteredProducts();
    
    if (filteredProducts.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
        lucide.createIcons();
        return;
    }
    
    noResults.classList.add('hidden');
    grid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    lucide.createIcons();
}

function createProductCard(product) {
    const isFav = isFavorite(product.id);
    const mainImage = product.images ? product.images[0] : product.image;
    return `
        <div class="product-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
            <div class="relative" onclick="navigateTo('product', ${product.id})">
                <img src="${mainImage}" alt="${product.name}" class="w-full h-48 object-cover">
                ${product.originalPrice ? `
                    <div class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                        Sale
                    </div>
                ` : ''}
            </div>
            
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg" onclick="navigateTo('product', ${product.id})">${product.name}</h3>
                    <button 
                        onclick="event.stopPropagation(); toggleFavorite(${product.id})" 
                        class="heart-btn ${isFav ? 'active' : ''}"
                    >
                        <i data-lucide="heart" class="w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}"></i>
                    </button>
                </div>
                
                <div class="flex items-center gap-2 mb-2">
                    <div class="flex">${createStars(product.rating)}</div>
                    <span class="text-sm text-gray-600">(${product.reviews})</span>
                </div>
                
                <p class="text-sm text-gray-600 mb-2">${product.category}</p>
                
                <div class="flex items-center justify-between mt-4">
                    <div>
                        <span class="text-2xl" style="color: var(--gold);">${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `
                            <span class="text-sm text-gray-400 line-through ml-2">${formatPrice(product.originalPrice)}</span>
                        ` : ''}
                    </div>
                </div>
                
                <p class="text-sm text-gray-500 mt-2">
                    by <span class="cursor-pointer hover:underline" style="color: var(--gold);" onclick="navigateTo('seller', '${product.seller}')">${product.seller}</span>
                </p>
            </div>
        </div>
    `;
}

function renderProductDetail() {
    const product = products.find(p => p.id === state.selectedProduct);
    if (!product) return;
    
    const isFav = isFavorite(product.id);
    const container = document.getElementById('productDetail');
    const images = product.images || [product.image];
    
    container.innerHTML = `
        <button onclick="navigateTo('home')" class="flex items-center gap-2 mb-4 md:mb-6 text-gray-600 hover:text-gray-900">
            <i data-lucide="arrow-left" class="w-5 h-5"></i>
            <span class="text-sm md:text-base">Back to Products</span>
        </button>
        
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-4 md:p-8">
                <!-- Image Gallery -->
                <div>
                    <!-- Main Image -->
                    <div class="relative rounded-lg overflow-hidden mb-3 md:mb-4">
                        <img 
                            id="mainProductImage" 
                            src="${images[0]}" 
                            alt="${product.name}" 
                            class="w-full h-64 md:h-96 object-cover"
                        >
                        ${images.length > 1 ? `
                            <!-- Navigation Arrows -->
                            <button 
                                onclick="changeProductImage(-1)" 
                                class="gallery-arrow absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-3 md:p-2 shadow-lg touch-manipulation"
                                style="transition: all 0.2s;"
                            >
                                <i data-lucide="chevron-left" class="w-5 h-5 md:w-6 md:h-6" style="color: var(--navy-dark);"></i>
                            </button>
                            <button 
                                onclick="changeProductImage(1)" 
                                class="gallery-arrow absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-3 md:p-2 shadow-lg touch-manipulation"
                                style="transition: all 0.2s;"
                            >
                                <i data-lucide="chevron-right" class="w-5 h-5 md:w-6 md:h-6" style="color: var(--navy-dark);"></i>
                            </button>
                            
                            <!-- Image Counter -->
                            <div class="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                                <span id="currentImageIndex">1</span> / ${images.length}
                            </div>
                        ` : ''}
                    </div>
                    
                    ${images.length > 1 ? `
                        <!-- Thumbnail Gallery -->
                        <div class="grid grid-cols-4 gap-1.5 md:gap-2" id="thumbnailGallery">
                            ${images.map((img, index) => `
                                <div 
                                    class="cursor-pointer rounded-lg overflow-hidden border-2 ${index === 0 ? 'border-opacity-100' : 'border-opacity-0'} touch-manipulation" 
                                    style="border-color: var(--gold);"
                                    onclick="selectProductImage(${index})"
                                    data-thumbnail-index="${index}"
                                >
                                    <img src="${img}" alt="${product.name} ${index + 1}" class="w-full h-16 md:h-20 object-cover hover:opacity-75">
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <!-- Details -->
                <div>
                    <div class="flex justify-between items-start mb-3 md:mb-4">
                        <div class="flex-1 pr-2">
                            <h1 class="text-xl md:text-2xl lg:text-3xl mb-2" style="color: var(--navy-dark);">${product.name}</h1>
                            <div class="flex items-center gap-2 mb-2">
                                <div class="flex">${createStars(product.rating)}</div>
                                <span class="text-sm md:text-base text-gray-600">${product.rating} (${product.reviews})</span>
                            </div>
                        </div>
                        <button onclick="toggleFavorite(${product.id})" class="heart-btn flex-shrink-0 p-2 touch-manipulation">
                            <i data-lucide="heart" class="w-6 h-6 md:w-7 md:h-7 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}"></i>
                        </button>
                    </div>
                    
                    <div class="mb-4 md:mb-6">
                        <span class="text-2xl md:text-3xl lg:text-4xl" style="color: var(--gold);">${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `
                            <span class="text-base md:text-xl text-gray-400 line-through ml-2 md:ml-3">${formatPrice(product.originalPrice)}</span>
                            <div class="inline-block ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs md:text-sm">
                                Save ${Math.round((1 - product.price / product.originalPrice) * 100)}%
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="mb-4 md:mb-6">
                        <span class="inline-block px-3 py-1 rounded-full text-xs md:text-sm" style="background-color: rgba(201, 169, 97, 0.1); color: var(--gold);">
                            ${product.category}
                        </span>
                    </div>
                    
                    <div class="mb-4 md:mb-6">
                        <h3 class="text-base md:text-lg mb-2" style="color: var(--navy-dark);">Description</h3>
                        <p class="text-sm md:text-base text-gray-600 leading-relaxed">${product.description}</p>
                    </div>
                    
                    <div class="mb-4 md:mb-6 p-3 md:p-4 rounded-lg" style="background-color: var(--cream);">
                        <h4 class="text-sm md:text-base mb-2" style="color: var(--navy-dark);">Sold by</h4>
                        <p class="text-sm md:text-base cursor-pointer hover:underline touch-manipulation" style="color: var(--gold);" onclick="navigateTo('seller', '${product.seller}')">
                            ${product.seller}
                        </p>
                    </div>
                    
                    <div class="space-y-2 md:space-y-3">
                        <h4 class="text-base md:text-lg mb-3" style="color: var(--navy-dark);">Contact Seller</h4>
                        
                        <a 
                            href="https://wa.me/${product.sellerContact}?text=Hi! I'm interested in ${encodeURIComponent(product.name)}" 
                            target="_blank"
                            class="flex items-center justify-center gap-2 w-full py-3 md:py-3 px-4 rounded-lg text-white text-sm md:text-base touch-manipulation"
                            style="background-color: #25D366; min-height: 48px;"
                        >
                            <i data-lucide="message-circle" class="w-5 h-5"></i>
                            <span>Contact via WhatsApp</span>
                        </a>
                        
                        <a 
                            href="tel:${sellers[product.seller].contact.phone}"
                            class="flex items-center justify-center gap-2 w-full py-3 md:py-3 px-4 rounded-lg border text-sm md:text-base touch-manipulation"
                            style="border-color: var(--gold); color: var(--navy-dark); min-height: 48px;"
                        >
                            <i data-lucide="phone" class="w-5 h-5"></i>
                            <span class="hidden sm:inline">Call ${sellers[product.seller].contact.phone}</span>
                            <span class="sm:hidden">Call</span>
                        </a>
                        
                        <a 
                            href="mailto:${sellers[product.seller].contact.email}?subject=Inquiry about ${encodeURIComponent(product.name)}"
                            class="flex items-center justify-center gap-2 w-full py-3 md:py-3 px-4 rounded-lg border text-sm md:text-base touch-manipulation"
                            style="border-color: var(--gold); color: var(--navy-dark); min-height: 48px;"
                        >
                            <i data-lucide="mail" class="w-5 h-5"></i>
                            <span>Email</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    lucide.createIcons();
    
    // Initialize gallery state
    if (!window.currentProductImageIndex) {
        window.currentProductImageIndex = 0;
    } else {
        window.currentProductImageIndex = 0; // Reset to first image
    }
}

// Image Gallery Functions
function changeProductImage(direction) {
    const product = products.find(p => p.id === state.selectedProduct);
    if (!product) return;
    
    const images = product.images || [product.image];
    window.currentProductImageIndex = (window.currentProductImageIndex + direction + images.length) % images.length;
    
    updateGalleryDisplay(images);
}

function selectProductImage(index) {
    const product = products.find(p => p.id === state.selectedProduct);
    if (!product) return;
    
    const images = product.images || [product.image];
    window.currentProductImageIndex = index;
    
    updateGalleryDisplay(images);
}

function updateGalleryDisplay(images) {
    // Update main image
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        mainImage.src = images[window.currentProductImageIndex];
    }
    
    // Update counter
    const counter = document.getElementById('currentImageIndex');
    if (counter) {
        counter.textContent = window.currentProductImageIndex + 1;
    }
    
    // Update thumbnail borders
    const thumbnails = document.querySelectorAll('[data-thumbnail-index]');
    thumbnails.forEach((thumb, index) => {
        if (index === window.currentProductImageIndex) {
            thumb.style.borderColor = 'var(--gold)';
            thumb.style.borderOpacity = '1';
            thumb.classList.add('border-opacity-100');
            thumb.classList.remove('border-opacity-0');
        } else {
            thumb.classList.add('border-opacity-0');
            thumb.classList.remove('border-opacity-100');
        }
    });
}

function renderFavorites() {
    const grid = document.getElementById('favoritesGrid');
    const noFavorites = document.getElementById('noFavorites');
    const favoriteProducts = products.filter(p => isFavorite(p.id));
    
    if (favoriteProducts.length === 0) {
        grid.innerHTML = '';
        noFavorites.classList.remove('hidden');
        lucide.createIcons();
        return;
    }
    
    noFavorites.classList.add('hidden');
    grid.innerHTML = favoriteProducts.map(product => createProductCard(product)).join('');
    lucide.createIcons();
}

function renderSellerProfile() {
    const seller = sellers[state.selectedSeller];
    if (!seller) return;
    
    const sellerProducts = products.filter(p => p.seller === seller.name);
    const container = document.getElementById('sellerProfile');
    
    container.innerHTML = `
        <button onclick="navigateTo('home')" class="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900">
            <i data-lucide="arrow-left" class="w-5 h-5"></i>
            <span>Back to Products</span>
        </button>
        
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div class="flex items-start justify-between mb-6">
                <div>
                    <h1 class="mb-2" style="color: var(--navy-dark);">${seller.name}</h1>
                    <div class="flex items-center gap-2 mb-2">
                        <div class="flex">${createStars(seller.rating)}</div>
                        <span class="text-gray-600">${seller.rating}</span>
                    </div>
                    <p class="text-gray-600 mb-4">${seller.description}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="p-4 rounded-lg" style="background-color: var(--cream);">
                    <i data-lucide="map-pin" class="w-5 h-5 mb-2" style="color: var(--gold);"></i>
                    <p class="text-sm text-gray-600">Location</p>
                    <p style="color: var(--navy-dark);">${seller.location}</p>
                </div>
                <div class="p-4 rounded-lg" style="background-color: var(--cream);">
                    <i data-lucide="package" class="w-5 h-5 mb-2" style="color: var(--gold);"></i>
                    <p class="text-sm text-gray-600">Products</p>
                    <p style="color: var(--navy-dark);">${seller.totalProducts} items</p>
                </div>
                <div class="p-4 rounded-lg" style="background-color: var(--cream);">
                    <i data-lucide="calendar" class="w-5 h-5 mb-2" style="color: var(--gold);"></i>
                    <p class="text-sm text-gray-600">Member Since</p>
                    <p style="color: var(--navy-dark);">${seller.joinedDate}</p>
                </div>
            </div>
            
            <div class="space-y-3">
                <h3 class="mb-3" style="color: var(--navy-dark);">Contact Information</h3>
                
                <a 
                    href="https://wa.me/${seller.contact.whatsapp}" 
                    target="_blank"
                    class="flex items-center gap-2 py-3 px-4 rounded-lg text-white"
                    style="background-color: #25D366;"
                >
                    <i data-lucide="message-circle" class="w-5 h-5"></i>
                    <span>WhatsApp: ${seller.contact.phone}</span>
                </a>
                
                <a 
                    href="tel:${seller.contact.phone}"
                    class="flex items-center gap-2 py-3 px-4 rounded-lg border"
                    style="border-color: var(--gold); color: var(--navy-dark);"
                >
                    <i data-lucide="phone" class="w-5 h-5"></i>
                    <span>${seller.contact.phone}</span>
                </a>
                
                <a 
                    href="mailto:${seller.contact.email}"
                    class="flex items-center gap-2 py-3 px-4 rounded-lg border"
                    style="border-color: var(--gold); color: var(--navy-dark);"
                >
                    <i data-lucide="mail" class="w-5 h-5"></i>
                    <span>${seller.contact.email}</span>
                </a>
            </div>
        </div>
        
        <div>
            <h2 class="mb-6" style="color: var(--navy-dark);">Products by ${seller.name}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                ${sellerProducts.map(product => createProductCard(product)).join('')}
            </div>
        </div>
    `;
    
    lucide.createIcons();
}

function renderCategoryFilters() {
    const categories = ['all', ...new Set(products.map(p => p.category))];
    const container = document.getElementById('categoryFilters');
    const containerMobile = document.getElementById('categoryFiltersMobile');
    
    const html = categories.map(category => `
        <label class="flex items-center gap-2 cursor-pointer">
            <input 
                type="radio" 
                name="category" 
                value="${category}"
                ${state.filters.category === category ? 'checked' : ''}
                onchange="handleCategoryChange('${category}')"
                class="w-4 h-4"
                style="accent-color: var(--gold);"
            >
            <span class="text-sm">${category === 'all' ? 'All Categories' : category}</span>
        </label>
    `).join('');
    
    // Render for both desktop and mobile
    if (container) container.innerHTML = html;
    if (containerMobile) {
        containerMobile.innerHTML = categories.map(category => `
            <label class="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50">
                <input 
                    type="radio" 
                    name="categoryMobile" 
                    value="${category}"
                    ${state.filters.category === category ? 'checked' : ''}
                    onchange="handleCategoryChange('${category}')"
                    class="w-5 h-5"
                    style="accent-color: var(--gold);"
                >
                <span>${category === 'all' ? 'All Categories' : category}</span>
            </label>
        `).join('');
    }
}

function renderCurrentPage() {
    if (state.currentPage === 'home') {
        renderProducts();
    } else if (state.currentPage === 'product') {
        renderProductDetail();
    } else if (state.currentPage === 'favorites') {
        renderFavorites();
    } else if (state.currentPage === 'seller') {
        renderSellerProfile();
    }
}

// ===================
// MOBILE FUNCTIONS
// ===================

function toggleMobileFilters() {
    const drawer = document.getElementById('mobileFilters');
    const overlay = document.getElementById('mobileOverlay');
    const body = document.body;
    
    if (drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        overlay.classList.remove('show');
        body.classList.remove('menu-open');
    } else {
        drawer.classList.add('open');
        overlay.classList.add('show');
        body.classList.add('menu-open');
    }
}

function updateActiveFiltersCount() {
    const count = (state.filters.category !== 'all' ? 1 : 0) + 
                  (state.filters.maxPrice < 1500 ? 1 : 0);
    
    const badge = document.getElementById('activeFiltersCount');
    if (badge) {
        if (count > 0) {
            badge.textContent = count;
            badge.classList.remove('hidden');
            badge.classList.add('flex');
        } else {
            badge.classList.add('hidden');
            badge.classList.remove('flex');
        }
    }
}

// ===================
// INITIALIZATION
// ===================

function init() {
    updateFavoritesCount();
    renderCategoryFilters();
    renderProducts();
    updateActiveFiltersCount();
    
    // Add keyboard navigation for image gallery
    document.addEventListener('keydown', (e) => {
        // Only on product detail page with multiple images
        if (state.currentPage === 'product') {
            const product = products.find(p => p.id === state.selectedProduct);
            if (product && product.images && product.images.length > 1) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    changeProductImage(-1);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    changeProductImage(1);
                }
            }
        }
        
        // Close mobile filters with Escape key
        if (e.key === 'Escape') {
            const drawer = document.getElementById('mobileFilters');
            if (drawer && drawer.classList.contains('open')) {
                toggleMobileFilters();
            }
        }
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', init);
