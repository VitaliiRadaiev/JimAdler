{
    const slider = document.querySelector('.about-us-block__slider');
    if (slider) {
        let mySwiper;

        let hasMode = !!slider.closest('.about-us-block_v2');

        function mobileSlider() {
            if (document.documentElement.clientWidth > 767.98 && slider.dataset.mobile == 'false') {
                mySwiper = new Swiper(slider.querySelector('.swiper-container'), {
                    observer: true,
                    observeParents: true,

                    speed: 800,
                    watchSlidesVisibility: true,
                    // Arrows
                    navigation: {
                        nextEl: slider.querySelector('.about-us-block__slide-btn-next'),
                        prevEl: slider.querySelector('.about-us-block__slide-btn-prev'),
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 0,
                        },
                        1920: {
                            slidesPerView: hasMode ? 3 : 4,
                            spaceBetween: 0,
                        },
                    },
                });

                slider.dataset.mobile = 'true';

                //mySwiper.slideNext(0);
            }

            if (document.documentElement.clientWidth < 768) {
                slider.dataset.mobile = 'false';

                if (slider.classList.contains('swiper-container-initialized')) {
                    mySwiper.destroy();
                }
            }
        }

        mobileSlider();

        window.addEventListener('resize', () => {
            mobileSlider();
        })

        let wrapper = slider.querySelector('.swiper-wrapper');

        if (document.documentElement.clientWidth < 768) {
            let arr = Array.from(wrapper.children);
            if (arr.length > 3) {
                arr = arr.slice(3, arr.length);
                let div = document.createElement('div');
                div.className = '_toggleWrap';
                div.append(...arr);

                wrapper.append(div);

                // let btn = document.querySelector('.about-us-block__mobile-btn');
                // if(btn) {
                //     btn.addEventListener('click', function () {
                //         _slideDown(div);
                //         this.style.display = 'none';
                //     })
                // }
            }

        }
    }

    let bg = document.querySelector('.about-us-block__bg img');
    let items = document.querySelectorAll('.about-us-block__slider .swiper-slide');
    if (bg && items.length) {
        changeImgOnHoverItem(bg, items);
    }

}
