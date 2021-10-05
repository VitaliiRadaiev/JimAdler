{
    let testimonialSlider = document.querySelector('.testimonial-text__slider');
    if(testimonialSlider) {
        let slider = new Swiper(testimonialSlider.querySelector('.swiper-container'), {
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 20,
            autoHeight: true,
            speed: 800,
            // Dotts
            pagination: {
            	el: testimonialSlider.querySelector('.swiper-pagination'),
            	clickable: true,
            },
        });
    }
}