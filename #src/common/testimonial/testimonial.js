{
    let testimonials = document.querySelectorAll('.testimonial');
    if(testimonials.length) {
        testimonials.forEach(testimonial => {
            let imagesSlider = testimonial.querySelector('.testimonial__images');
            let slider = testimonial.querySelector('.testimonial__body');

            if(imagesSlider && slider) {
                let dataImagesSlider = new Swiper(imagesSlider, {
                    effect: 'fade',
                    observer: true,
                    observeParents: true,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    speed: 800,
                    loop: true,
                    preloadImages: false,
                    lazy: {
                    	loadPrevNext: true,
                    },
                });

                let dataSlider = new Swiper(slider, {
                    autoplay: {
                        delay: 6000,
                        disableOnInteraction: false,
                    },
                    observer: true,
                    observeParents: true,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    autoHeight: true,
                    loop: true,
                    speed: 800,
                    navigation: {
                        nextEl: slider.querySelector('.testimonial__btn-next'),
                        prevEl: slider.querySelector('.testimonial__btn-prev'),
                    },
                });

                dataSlider.controller.control = dataImagesSlider;
                dataImagesSlider.controller.control = dataSlider;
            }
        })
    }
}