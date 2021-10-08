import galleryItems from "./app.js";

const galleryEl = document.querySelector(".gallery");
const linkEl = document.querySelector(".gallery__link");
const lightboxEL = document.querySelector(".js-lightbox");
const lightboxImageEl = document.querySelector(".lightbox__image");
const buttonModalCloseEl = lightboxEL.querySelector(".lightbox__button");
const lightboxOverlayEl = document.querySelector(".lightbox__overlay");

const createGalleryItem = (images) => {
    let string = "";
    images.forEach(({ preview, original, description }) => {
        string += `<li class="gallery__item">
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
    </li>`;
    });
    return string;
};

const listGalleryItem = createGalleryItem(galleryItems);
galleryEl.insertAdjacentHTML("afterbegin", listGalleryItem);

galleryEl.addEventListener("click", onClick);
buttonModalCloseEl.addEventListener("click", closeModal);
lightboxOverlayEl.addEventListener("click", closeModal);
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxEL.classList.contains("is-open")) {
        closeModal();
    }
});

function onClick(e) {
    e.preventDefault();
    if (e.target.nodeName !== "IMG") {
        return;
    }
    lightboxEL.classList.add("is-open");
    lightboxImageEl.src = e.target.dataset.source;
    lightboxImageEl.alt = e.target.alt;
}

function closeModal() {
    lightboxEL.classList.remove("is-open");
    lightboxImageEl.src = "#";
    lightboxImageEl.alt = "#";
    window.removeEventListener("click", closeModal);
}

const dataSources = galleryItems.map((galleryItem) => {
    return galleryItem.original;
});

document.addEventListener("keydown", (e) => {
    if (!lightboxEL.classList.contains("is-open")) {
        return;
    }
    const curentIndex = dataSources.indexOf(lightboxImageEl.src);
    if (e.key === "ArrowLeft") {
        leftClick(curentIndex);
    } else if (e.key === "ArrowRight") {
        rightClick(curentIndex);
    }
});

function leftClick(curentIndex) {
    let nextIndex = curentIndex - 1;
    if (nextIndex === -1) {
        nextIndex = dataSources.length - 1;
    }
    lightboxImageEl.src = dataSources[nextIndex];
}

function rightClick(curentIndex) {
    let nextIndex = curentIndex + 1;
    if (nextIndex === dataSources.length) {
        nextIndex = 0;
    }
    lightboxImageEl.src = dataSources[nextIndex];
}