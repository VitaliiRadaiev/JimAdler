{
	const slider = document.querySelector('.partners__list');
	if(slider) {
		let mySwiper;

		function mobileSlider() {
			if(document.documentElement.clientWidth <= 768 && slider.dataset.mobile == 'false') {
				mySwiper = new Swiper(slider, {
					slidesPerView: 'auto',
					freeMode: true,
					speed: 600,
				});

				slider.dataset.mobile = 'true';

				//mySwiper.slideNext(0);
			}

			if(document.documentElement.clientWidth > 767.98) {
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