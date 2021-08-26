{
    let resultLists = document.querySelectorAll('.result-v2__list');
    if(resultLists.length) {
        resultLists.forEach(item => {
            let textItems = Array.from(item.querySelectorAll('.result-v2-card__text'));
            let height = Math.max(...textItems.map(i => i.clientHeight)) - 100;
            if(height > 100) {
                item.style.marginBottom = height + 'px';
            }
        })
    }
}