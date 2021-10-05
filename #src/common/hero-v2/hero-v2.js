{
    let heroV2 = document.querySelector('.hero-v2');
    if(heroV2) {
        let heroBg = heroV2.querySelector('.hero-v2__bg');
        let heroCol1 = heroV2.querySelector('.hero-v2__col-1');

        if(heroBg && heroCol1) {
            const setBgHeight = () => {
                if(document.documentElement.clientWidth < 768) {
                    heroBg.style.height = heroCol1.clientHeight + 'px';
                }
            }

            setBgHeight();
            window.addEventListener('resize', setBgHeight);
        }
    }
}