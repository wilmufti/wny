        // Product data
        const products = [
            { id: 1, name: 'Minyakita', price: 36000, category: 'Minyak', image: './images/minyak.png' },
            { id: 2, name: 'Beras', price: 15000, category: 'Beras', image: '/api/placeholder/80/80' },
            { id: 3, name: 'Gas LPG 3kg', price: 20000, category: 'Gas', image: '/api/placeholder/80/80', 
              description: 'Gas LPG 3 kg adalah bahan bakar memasak bersubsidi yang ringan, praktis, hemat, dan mudah digunakan untuk kebutuhan rumah tangga sehari-hari.' },
            { id: 4, name: 'Indomie', price: 3500, category: 'Mie', image: '/api/placeholder/80/80' },
            { id: 5, name: 'Mie Sedaap', price: 3000, category: 'Mie', image: '/api/placeholder/80/80' },
            { id: 6, name: 'Supermie', price: 3000, category: 'Mie', image: '/api/placeholder/80/80' },
            { id: 7, name: 'Pop Mie', price: 6000, category: 'Mie', image: '/api/placeholder/80/80' },
            { id: 8, name: 'Sunlight', price: 5000, category: 'Sabun', image: '/api/placeholder/80/80' }
        ];

        // Cart data
        let cart = [
            { id: 1, name: 'Minyakita', price: 36000, quantity: 2, image: '/api/placeholder/80/80' },
            { id: 2, name: 'Beras', price: 15000, quantity: 1, image: '/api/placeholder/80/80' }
        ];

        // Current product being viewed
        let currentProduct = null;

        // Function to navigate between pages
        function navigateTo(page) {
            document.querySelectorAll('.page').forEach(p => {
                p.classList.remove('active');
            });
            
            document.getElementById(page + '-page').classList.add('active');
            
            // Update navigation bar
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Highlight current nav item
            if (page === 'menu' || page === 'search' || page === 'cart') {
                document.querySelectorAll('.nav-item').forEach(item => {
                    if (item.textContent.toLowerCase().includes(page)) {
                        item.classList.add('active');
                    }
                });
            }
            
            // Load products on menu page
            if (page === 'menu') {
                loadProducts();
            }
        }

        // Function to load products
        function loadProducts(category = 'all') {
            const productGrid = document.getElementById('product-grid');
            productGrid.innerHTML = '';
            
            const filteredProducts = category === 'all' 
                ? products 
                : products.filter(product => product.category === category);
            
            filteredProducts.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product-card';
                productElement.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">Rp${product.price.toLocaleString()}</div>
                    <button class="add-button" onclick="viewProduct(${product.id})">+</button>
                `;
                productGrid.appendChild(productElement);
            });
        }

        // Function to view product details
        function viewProduct(productId) {
            currentProduct = products.find(p => p.id === productId);
            
            if (currentProduct) {
                document.getElementById('product-detail-name').textContent = currentProduct.name;
                document.getElementById('product-detail-price').textContent = `Rp${currentProduct.price.toLocaleString()}`;
                document.getElementById('product-detail-description').textContent = currentProduct.description || '';
                
                navigateTo('product-detail');
            }
        }

        // Function to add current product to cart
        function addToCart() {
            if (currentProduct) {
                const existingItem = cart.find(item => item.id === currentProduct.id);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: currentProduct.id,
                        name: currentProduct.name,
                        price: currentProduct.price,
                        quantity: 1,
                        image: currentProduct.image
                    });
                }
                
                alert(`${currentProduct.name} ditambahkan ke keranjang!`);
                navigateTo('menu');
            }
        }

        // Function to search products
        function searchProducts() {
            const query = document.getElementById('search-input').value.toLowerCase();
            
            if (query === '') {
                loadProducts();
                return;
            }
            
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(query) || 
                product.category.toLowerCase().includes(query)
            );
            
            const productGrid = document.getElementById('product-grid');
            productGrid.innerHTML = '';
            
            filteredProducts.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product-card';
                productElement.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">Rp${product.price.toLocaleString()}</div>
                    <button class="add-button" onclick="viewProduct(${product.id})">+</button>
                `;
                productGrid.appendChild(productElement);
            });
        }

        // Function to filter products by category
        function filterByCategory(category) {
            loadProducts(category);
        }

        // Initialize the app
        document.addEventListener('DOMContentLoaded', function() {
            // Start at welcome page
            // Will automatically navigate to menu page when welcome button is clicked
        });