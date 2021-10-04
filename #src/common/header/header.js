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

        function addSlideHandler(menuItems, menuItem, link, subMenu, ifMobile = false) {
            if(ifMobile) {
                link.addEventListener('click', (e) => {
                    if(document.documentElement.clientWidth < 992) {
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
            } else {
                link.addEventListener('click', (e) => {

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

                })
            }
        }

        let menuItems = menu.querySelectorAll('.menu__list > .menu-item-has-children');
        if (menuItems.length) {
            menuItems.forEach(menuItem => {
                let link = menuItem.querySelector('.menu__link');
                let subMenu = menuItem.querySelector('.sub-menu');
                addSlideHandler(menuItems, menuItem, link, subMenu, true);
            })
        }

        let subMenuArr = menu.querySelectorAll('.sub-menu');
        if (subMenuArr.length) {
            subMenuArr.forEach(subMenu => {
                let menuItems = subMenu.querySelectorAll('.sub-menu__list > .menu-item-has-children');
                if (menuItems.length) {
                    menuItems.forEach(menuItem => {
                        let link = menuItem.querySelector('.sub-menu__link');
                        let subMenu = menuItem.querySelector('.sub-menu');

                        addSlideHandler(menuItems, menuItem, link, subMenu);

                    })
                }
            })
        }
    }
}