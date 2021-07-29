let bg = document.querySelector('.related-pages__bg img');
    let items = document.querySelectorAll('.related-pages__link');
    if( bg && items.length) {
        changeImgOnHoverItem(bg, items);
    }