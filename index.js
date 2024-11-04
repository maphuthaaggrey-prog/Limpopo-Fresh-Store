//MAPHUTHA AC

const menu = document.querySelector('nav ul');
const menuBtn = document.querySelector('.menu-icon');
const closeBtn = document.querySelector('.close-btn');
const closeMenu = document.querySelector('.wrap')

menuBtn.addEventListener('click', () => {
    menu.classList.add('open')
});

closeBtn.addEventListener('click', () => {
    menu.classList.remove('open')
});

closeMenu.addEventListener('click', () => {

    menu.classList.remove('open')
  });

document.getElementById('.about-us').addEventListener('click', function() {
    document.getElementById('target-section').scrollIntoView({
        behavior: 'smooth'
    });
});
  
  
