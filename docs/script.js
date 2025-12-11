// Product Data
const featuredProducts = [
    {
        id: 1,
        name: 'Commando Tactical Camo Shirt',
        category: 'Shirt',
        price: 1499,
        image: 'https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?auto=format&fit=crop&q=80&w=600&h=800',
        badge: 'Bestseller'
    },
    {
        id: 2,
        name: 'Olive Drab Field Jacket',
        category: 'Jacket',
        price: 2999,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600&h=800',
        badge: 'New Arrival'
    },
    {
        id: 3,
        name: 'Desert Storm Cargo Pants',
        category: 'Accessory',
        price: 1899,
        image: 'https://images.unsplash.com/photo-1517838277536-f5f9939d1543?auto=format&fit=crop&q=80&w=600&h=800'
    },
    {
        id: 4,
        name: 'Regiment Polo - Navy Blue',
        category: 'T-Shirt',
        price: 999,
        image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=600&h=800',
        badge: 'Trending'
    },
    {
        id: 5,
        name: 'Urban Tactical Hoodie',
        category: 'Jacket',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600&h=800'
    },
    {
        id: 6,
        name: 'Paratrooper Boots',
        category: 'Accessory',
        price: 3499,
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600&h=800',
        badge: 'Limited'
    },
    {
        id: 7,
        name: 'Siachen Winter Parka',
        category: 'Jacket',
        price: 4999,
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce6671b3?auto=format&fit=crop&q=80&w=600&h=800'
    },
    {
        id: 8,
        name: 'Infantry Rucksack',
        category: 'Accessory',
        price: 2199,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600&h=800'
    }
];

// Application State
let activeCategory = 'home';
let cartCount = 0;
let notificationTimeout = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    updateActiveCategory('home');
    renderProducts();
    updateCartBadge();
});

// Navigation Handler
function handleNavigate(category) {
    activeCategory = category;
    updateActiveCategory(category);
    updateVisibility(category);
    renderProducts();
    
    // Smooth scroll to products if navigating to a specific category
    if (category !== 'home') {
        const element = document.getElementById('collections');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Close mobile menu
    closeMobileMenu();
}

// Update active category styling
function updateActiveCategory(category) {
    // Update desktop nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-category') === category) {
            link.classList.add('text-saffron');
            link.classList.remove('hover:text-saffron');
        } else {
            link.classList.remove('text-saffron');
            link.classList.add('hover:text-saffron');
        }
    });
    
    // Update mobile nav links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        if (link.getAttribute('data-category') === category) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update visibility of sections based on category
function updateVisibility(category) {
    const heroSection = document.getElementById('hero-section');
    const featuresSection = document.getElementById('features-section');
    const categoriesSection = document.getElementById('categories-section');
    const viewAllContainer = document.getElementById('view-all-container');
    const sectionSubtitle = document.getElementById('section-subtitle');
    const sectionTitle = document.getElementById('section-title');
    const collectionsSection = document.getElementById('collections');
    
    if (category === 'home') {
        heroSection.style.display = 'flex';
        featuresSection.style.display = 'block';
        categoriesSection.style.display = 'block';
        viewAllContainer.style.display = 'block';
        sectionSubtitle.textContent = 'New Drops';
        collectionsSection.classList.remove('py-8', 'pt-12');
        collectionsSection.classList.add('py-16');
    } else {
        heroSection.style.display = 'none';
        featuresSection.style.display = 'none';
        categoriesSection.style.display = 'none';
        viewAllContainer.style.display = 'none';
        sectionSubtitle.textContent = 'Catalog';
        collectionsSection.classList.remove('py-16');
        collectionsSection.classList.add('py-8', 'pt-12');
    }
    
    // Update section title
    switch(category) {
        case 'men':
            sectionTitle.textContent = "Men's Apparel";
            break;
        case 'women':
            sectionTitle.textContent = "Women's Collection";
            break;
        case 'gear':
            sectionTitle.textContent = "Tactical Gear";
            break;
        default:
            sectionTitle.textContent = "Best Selling Gear";
    }
}

