{
	const slider = document.querySelector('.result__slider');
	if(slider) {
		if(!slider.closest('.result_v2')) {
			let mySwiper;

			function mobileSlider() {
				if(document.documentElement.clientWidth < 992 && slider.dataset.mobile == 'false') {
					mySwiper = new Swiper(slider, {
						slidesPerView: 1,
						speed: 600,
						loop: true,
						// autoplay: {
						//     delay: 3000,
						//     disableOnInteraction: false,
						// },
						navigation: {
							nextEl: slider.querySelector('.result__btn-next'),
							prevEl: slider.querySelector('.result__btn-prev'),
						},
					});
	
					slider.dataset.mobile = 'true';
				}
	
				if(document.documentElement.clientWidth > 991.98) {
					slider.dataset.mobile = 'false';
	
					if(slider.classList.contains('swiper-container-initialized')) {
						mySwiper.destroy();
					}
				}
			}
	
			mobileSlider();
	
			window.addEventListener('resize', () => {
				mobileSlider();
			})
		}
	}

}