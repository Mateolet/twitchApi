const menu = document.getElementById('menu');
const containerMenu = document.getElementById('containerMenu');
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');

/* Navbar func */
const open = () => {
  menu.classList.remove('w-0');
  menu.classList.add('w-full');
  containerMenu.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
};

const close = () => {
  menu.classList.remove('w-full');
  menu.classList.add('w-0');
  containerMenu.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
};

let current = containerMenu.children[1];
const setActiveLink = () => {
  if (window.location.pathname === '/') {
    let homeElement = containerMenu.children[1];
    homeElement.classList.add('active');
  } else if (window.location.pathname === '/satoshi') {
    let satoshiElement = containerMenu.children[2];
    satoshiElement.classList.add('active');
    current = satoshiElement;
  } else if (window.location.pathname === '/slots') {
    let slotsElement = containerMenu.children[3];
    slotsElement.classList.add('active');
    current = slotsElement;
  }
};
/**/

openMenu.addEventListener('click', open);
closeMenu.addEventListener('click', close);
document.addEventListener('DOMContentLoaded', setActiveLink);
