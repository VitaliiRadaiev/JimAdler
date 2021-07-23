{
    let header = document.querySelector('.header');
    let menu = document.querySelector('.menu');
    if(header && menu) {
        const setHeight = () => {
            if(document.documentElement.clientWidth < 992) {
                menu.style.height = `calc(100vh - ${header.clientHeight}px)`;
            }
        }

        setHeight();
        window.addEventListener('resize', setHeight);
    }
}