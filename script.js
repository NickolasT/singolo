// HEADER

const LOC_HASH = document.location.hash;
const LOGO = document.querySelector('.logo');
const HEADER_NAV = document.querySelector('.headerNavigation ul');
const NAV_ITEMS = [...HEADER_NAV.querySelectorAll('li')];

NAV_ITEMS.forEach(item => {
  if(item.children[0].getAttribute('href') == LOC_HASH) item.classList.add('navigationItem_current');
});

LOGO.addEventListener('click', () => {
  NAV_ITEMS.forEach(item => item.classList.remove('navigationItem_current'));
  NAV_ITEMS[0].classList.add('navigationItem_current');
});

HEADER_NAV.addEventListener('click', (e) => {
  NAV_ITEMS.forEach(item => item.classList.remove('navigationItem_current'));
  e.target.closest('li').classList.add('navigationItem_current');
});

// PORTFOLIO

const TAGS_MENU = document.querySelector('.tags');
const TAGS = [...TAGS_MENU.querySelectorAll('.tagsItem')];
const GALLERY = document.querySelector('.portfolio .layout-4-col');
const PICS = [...GALLERY.querySelectorAll('.portfolioPic')];

TAGS_MENU.addEventListener('click', (e) => {
  TAGS.forEach(tag => tag.classList.remove('tagsItem_active'));
  e.target.classList.add('tagsItem_active');
  PICS.forEach(pic => pic.style.order = Math.floor((Math.random()*PICS.length)).toString());
});

GALLERY.addEventListener('click', (e) => {
  PICS.forEach(pic => pic.children[0].style.outline = '');
  e.target.style.outline = '5px solid #f06c64';
});

// FORM

const FORM = document.querySelector('.contact-form');
FORM.addEventListener('submit', submitFormHandler);

function submitFormHandler (e) {
  e.preventDefault();
  displayModal();
  fillModal();
  document.querySelector('.modal-windowButton').addEventListener('click', removeModal);
}

function fillModal () {
  if (FORM.subject.value) document.querySelector('.modal-windowSubject').textContent = 'Subject: ' + FORM.subject.value;
  if (FORM.comments.value) document.querySelector('.modal-windowComments').textContent = 'Description: ' + FORM.comments.value;
}

function displayModal () {
  document.body.append(template.content.cloneNode(true));
}

function removeModal (e) {
  e.target.closest('.overlay').remove();
  FORM.reset();
}

// SLIDER

const SLIDER_SECTION = document.querySelector('.slider');
const SLIDER_FRAME = document.querySelector('.sliderFrame');

let slides
createNewStructure();
let current = 0, next = 1, prev = slides.length-1;
initNewStructure();

nextBtn.addEventListener('click', buttonHandler);
prevBtn.addEventListener('click', buttonHandler);
SLIDER_FRAME.addEventListener('click', handlePhones);

function createNewStructure () {
  if (SLIDER_FRAME.children.length > 2) {
    slides = [...SLIDER_FRAME.children];
  } else {
    slides = [...SLIDER_FRAME.children];
    [...SLIDER_FRAME.children].forEach(item => {
      slides.push(item.cloneNode(true));
    });
  }
}

function initNewStructure () {
  slides.forEach(slide => slide.remove());
  setNewMargins();
  useColorStyles();
  SLIDER_FRAME.append(slides[prev], slides[current], slides[next]);
}

function setNewMargins () {
  slides[prev].classList.add('slide_prev');
  slides[current].classList.add('slide_current');
  slides[next].classList.add('slide_next');
}

function useColorStyles () {
  SLIDER_SECTION.style.backgroundColor = slides[current].dataset.bgColor;
  SLIDER_SECTION.style.borderColor = slides[current].dataset.borderColor;
}

function buttonHandler (e) {
  disableButton(e);
  cancelMargins();
  handleCertainButton(e);
  setNewMargins();
  useColorStyles();
  switchOnMobiles();
}

function disableButton (e) {
  e.target.disabled = true;
  e.target.classList.add('hidden', 'no-pointed');
  setTimeout(() => {
    e.target.disabled = false;
    e.target.classList.remove('hidden', 'no-pointed');
  }, 1000);
}

function cancelMargins () {
  slides.forEach(slide => slide.classList.remove('slide_prev', 'slide_current', 'slide_next'));
}

function handleCertainButton (e) {
  if(e.target === nextBtn) {
    slides[prev].remove();
    calcNewMargins(1);
    SLIDER_FRAME.append(slides[next]);
  } else {
    slides[next].remove();
    calcNewMargins(-1);
    SLIDER_FRAME.prepend(slides[prev]);
  }
}

function switchOnMobiles () {
  [...slides[current].children].forEach(mobile => mobile.children[1].classList.remove('hidden'));
}

function calcNewMargins (change) {
  prev = (prev + change + slides.length) % slides.length;
  current = (current + change + slides.length) % slides.length;
  next = (next + change + slides.length) % slides.length;
}

function handlePhones (e) {
  if(e.target.classList.contains('mobile-screen-on')) {
    e.target.classList.toggle('hidden');
  }
  if(e.target.classList.contains('mobile-phone')) {
    e.target.nextSibling.classList.toggle('hidden');
  }
}