// Filter products based on active category
function getDisplayedProducts() {
    if (activeCategory === 'home' || activeCategory === 'collections') {
        return featuredProducts;
    }
    
    if (activeCategory === 'men') {
        return featuredProducts.filter(p => ['Shirt', 'T-Shirt', 'Jacket'].includes(p.category));
    }
    
    if (activeCategory === 'women') {
        return featuredProducts.filter(p => ['Jacket', 'T-Shirt'].includes(p.category));
    }
    
    if (activeCategory === 'gear') {
        return featuredProducts.filter(p => p.category === 'Accessory');
    }
    
    return featuredProducts;
}

// Render products
function renderProducts() {
    const productsContainer = document.getElementById('products-container');
    const displayedProducts = getDisplayedProducts();
    
    if (displayedProducts.length === 0) {
        productsContainer.innerHTML = `
            <div class="text-center py-20 col-span-full">
                <p class="text-xl text-gray-500">No products found in this category.</p>
                <button onclick="handleNavigate('home')" class="mt-4 text-saffron font-bold uppercase underline bg-transparent border-none cursor-pointer">
                    Go back home
                </button>
            </div>
        `;
        return;
    }
    
    productsContainer.innerHTML = displayedProducts.map(product => `
        <div class="product-card group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
            <!-- Image Container -->
            <div class="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image w-full h-full object-cover"
                />
                
                <!-- Badge -->
                ${product.badge ? `
                    <div class="absolute top-4 left-4 bg-army-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm shadow-sm">
                        ${product.badge}
                    </div>
                ` : ''}

                <!-- Quick Actions overlay -->
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button 
                        onclick="handleAddToCart(${product.id})"
                        class="quick-action-btn p-3 bg-white rounded-full text-army-900 hover:bg-saffron hover:text-white transition-colors shadow-lg cursor-pointer"
                        title="Add to Cart"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                    </button>
                    <button 
                        onclick="handleToggleWishlist(${product.id})"
                        class="quick-action-btn p-3 bg-white rounded-full text-army-900 hover:bg-red-500 hover:text-white transition-colors shadow-lg cursor-pointer"
                        title="Add to Wishlist"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Content -->
            <div class="p-4 flex flex-col flex-grow">
                <p class="text-xs text-saffron font-bold uppercase tracking-wide mb-1">${product.category}</p>
                <h3 class="font-display font-medium text-lg text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-army-600 transition-colors">
                    ${product.name}
                </h3>
                <div class="mt-auto flex items-center justify-between">
                    <span class="font-bold text-xl text-gray-900">₹${product.price.toLocaleString('en-IN')}</span>
                    <div class="flex gap-1">
                        ${[1,2,3,4,5].map(() => `
                            <div class="w-1.5 h-1.5 rounded-full bg-army-200 group-hover:bg-saffron transition-colors delay-75"></div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- Mobile only add to cart button -->
            <button 
                onclick="handleAddToCart(${product.id})"
                class="w-full md:hidden py-3 bg-army-900 text-white font-bold uppercase text-xs tracking-wider hover:bg-saffron transition-colors"
            >
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Add to Cart Handler
function handleAddToCart(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
        cartCount++;
        updateCartBadge();
        showNotification(`Added ${product.name} to Cart`);
    }
}

// Toggle Wishlist Handler
function handleToggleWishlist(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
        showNotification(`Added ${product.name} to Wishlist`, 'info');
    }
}

// Update Cart Badge
function updateCartBadge() {
    const cartBadge = document.getElementById('cart-count');
    if (cartCount > 0) {
        cartBadge.textContent = cartCount;
        cartBadge.classList.remove('hidden');
    } else {
        cartBadge.classList.add('hidden');
    }
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    notificationMessage.textContent = message;
    notification.classList.remove('hidden');
    
    // Clear existing timeout
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }
    
    // Hide notification after 3 seconds
    notificationTimeout = setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Subscribe Handler
function handleSubscribe() {
    const emailInput = document.getElementById('newsletter-email');
    const email = emailInput.value.trim();
    
    if (email) {
        showNotification("Subscribed successfully!", "success");
        emailInput.value = '';
    } else {
        showNotification("Please enter a valid email address", "info");
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        closeMobileMenu();
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
}

