window.addEventListener('DOMContentLoaded', function () {
    @@include('files/dynamic_adapt.js');
    
    let language = document.documentElement.lang;
    if (language === 'en-US') {
        document.body.classList.add('english-lang');
    } else if (language === 'es-ES') {
        document.body.classList.add('spanish-lang');
    }


    let vimeoPosters = document.querySelectorAll('[data-cs-vimeo-poster]');
    if (vimeoPosters.length) {
        vimeoPosters.forEach(el => {
            setPosterVimeo(el);
        })
    }
    let youtubePosters = document.querySelectorAll('[data-youtube-poster]');
    if (youtubePosters.length) {
        youtubePosters.forEach(el => {
            setPosterYoutube(el);
        })
    }

    function setPosterVimeo(el) {
        let url = el.dataset.csVimeoPoster;
        el.insertAdjacentHTML('beforeend', `<img src="${url}" alt="">`)
    }
    function setPosterYoutube(el) {
        let url = el.dataset.youtubePoster;
        el.insertAdjacentHTML('beforeend', `<img src="${url}" alt="">`)
    }


    let youtubeVimeoUrls = ["https://www.youtube.com/iframe_api"];
    youtubeVimeoUrls.forEach(url => {
        let tag = document.createElement('script');
        tag.src = url;
        document.body.prepend(tag);
    })


});


