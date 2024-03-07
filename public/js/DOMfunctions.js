const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const menu = document.getElementById('menu');

const open = () => {
  menu.classList.remove('hidden');
  menu.classList.add('block');
};

const close = () => {
  menu.classList.remove('block');
  menu.classList.add('hidden');
};

openMenu.addEventListener('click', open);
closeMenu.addEventListener('click', close);
