{
	const slider = document.querySelector('.about-us-block__slider');
	if(slider) {
		let mySwiper;

		function mobileSlider() {
			if(document.documentElement.clientWidth > 767.98 && slider.dataset.mobile == 'false') {
				mySwiper = new Swiper(slider, {
                    observer: true,
                    observeParents: true,
                    slidesPerView: 3,
                    spaceBetween: 0,
                    speed: 800,
                    watchSlidesVisibility: true,
                    // Arrows
                    navigation: {
                        nextEl: slider.querySelector('.about-us-block__slide-btn-next'),
                        prevEl: slider.querySelector('.about-us-block__slide-btn-prev'),
                    },
				});

				slider.dataset.mobile = 'true';

				//mySwiper.slideNext(0);
			}

			if(document.documentElement.clientWidth < 768) {
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

        let wrapper = slider.querySelector('.swiper-wrapper');

        if(document.documentElement.clientWidth < 768) {
            let arr = Array.from(wrapper.children);
            if(arr.length > 3) {
                arr = arr.slice(3, arr.length);
                let div = document.createElement('div');
                div.className = '_toggleWrap';
                div.append(...arr);
    
                wrapper.append(div);
    
                let btn = document.querySelector('.about-us-block__mobile-btn');

                btn.addEventListener('click', function() {
                    _slideDown(div);
                    this.style.display = 'none';

                })
            }
            
        }
	}

    let bg = document.querySelector('.about-us-block__bg img');
    let items = document.querySelectorAll('.about-us-block__slider .swiper-slide');
    if(items.length && bg) {
        items.forEach(item => {
            let url = item.dataset.hoverBg;

            item.addEventListener('mouseenter', () => {
                if(document.documentElement.clientWidth > 991.98){
                    bg.src = url;
                }
            })
        })
    }
}
