const loadImageGalleryCarousel = () => {
  // swiper
  const galleryIndex = document.querySelectorAll(".image-gallery-carousel-block .swiper");
  if (galleryIndex.length > 0) {
    galleryIndex.forEach((sliderElement) => {
      new Swiper(sliderElement, {
        spaceBetween: 20,
        slidesPerView: "auto",
        autoplay: {
          delay: 5000,
          disableOnInteraction: true,
        },
        navigation: {
          nextEl: sliderElement.querySelector(".swiper-button.next"),
          prevEl: sliderElement.querySelector(".swiper-button.prev"),
        },
        breakpoints: {
          480: {
            spaceBetween: 15,
          },
        },
      });
    });
  }
};

document.addEventListener("DOMContentLoaded", loadImageGalleryCarousel);
