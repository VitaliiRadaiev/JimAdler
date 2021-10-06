{
    let body = document.querySelector('body');
    if(body) {
        let cta = document.querySelector('.bottom-cta');
        if(cta) {
            const setPedding = () => body.style.paddingBottom = cta.clientHeight + 'px';
            setPedding();
            let id = setInterval(setPedding, 200);
            setTimeout(() => {
                clearInterval(id);
            },1000)
            window.addEventListener('resize', setPedding);
        }
    }
}