{
    let header = document.querySelector('.header');
    let menu = document.querySelector('.menu');
    if (header && menu) {
        const setHeight = () => {
            if (document.documentElement.clientWidth < 992) {
                menu.style.height = `calc(100vh - ${header.clientHeight}px)`;
            }
        }

        setHeight();
        window.addEventListener('resize', setHeight);

        let menuItems = menu.querySelectorAll('.menu-item-has-children');
        if (menuItems.length) {
            menuItems.forEach(menuItems => {
                let link = menuItems.querySelector('.menu__link');
                let subMenu = menuItems.querySelector('.sub-menu');

                link.addEventListener('click', (e) => {
                    if (document.documentElement.clientWidth < 992) {
                        e.preventDefault();
                        link.classList.toggle('is-open');
                        _slideToggle(subMenu);

                        menuItems.forEach(i => {
                            if (i === menuItems) return;

                            let link = i.querySelector('.menu__link');
                            let subMenu = i.querySelector('.sub-menu');

                            link.classList.remove('is-open');
                            _slideUp(subMenu);

                        })
                    }
                })

            })
        }
    }
}