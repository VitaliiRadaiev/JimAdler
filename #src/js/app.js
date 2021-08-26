let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));


let youtubeVimeoUrls = ["https://www.youtube.com/iframe_api"];
youtubeVimeoUrls.forEach(url => {
	let tag = document.createElement('script');
	tag.src = url;
	document.body.prepend(tag);
})

window.addEventListener('load', function () {

	document.body.classList.add('is-load');

	// ==== ADD PADDING-TOP ================================
	{
		let wrapper = document.querySelector('._padding-top');
		if (wrapper) {
			let header = document.querySelector('.header');
			if (header) {
				const setPedding = () => wrapper.style.paddingTop = header.clientHeight + 'px';
				setTimeout(() => {
					setPedding();
				}, 100)

				window.addEventListener('resize', setPedding);
			}

		}
	}
	// ==== AND ADD PADDING-TOP ================================

	@@include('_function.js');
	@@include('files/dynamic_adapt.js');
	@@include('forms.js');
	@@include('../common/burger/burger.js');
	@@include('../common/checkbox/checkbox.js');
	@@include('../common/popup/popup.js');
	@@include('../common/header/header.js');
	@@include('../common/result/result.js');
	@@include('../common/testimonial/testimonial.js');
	@@include('../common/testimonial-text/testimonial-text.js');
	@@include('../common/rating/rating.js');
	@@include('../common/footer/footer.js');
	@@include('../common/preview-block/preview-block.js');
	@@include('../common/result-v2/result-v2.js');
	
	
	@@include('pages/home.js');
	@@include('pages/practice-detail.js');

	
	@@include('../common/video/video.js');
});

window.addEventListener('DOMContentLoaded', function () {
	if (isMobile.any()) {
		document.body.classList.add('_is-mobile');
	}


	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});

});




