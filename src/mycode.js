import galleryRef from './gallery-items.js';

const galleryHolder = document.querySelector('ul.js-gallery')
const openModalBtn = document.querySelector('.js-lightbox');

// console.log(openModalBtn)
// const closeModalBtn = document.querySelector('[data-action="close-lightbox"]')
const lightBoxImg = document.querySelector('img.lightbox__image')

const makeGalleryMarkup=(picture)=> {
  return picture
    .map(({ preview, original, description }) => {
      return `
      <li class = "gallery__item">
  <a class="gallery__link" href = "${original}">
  <img
  class = "gallery__image"
  src="${preview}" 
  data-source ="${original}" 
  alt="${description}"/>
  </a>
  </li>`;
    })
    .join('');
}
const galleryMarkup = makeGalleryMarkup(galleryRef);
galleryHolder.insertAdjacentHTML('beforeend', galleryMarkup)
galleryHolder.addEventListener('click', onGalleryClick)
window.addEventListener('click', onOpenModal)
window.addEventListener('click', closeModal)


 function onGalleryClick(e) {
      e.preventDefault();
  
   const galleryImage = e.target;
    if (galleryImage.nodeName !== 'IMG') {
    return

  }
  
  lightBoxImg.src = e.target.dataset.source;
  lightBoxImg.alt = e.target.alt;
  lightBoxImg.dataset.index = e.target.dataset.index

};

function onOpenModal(e){
    window.addEventListener('keyup', onEscapeClick);
    window.addEventListener('keyup', onScrollImages)
    if (e.target.nodeName==='IMG')
    {
      openModalBtn.classList.add('is-open');
      
   
    }

}


function closeModal(e){
    if(e.target.nodeName!=='IMG')
    {
        openModalBtn.classList.remove('is-open');
        lightBoxImg.src = '';
      lightBoxImg.alt = '';
     
      
    }
}



function onEscapeClick(e) {
  if (e.key === 'Escape') {
    openModalBtn.classList.remove('is-open')
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


function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    openModalBtn.classList.remove('is-open');
  }
}

backdrop.addEventListener('click', onBackdropClick);











