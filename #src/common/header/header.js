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
            menuItems.forEach(menuItem => {
                let link = menuItem.querySelector('.menu__link');
                let subMenu = menuItem.querySelector('.sub-menu');

                link.addEventListener('click', (e) => {
                    if (document.documentElement.clientWidth < 992) {
                        e.preventDefault();
                        link.classList.toggle('is-open');
                        _slideToggle(subMenu);

                        menuItems.forEach(i => {
                            if (i === menuItem) return;

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