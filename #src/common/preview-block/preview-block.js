{
    let previewBlocks = document.querySelectorAll('.preview-block');
    if(previewBlocks.length) {
        previewBlocks.forEach(previewBlock => {
            let slider = previewBlock.querySelector('.preview-block__slider');
            let top = previewBlock.querySelector('.preview-block__top');
            let sliderChildren = previewBlock.querySelector('.preview-block__slider .swiper-wrapper').children;
            let dataSlider;
            let dataSliderBottom;

            if(sliderChildren.length > 2) {
                moveTwoFirstSliderChildrenToTop(top, sliderChildren);
            }

            if(slider) {
                dataSlider = new Swiper(slider.querySelector('.swiper-container'), {
                    observer: true,
                    observeParents: true,
                    speed: 800,
                    
                    loop: true,
                    watchSlidesVisibility: true,
                    // Arrows
                    navigation: {
                        nextEl: slider.querySelector('.preview-block__btn-next'),
                        prevEl: slider.querySelector('.preview-block__btn-prev'),
                    },
                    breakpoints: {
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 11,
                            autoHeight: true,
                            centeredSlides: false,
                           // loop: false,
                        },
                        768: {
                            slidesPerView: 'auto',
                            spaceBetween: 30,
                            centeredSlides: true,
                        },
                    },
                });

                if(document.documentElement.clientWidth < 768) {
                    createSlider();
                }
        
                function createSlider() {
                   
                    let container = slider;
                    let mainSliderChilds = [...slider.querySelector('.swiper-container .swiper-wrapper').children]
                        .filter(i => !i.classList.contains('swiper-slide-duplicate'));
                    let hulfChilds = mainSliderChilds.slice(Math.floor(mainSliderChilds.length / 2));
                    
                    let slider2 = document.createElement('div');
                    slider2.className = "top-slider swiper-container";
                    slider2.innerHTML = '<div class="swiper-wrapper"></div>';
                    slider2.firstChild.append(...hulfChilds);
        
                    dataSlider.update();
                    container.prepend(slider2);
        
                    dataSliderBottom = new Swiper(slider2, {
                        observer: true,
                        observeParents: true,
                        speed: 800,
                        
                        loop: true,
                        watchSlidesVisibility: true,
                        // Arrows
                        navigation: {
                            nextEl: slider.querySelector('.preview-block__btn-next'),
                            prevEl: slider.querySelector('.preview-block__btn-prev'),
                        },
                        breakpoints: {
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 11,
                                autoHeight: true,
                                centeredSlides: false,
                                //loop: false,
                            },
                            768: {
                                slidesPerView: 'auto',
                                spaceBetween: 30,
                                centeredSlides: true,
                            },
                        },
                        
                    });
        
                    dataSlider.controller.control = dataSliderBottom;
                    dataSliderBottom.controller.control = dataSlider;
                        
                }

                $('img.img-svg').each(function(){
                    var $img = $(this);
                    var imgClass = $img.attr('class');
                    var imgURL = $img.attr('src');
                    $.get(imgURL, function(data) {
                      var $svg = $(data).find('svg');
                      if(typeof imgClass !== 'undefined') {
                        $svg = $svg.attr('class', imgClass+' replaced-svg');
                      }
                      $svg = $svg.removeAttr('xmlns:a');
                      if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                      }
                      $img.replaceWith($svg);
                    }, 'xml');
                  });
            }
        })
    }

    function moveTwoFirstSliderChildrenToTop(wrapper, children) {
        let items;
        if(document.documentElement.clientWidth > 991.98) {
            items = Array.from(children).slice(0, 2);
        } else {
            items = Array.from(children).slice(0, 1);
        }

        wrapper.append(...items);

    }

    if(document.documentElement.clientWidth < 768) {
        let titles = document.querySelectorAll('.news-card__title');
        if(titles.length) {
            titles.forEach((title, index) => {
                if(index > 0) {
                    cropText(title, 30);
                }
            })
        }
        
    }
}