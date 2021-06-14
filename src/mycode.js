

import galleryRef from './gallery-items.js';
const galleryHolder = document.querySelector('.js-gallery');
const galleryMarkup = makeGalleryMarkup(galleryRef);
  galleryHolder.insertAdjacentHTML('beforeend', galleryMarkup);

  const openModalBtn = document.querySelector('.js-lightbox')
  const lightBoxImg = document.querySelector('.lightbox__image')
  
  galleryHolder.addEventListener('click', onGalleryClick)

function makeGalleryMarkup(picture) {
  return picture.map(({preview, original, description}) => {
    return `
    <li class="gallery__item">
    <a
    class="gallery__link"
    href="${original}"
  >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`
    }).join('');
    };
  
    
  

  function onGalleryClick (e) {
    e.preventDefault();

    const galleryImage= e.target.classList.contains('gallery__item')
    if (!galleryImage){
 
 openModalBtn.classList.add('is-open');
 lightBoxImg.src = e.target.dataset.source;
 lightBoxImg.alt = e.target.alt;

      window.addEventListener('keydown', onEscapeClick);
      window.addEventListener('keydown', onScrollImages)
  }};

  
 
 

const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');

closeModalBtn.addEventListener('click', closeModal);


function closeModal(){
  
        openModalBtn.classList.remove('is-open');
        lightBoxImg.src = '';
      lightBoxImg.alt = '';
     
      
  window.removeEventListener('keydown', onEscapeClick);
}



function onEscapeClick(e) {
  if (e.key === 'Escape') {
    // openModalBtn.classList.remove('is-open')
    closeModal()
  }
};


let originImages = [];
galleryRef.forEach(item => {
  originImages.push(item.original);
});

function onScrollImages(e) {
  let index = originImages.indexOf(lightBoxImg.src);
  if (e.key === 'ArrowRight') {
    if (index < originImages.length - 1) {
      lightBoxImg.setAttribute("src", originImages[index + 1])
    } else {
      index = -1;
      lightBoxImg.setAttribute("src", originImages[index + 1])
      console.log(originImages)
    }
  }
  if (e.key === 'ArrowLeft') {
    if (index === 0) {
      index = originImages.length;
      lightBoxImg.setAttribute("src", originImages[index - 1]);
    }else lightBoxImg.setAttribute("src", originImages[index - 1])
  }
}

const backdrop = document.querySelector('.lightbox__overlay');
backdrop.addEventListener('click', onBackdropClick);

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    closeModal();
  }
}













