const menu = document.querySelector('nav ul');
const menuBtn = document.querySelector('.menu-icon');
const closeBtn = document.querySelector('.close-btn');
const closeMenu = document.querySelector('.wrap');
const categoryBtn = document.querySelector('.categorybtn');
const categoryList = document.querySelector('.categorylst');
const priceBtn = document.querySelector('.pricebtn');
const priceList = document.querySelector('.pricelst');
const closeListItems = document.querySelectorAll('ul.categorylst li, ul.pricelst li');
const closeList = document.querySelectorAll('.heading .food-price');

closeList.addEventListener('click', () => {
    categoryList.classList.remove('showDrop');
    priceList.classList.remove('showDrop');
});

menuBtn.addEventListener('click', () => {
    menu.classList.add('open');
    categoryList.classList.remove('showDrop');
    priceList.classList.remove('showDrop');
});

closeBtn.addEventListener('click', () => {
    menu.classList.remove('open');
});

closeMenu.addEventListener('click', () => {
    menu.classList.remove('open');
});

categoryBtn.addEventListener('click', () => {
    categoryList.classList.toggle('showDrop');
    priceList.classList.remove('showDrop'); 
});

priceBtn.addEventListener('click', () => {
    priceList.classList.toggle('showDrop');
    categoryList.classList.remove('showDrop'); 
});

closeListItems.forEach(item => {
    item.addEventListener('click', () => {
        categoryList.classList.remove('showDrop');
        priceList.classList.remove('showDrop');
    });
});

document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
        const selectedPriceOrder = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(cb => cb.value);

        filterAndSortProducts(selectedCategories, selectedPriceOrder);
    });
});

document.querySelectorAll('ul.categorylst li, ul.pricelst li').forEach(function(listItem) { 
    listItem.addEventListener('click', function() {
        listItem.classList.toggle('selected');

        const selectedCategories = Array.from(document.querySelectorAll('ul.categorylst li.selected')).map(li => li.textContent.trim());
        const selectedPriceOrder = Array.from(document.queryAllSelector('ul.pricelst li.selected')).map(li => li.textContent.trim());

        filterAndSortProducts(selectedCategories, selectedPriceOrder);
    });
});

function filterAndSortProducts(categories, priceOrder) {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        if (categories.length === 0 || categories.includes(productCategory)) {
            product.style.display = 'block'; 
        } else {
            product.style.display = 'none'; 
        }
    });

    if (priceOrder.length > 0) {
        const productContainer = document.querySelector('.food-price');
        const sortedProducts = Array.from(products).sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));

            if (priceOrder.includes('low')) {
                return priceA - priceB; // Sort low to high
            } else if (priceOrder.includes('high')) {
                return priceB - priceA; // Sort high to low
            }
        });

        productContainer.innerHTML = '';
        sortedProducts.forEach(product => {
            productContainer.appendChild(product);
        });
    }
}
