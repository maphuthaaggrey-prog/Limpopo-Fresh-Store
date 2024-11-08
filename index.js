const menu = document.querySelector('nav ul');
const menuBtn = document.querySelector('.menu-icon');
const closeBtn = document.querySelector('.close-btn');
const closeMenu = document.querySelector('.wrap');
const categoryBtn = document.querySelector('.categorybtn');
const categoryList = document.querySelector('.categorylst');
const priceBtn = document.querySelector('.pricebtn');
const priceList = document.querySelector('.pricelst');
const closeListItems = document.querySelectorAll('ul.categorylst li, ul.pricelst li');

// Dropdown toggle (mobile)
function toggleDropdown(targetList, otherList) {
    targetList.classList.toggle('showDrop');
    otherList.classList.remove('showDrop'); // Close other dropdown
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.matches('.categorybtn') && !e.target.matches('.pricebtn')) {
        closeDropdowns();
    }
});

function closeDropdowns() {
    categoryList.classList.remove('showDrop');
    priceList.classList.remove('showDrop');
}

// Menu toggle (mobile)
function toggleMenu() {
    menu.classList.toggle('open');
    closeDropdowns(); // Close dropdowns if menu is open
}

menuBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', () => menu.classList.remove('open'));
closeMenu.addEventListener('click', () => menu.classList.remove('open'));

// Category and Price dropdown toggle
categoryBtn.addEventListener('click', () => toggleDropdown(categoryList, priceList));
priceBtn.addEventListener('click', () => toggleDropdown(priceList, categoryList));

// Close dropdown after selecting an item (mobile)
closeListItems.forEach(item => {
    item.addEventListener('click', closeDropdowns);
});

// Filter and Sort for desktop (checkboxes)
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', handleFilterAndSort);
});

// Filter and Sort for mobile (dropdown)
document.querySelectorAll('ul.categorylst li, ul.pricelst li').forEach(listItem => {
    listItem.addEventListener('click', handleFilterAndSortMobile);
});

function handleFilterAndSort() {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    const selectedPriceOrder = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(cb => cb.value);

    filterAndSortProducts(selectedCategories, selectedPriceOrder);
}

// Function for mobile filter and sort
function handleFilterAndSortMobile(e) {
  // Capture clicked list item
  const listItem = e.target.closest('li');
  if (!listItem) return; // Ignore clicks on non-list items

  // Toggle the 'selected' class on the clicked list item
  listItem.classList.toggle('selected');

  // Get selected categories and price order from dropdown
  const selectedCategories = Array.from(document.querySelectorAll('ul.categorylst li.selected')).map(li => li.textContent.trim());
  const selectedPriceOrder = Array.from(document.querySelectorAll('ul.pricelst li.selected')).map(li => li.textContent.trim());

  // Filter and sort the products
  filterAndSortProducts(selectedCategories, selectedPriceOrder);
}


// Filter and Sort products
function filterAndSortProducts(categories, priceOrder) {
    const products = document.querySelectorAll('.product');
    const productContainer = document.querySelector('.food-price');

    // Filter products by category
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        if (categories.length === 0 || categories.includes(productCategory)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });

    // Sort products by price if any order is selected
    if (priceOrder.length > 0) {
        const sortedProducts = Array.from(products).sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));

            // Check the selected price order
            if (priceOrder.includes('Low to High')) {
                return priceA - priceB;
            } else if (priceOrder.includes('High to Low')) {
                return priceB - priceA;
            }
        });

        // Clear and re-append products in sorted order
        productContainer.innerHTML = '';
        sortedProducts.forEach(product => productContainer.appendChild(product));
    }
}

// Filter products by category (used in case of direct selection from category list)
function filterProductsByCategory(category) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        product.style.display = category === 'All Categories' || productCategory === category.toLowerCase() ? 'block' : 'none';
    });
}

// Sort products by price (used in case of direct selection from price list)
function sortProductsByPrice(order) {
    const products = document.querySelectorAll('.product');
    const productContainer = document.querySelector('.food-price');

    const sortedProducts = Array.from(products).sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));

        return order === 'Low to High' ? priceA - priceB : priceB - priceA;
    });

    // Clear and re-append products in sorted order
    productContainer.innerHTML = '';
    sortedProducts.forEach(product => productContainer.appendChild(product));
}
