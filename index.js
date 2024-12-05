const menu = document.querySelector('nav ul');
const menuBtn = document.querySelector('.menu-icon');
const closeBtn = document.querySelector('.close-btn');

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


// Category and Price dropdown toggle
categoryBtn.addEventListener('click', () => toggleDropdown(categoryList, priceList));
priceBtn.addEventListener('click', () => toggleDropdown(priceList, categoryList));

// Close dropdown after selecting an item (mobile)
closeListItems.forEach(item => {
    item.addEventListener('click', closeDropdowns);
});

document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
    input.addEventListener('change', handleFilterAndSort);
});

function handleFilterAndSort() {
    // Get selected categories (checkboxes)
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    // Get selected price order (radio)
    const selectedPriceOrder = document.querySelector('input[name="price"]:checked')?.value || '';

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
    if (priceOrder) {
        const sortedProducts = Array.from(products)
            .filter(product => product.style.display === 'block') // Sort only visible products
            .sort((a, b) => {
                const priceA = parseFloat(a.getAttribute('data-price'));
                const priceB = parseFloat(b.getAttribute('data-price'));

                if (priceOrder === 'low') {
                    return priceA - priceB;
                } else if (priceOrder === 'high') {
                    return priceB - priceA;
                }
            });

        // Clear and re-append products in sorted order
        productContainer.innerHTML = '';
        sortedProducts.forEach(product => productContainer.appendChild(product));
    }
}
