let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));



window.addEventListener('load', function () {
	document.body.classList.add('is-load');

	// ==== ADD PADDING-TOP ================================
	{
		let wrapper = document.querySelector('._padding-top');
		if (wrapper) {
			let header = document.querySelector('.header');
			if (header) {
				const setPedding = () => wrapper.style.paddingTop = header.clientHeight + 'px';
				setPedding();
				let id = setInterval(setPedding, 200);
				setTimeout(() => {
					clearInterval(id);
				},1000)
				window.addEventListener('resize', setPedding);
			}

		}
	}
	// ==== AND ADD PADDING-TOP ================================

	//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================





$('img.img-svg').each(function(){
  var $img = $(this);
  var imgClass = $img.attr('class');
  var imgURL = $img.attr('src');
  $.get(imgURL, function(data) {
    var $svg = $(data).find('svg');
    if(typeof imgClass !== 'undefined') {
      $svg = $svg.attr('class', imgClass+' replaced-svg');
    }
    $svg = $svg.removeAttr('xmlns:a');
    if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
      $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
    }
    $img.replaceWith($svg);
  }, 'xml');
});




//Spollers
function spollerInit() {
	let spollers = document.querySelectorAll("._spoller");
	if (spollers.length > 0) {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];

			if(spoller.classList.contains('_active')) {
				_slideDown(spoller.nextElementSibling);
			}

			spoller.addEventListener("click", function (e) {
				e.preventDefault();
				if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
					return false;
				}
				if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
					return false;
				}
				if (spoller.closest('._spollers').classList.contains('_one')) {
					let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
					for (let i = 0; i < curent_spollers.length; i++) {
						let el = curent_spollers[i];
						if (el != spoller) {
							el.classList.remove('_active');
							el.parentElement.classList.remove('_active');
							_slideUp(el.nextElementSibling);
						}
					}
				}
				spoller.classList.toggle('_active');
				if(spoller.classList.contains('_active')) {
					spoller.parentElement.classList.add('_active');
				} else {
					spoller.parentElement.classList.remove('_active');
				}
				_slideToggle(spoller.nextElementSibling);
			});
		}
	}
}
spollerInit()
// === // Spollers ==================================================================




if($('.anchor').length>0) {
	$(".anchor").click(function() {
		let elementClick;
		let destination;
		if($(this).attr("href") && $(this).attr("href").match(/#\w+$/gi)) {
			elementClick = $(this).attr("href").match(/#\w+$/gi).join(''); 
			if(document.getElementById(elementClick)) {
				destination = $(elementClick).offset().top - 70;
			} else {
				destination = $(this).closest('.promo-header').height();
			}
		} else {
			if($(this).closest('.promo-header')) {
				destination = $(this).closest('.promo-header').height();
			}
		}
	  if($(this).hasClass('btn-default')) {
		destination = $(elementClick).offset().top - 120;
	  }
	  jQuery("html:not(:animated),body:not(:animated)").animate({
		scrollTop: destination
	  }, 600);
	  return false;
	});
}


function createTabs(containerName = false, triggersName = false, tabsName = false) {
    let container = document.querySelector(`${containerName}`);
    if(container) {
       let allTriggers = document.querySelectorAll(`${triggersName}`);
       let allTabs = document.querySelectorAll(`${tabsName}`);

       if(!allTabs.length) return;

       if(allTriggers.length) {
           allTriggers.forEach(trigger => {
               trigger.addEventListener('click', (e) => {
                   e.preventDefault();
                   const id = trigger.getAttribute('href').replace('#','');
                  
                   trigger.classList.add('active');

                   allTriggers.forEach(i => {
                       if(i == trigger) {
                           return
                       }
                       i.classList.remove('active');
                   });

                   allTabs.forEach(tab => {
                       if(tab.id == id) {
                           tab.classList.add('active')
                       } else {
                           tab.classList.remove('active');
                       }
                   })
                   
               })
           })
       }
        
    }
}

createTabs('.tabs', '.tabs-trigger', '.tabs-content');

function changeImgOnHoverItem(img, items) {
	if(!img) return new Error('img is undefined');
	if(!items) return new Error('item is undefined');

	items.forEach(item => {
		let url = item.dataset.hoverBg;

		item.addEventListener('mouseenter', () => {
			if(document.documentElement.clientWidth > 991.98){
				img.src = url;
			}
		})
	})
}

function cropText(el, count) {
	let text = [...el.innerText].slice(0, count).join('') + '...';
	el.innerText = text;
}


function linkToPhoneOnMobile() {
	if(document.documentElement.clientWidth < 768) {
		let links = document.querySelectorAll('[data-call-mob]');
		if(links.length) {
			links.forEach(link => {
				let phone = link.dataset.callMob.trim();
				if(phone) {
					link.setAttribute('href', `tel:${phone}`);
				}
			})
		}
	}
}

linkToPhoneOnMobile();;
	{
	let vimeoVideos = document.querySelectorAll('[data-cs-vimeo-id]');
	if(vimeoVideos.length) {
		vimeoVideos.forEach(async video => {
			let id = video.dataset.csVimeoId;
			let img = video.querySelector('img');
			
			if(document.documentElement.clientWidth < 992) {
				if(video.dataset.csVimeoMobileId.trim()) {
					id = video.dataset.csVimeoMobileId;
				}
			}

			if(!/[a-z]/gi.test(id)) {
				video.insertAdjacentHTML('beforeend', `<iframe src="https://player.vimeo.com/video/${id}?muted=1&amp;autoplay=1&amp;controls=0&amp;loop=1&amp;background=1&amp"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay;" ></iframe>`);
				let iframe = video.querySelector('iframe')
				iframe.onload = () => {
					if(img) {
						img.style.opacity = 0;
					}
				}
	
				setCoverVideoIframe(iframe, video);
			} else {
				video.insertAdjacentHTML('beforeend', `<iframe src="https://iframe.videodelivery.net/${id}?autoplay=true&muted=true&controls=false" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>`);
				let iframe = video.querySelector('iframe');
				iframe.onload = () => {
					if(img) {
						img.style.opacity = 0;
					}
				}
				setCoverVideoIframe(iframe, video);
			}

		})
	}

	function setCoverVideoIframe(iframe, parent) {
		if(parent.clientWidth > 1282) {
			iframe.style.width = '100%';
			iframe.style.height = parent.clientWidth * 0.57 + 'px';
		} else if(parent.clientWidth < 992) {
			if((parent.clientWidth / parent.clientHeight * 100) < 79.929) {
				iframe.style.width = parent.clientHeight * 0.8 + 'px';
				iframe.style.height = '100%';
			} else {
				iframe.style.width = '100%';
				iframe.style.height = parent.clientWidth * 1.25 + 'px';
			}
		} else {
			iframe.style.width = parent.clientHeight * 1.8 + 'px';
			iframe.style.height = '100%';
		}
		window.addEventListener('resize', () => {
			if(parent.clientWidth > 1282) {
				iframe.style.width = '100%';
				iframe.style.height = parent.clientWidth * 0.57 + 'px';
			} else if(parent.clientWidth < 992) {
				if((parent.clientWidth / parent.clientHeight * 100) < 79.929) {
					iframe.style.width = parent.clientHeight * 0.8 + 'px';
					iframe.style.height = '100%';
				} else {
					iframe.style.width = '100%';
					iframe.style.height = parent.clientWidth * 1.25 + 'px';
				}
			} else {
				iframe.style.width = parent.clientHeight * 1.8 + 'px';
				iframe.style.height = '100%';
			}
		})
	}

	
	let youtubeVideos = document.querySelectorAll('[data-youtube-id]');
	if (youtubeVideos.length) {
		youtubeVideos.forEach(video => {
			let videoContainer = document.createElement('div');
			video.append(videoContainer);
			let videoId = video.dataset.youtubeId;
			let img = video.querySelector('img');

			if(document.documentElement.clientWidth < 992) {
				if(video.dataset.youtubeMobileId.trim()) {
					videoId = video.dataset.youtubeMobileId;
				}
			}
			let player = new YT.Player(videoContainer, {
				height: 'auto',
				width: 'auto',
				videoId: videoId,
				playerVars: {
					autoplay: 1,
					loop: 1,
					playlist: videoId,
					controls: 0,
					enablejsapi: 1,
				},
				events: {
					onReady: (e) => {
						e.target.mute();
						e.target.playVideo();

						if(img) {
							img.style.opacity = 0;
						}
					}
				}
			});
		})
	}



	function setMobileVideoForBanner() {
		let videos = document.querySelectorAll('[data-media-mobile]');
		if(videos.length) {
			videos.forEach(video => {
				let url = video.dataset.mediaMobile;
				Array.from(video.children).forEach(item => {
					item.setAttribute('src', url);
				})
	
				video.load();
			})
		}
	}

	if(document.documentElement.clientWidth < 992) {
		setMobileVideoForBanner()
	}

	let fancyboxYoutubeLinks = document.querySelectorAll('[data-fancybox-youtube]');
	if(fancyboxYoutubeLinks.length) {
		fancyboxYoutubeLinks.forEach(link => {
			let id = link.getAttribute('href');
			if(/https:\/\/www\.youtube\.com/i.test(id)) return;
			link.setAttribute('href', `https://www.youtube.com/watch?v=${id}`)
		})
	}

	let fancyboxVimeoLinks = document.querySelectorAll('[data-fancybox-vimeo]');
	if(fancyboxVimeoLinks.length) {
		fancyboxVimeoLinks.forEach(link => {
			let id = link.getAttribute('href');
			if(/https:\/\/vimeo\.com\//i.test(id)) return;
			link.setAttribute('href', `https://vimeo.com/${id}`)
		})
	}
};
	// //let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
// let forms = document.querySelectorAll('form');
// if (forms.length > 0) {
// 	for (let index = 0; index < forms.length; index++) {
// 		const el = forms[index];
// 		el.addEventListener('submit', form_submit);
// 	}
// }
// function form_submit(e) {
// 	let btn = event.target;
// 	let form = btn.closest('form');
// 	let message = form.getAttribute('data-message');
// 	let error = form_validate(form);
// 	if (error == 0) {
// 		//SendForm
// 		form_clean(form);
// 		if (message) {
// 			popup_open('message-' + message);
// 			e.preventDefault();
// 		}
// 	} else {
// 		let form_error = form.querySelectorAll('._error');
// 		if (form_error && form.classList.contains('_goto-error')) {
// 			_goto(form_error[0], 1000, 50);
// 		}
// 		event.preventDefault();
// 	}
// }
// function form_validate(form) {
// 	let error = 0;
// 	let form_req = form.querySelectorAll('._req');
// 	if (form_req.length > 0) {
// 		for (let index = 0; index < form_req.length; index++) {
// 			const el = form_req[index];
// 			if (!_is_hidden(el)) {
// 				error += form_validate_input(el);
// 			}
// 		}
// 	}
// 	return error;
// }
// function form_validate_input(input) {
// 	let error = 0;
// 	let input_g_value = input.getAttribute('data-value');

// 	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
// 		if (input.value != input_g_value) {
// 			let em = input.value.replace(" ", "");
// 			input.value = em;
// 		}
// 		if (email_test(input) || input.value == input_g_value) {
// 			form_add_error(input);
// 			error++;
// 		} else {
// 			form_remove_error(input);
// 		}
// 	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
// 		form_add_error(input);
// 		error++;
// 	} else {
// 		if (input.value == '' || input.value == input_g_value) {
// 			form_add_error(input);
// 			error++;
// 		} else {
// 			form_remove_error(input);
// 		}
// 	}
// 	return error;
// }
// function form_add_error(input) {
// 	input.classList.add('_error');
// 	input.parentElement.classList.add('_error');

// 	let input_error = input.parentElement.querySelector('.form__error');
// 	if (input_error) {
// 		input.parentElement.removeChild(input_error);
// 	}
// 	let input_error_text = input.getAttribute('data-error');
// 	if (input_error_text && input_error_text != '') {
// 		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
// 	}
// }
// function form_remove_error(input) {
// 	input.classList.remove('_error');
// 	input.parentElement.classList.remove('_error');

// 	let input_error = input.parentElement.querySelector('.form__error');
// 	if (input_error) {
// 		input.parentElement.removeChild(input_error);
// 	}
// }
// function form_clean(form) {
// 	let inputs = form.querySelectorAll('input,textarea');
// 	for (let index = 0; index < inputs.length; index++) {
// 		const el = inputs[index];
// 		el.parentElement.classList.remove('_focus');
// 		el.classList.remove('_focus');
// 		el.value = el.getAttribute('data-value');
// 	}
// 	let checkboxes = form.querySelectorAll('.checkbox__input');
// 	if (checkboxes.length > 0) {
// 		for (let index = 0; index < checkboxes.length; index++) {
// 			const checkbox = checkboxes[index];
// 			checkbox.checked = false;
// 		}
// 	}
// 	let selects = form.querySelectorAll('select');
// 	if (selects.length > 0) {
// 		for (let index = 0; index < selects.length; index++) {
// 			const select = selects[index];
// 			const select_default_value = select.getAttribute('data-default');
// 			select.value = select_default_value;
// 			select_item(select);
// 		}
// 	}
// }

// let viewPass = document.querySelectorAll('.form__viewpass');
// for (let index = 0; index < viewPass.length; index++) {
// 	const element = viewPass[index];
// 	element.addEventListener("click", function (e) {
// 		if (element.classList.contains('_active')) {
// 			element.parentElement.querySelector('input').setAttribute("type", "password");
// 		} else {
// 			element.parentElement.querySelector('input').setAttribute("type", "text");
// 		}
// 		element.classList.toggle('_active');
// 	});
// }


//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.which == 27) {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="????????????" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				original.value = select_option_value;
				select_option.style.display = 'none';

				let event = new Event("change", {bubbles: true}); 
				original.dispatchEvent(event);
			}
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}

//Placeholers
let inputs = document.querySelectorAll('input');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];

			if (input.classList.contains('_mask')) {
				//'+7(999) 999 9999'
				//'+38(999) 999 9999'
				//'+375(99)999-99-99'
				let maskValue = input.dataset.mask;
				input.classList.add('_mask');
				Inputmask('+1(999) 999 9999', {
					//"placeholder": '',
					clearIncomplete: true,
					clearMaskOnLostFocus: true,
					onincomplete: function () {
						//input_clear_mask(input, input_g_value);
					}
				}).mask(input);
			}


			//const input_g_value = input.getAttribute('data-value');
			//input_placeholder_add(input);
			// if (input.value != '' && input.value != input_g_value) {
			// 	input_focus_add(input);
			// }
			// input.addEventListener('focus', function (e) {
			// 	if (input.value == input_g_value) {
			// 		input_focus_add(input);
			// 		input.value = '';
			// 	}
			// 	if (input.getAttribute('data-type') === "pass") {
			// 		input.setAttribute('type', 'password');
			// 	}
			// 	if (input.classList.contains('_date')) {
			// 		/*
			// 		input.classList.add('_mask');
			// 		Inputmask("99.99.9999", {
			// 			//"placeholder": '',
			// 			clearIncomplete: true,
			// 			clearMaskOnLostFocus: true,
			// 			onincomplete: function () {
			// 				input_clear_mask(input, input_g_value);
			// 			}
			// 		}).mask(input);
			// 		*/
			// 	}
			// 	if (input.classList.contains('_phone')) {
			// 		//'+7(999) 999 9999'
			// 		//'+38(999) 999 9999'
			// 		//'+375(99)999-99-99'
			// 		input.classList.add('_mask');
			// 		Inputmask("+375 (99) 9999999", {
			// 			//"placeholder": '',
			// 			clearIncomplete: true,
			// 			clearMaskOnLostFocus: true,
			// 			onincomplete: function () {
			// 				input_clear_mask(input, input_g_value);
			// 			}
			// 		}).mask(input);
			// 	}
			// 	if (input.classList.contains('_digital')) {
			// 		input.classList.add('_mask');
			// 		Inputmask("9{1,}", {
			// 			"placeholder": '',
			// 			clearIncomplete: true,
			// 			clearMaskOnLostFocus: true,
			// 			onincomplete: function () {
			// 				input_clear_mask(input, input_g_value);
			// 			}
			// 		}).mask(input);
			// 	}
			// 	form_remove_error(input);
			// });
			// input.addEventListener('blur', function (e) {
			// 	if (input.value == '') {
			// 		input.value = input_g_value;
			// 		input_focus_remove(input);
			// 		if (input.classList.contains('_mask')) {
			// 			input_clear_mask(input, input_g_value);
			// 		}
			// 		if (input.getAttribute('data-type') === "pass") {
			// 			input.setAttribute('type', 'text');
			// 		}
			// 	}
			// });
			// if (input.classList.contains('_date')) {
			// 	datepicker(input, {
			// 		customDays: ["????", "????", "????", "????", "????", "????", "????"],
			// 		customMonths: ["??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????"],
			// 		formatter: (input, date, instance) => {
			// 			const value = date.toLocaleDateString()
			// 			input.value = value
			// 		},
			// 		onSelect: function (input, instance, date) {
			// 			input_focus_add(input.el);
			// 		}
			// 	});
			// }
		}
	}
}
// function input_placeholder_add(input) {
// 	const input_g_value = input.getAttribute('data-value');
// 	if (input.value == '' && input_g_value != '') {
// 		input.value = input_g_value;
// 	}
// }
// function input_focus_add(input) {
// 	input.classList.add('_focus');
// 	input.parentElement.classList.add('_focus');
// }
// function input_focus_remove(input) {
// 	input.classList.remove('_focus');
// 	input.parentElement.classList.remove('_focus');
// }
// function input_clear_mask(input, input_g_value) {
// 	input.inputmask.remove();
// 	input.value = input_g_value;
// 	input_focus_remove(input);
// }

// ==  QUANTITY =====================================================
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}
// == // QUANTITY =====================================================

// == PRICE SLIDER =====================================================
let priceSlider = document.querySelector('.price-filter');

if(priceSlider) {
	let inputNumFrom = document.getElementById('priceStart');
	let inputNumTo = document.getElementById('priceEnd');
	let value = document.querySelector('.values-price-filter');

	let min = value.dataset.min;
	let max = value.dataset.max;
	let numStart = value.dataset.start;
	let numEnd = value.dataset.end;
	noUiSlider.create(priceSlider, {
		start: [+numStart, +numEnd],  
		connect: true,
		tooltips:[wNumb({decimals: 0, thousand: ','}) , wNumb({decimals: 0, thousand: ','})], 
		range: {
			'min': [+min],
			'1%': [100,100],
			'max': [+max],
		}
	});

	priceSlider.noUiSlider.on('update', function (values, handle) {

	    var value = values[handle];

	    if (handle) {
	        inputNumTo.value = Math.round(value);
	    } else {
	        inputNumFrom.value = Math.round(value);
	    }
	});

	inputNumTo.onchange = function() {
		setPriceValues()
	}

	inputNumFrom.onchange = function() {
		setPriceValues()
	}

	function setPriceValues() {
		let priceStartValue;
		let priceEndValue;
		if(inputNumFrom.value != '') {
			priceStartValue = inputNumFrom.value;
		}

		if(inputNumTo.value != '') {
			priceEndValue = inputNumTo.value;
		}

		  priceSlider.noUiSlider.set([priceStartValue, priceEndValue])
	}
}

// == // PRICE SLIDER =====================================================;
	// === Burger Handler =====================================================================
let header = document.querySelector('.header');

let _slideDown2 = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = (document.documentElement.clientHeight - header.clientHeight); //target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = `calc(100vh - ${header.clientHeight}px)`;
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle2 = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown2(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================
function burgerBtnAnimation(e) {
	$('.burger span:nth-child(1)').toggleClass('first');
	$('.burger span:nth-child(2)').toggleClass('second');
	$('.burger span:nth-child(3)').toggleClass('third');
	$('.burger span:nth-child(4)').toggleClass('fourth');
	let classNameElem = document.querySelector('.burger').dataset.activel;
	document.querySelector(`.${classNameElem}`).classList.toggle('open');
	document.body.classList.toggle('lock');
	_slideToggle2(document.querySelector(`.${classNameElem}`));
}
$('.burger').click((e) => burgerBtnAnimation(e));
// === Burger Handler =====================================================================;
	(function checkboxHandler() {
	let $checkboxWrap = document.querySelectorAll('.checkbox-wrap');
	if($checkboxWrap.length) {
		$checkboxWrap.forEach((item, index) => {
			let input = item.querySelector('input[type="checkbox"]');
			input.checked = true;
			item.querySelector('.checkbox-wrap__label').setAttribute('for', `_form${index}`)
			input.id = `_form${index}`;
			
			if(input.checked) {
				item.classList.add('_is-checked');
			}
			
			input.addEventListener('click', () => {
				if(input.checked) {
					item.classList.add('_is-checked');
				} else {
					item.classList.remove('_is-checked');
				}
				
			})
		})
	}
})();;
	// ==== Popup form handler====

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0) {
	for(let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if(curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function(e) {
			if(!e.target.closest('.popup_content')) {
				popupClose(e.target.closest('.popup'));
			}
		});

	}
}

function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		popupActive.classList.remove('open');
		if(doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
	let targetPadding = document.querySelectorAll('._lp');
	if(targetPadding.length) {
		for (let index = 0; index < targetPadding.length; index++) {
			const el = targetPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	if(lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	let targetPadding = document.querySelectorAll('._lp');

	setTimeout(function() {
		if(targetPadding.length) {
			for (let index = 0; index < targetPadding.length; index++) {
				const el = targetPadding[index];
				el.style.paddingRight = '0px';
			}
		}

		for( let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function() { 
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if(e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

// === Polyfill ===
	(function() {
		if(!Element.prototype.closest) {
			Element.prototype.closest = function(css) {
				var node = this;
				while(node) {
					if(node.matches(css)) return node;
					else node == node.parentElement;
				}
				return null;
			};
		}
	})();

	(function() {
		if(!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.mozMatchesSelector;
		}
	})();
// === AND Polyfill ===;
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
};
	{
	const slider = document.querySelector('.result__slider');
	if(slider) {
		if(!slider.closest('.result_v2')) {
			let mySwiper;

			function mobileSlider() {
				if(document.documentElement.clientWidth < 992 && slider.dataset.mobile == 'false') {
					mySwiper = new Swiper(slider, {
						slidesPerView: 1,
						speed: 600,
						loop: true,
						// autoplay: {
						//     delay: 3000,
						//     disableOnInteraction: false,
						// },
						navigation: {
							nextEl: slider.querySelector('.result__btn-next'),
							prevEl: slider.querySelector('.result__btn-prev'),
						},
					});
	
					slider.dataset.mobile = 'true';
				}
	
				if(document.documentElement.clientWidth > 991.98) {
					slider.dataset.mobile = 'false';
	
					if(slider.classList.contains('swiper-container-initialized')) {
						mySwiper.destroy();
					}
				}
			}
	
			mobileSlider();
	
			window.addEventListener('resize', () => {
				mobileSlider();
			})
		}
	}

};
	{
    let testimonials = document.querySelectorAll('.testimonial');
    if(testimonials.length) {
        testimonials.forEach(testimonial => {
            let imagesSlider = testimonial.querySelector('.testimonial__images');
            let slider = testimonial.querySelector('.testimonial__body');

            if(imagesSlider && slider) {
                let dataImagesSlider = new Swiper(imagesSlider, {
                    effect: 'fade',
                    observer: true,
                    observeParents: true,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    speed: 800,
                    loop: true,
                    preloadImages: false,
                    lazy: {
                    	loadPrevNext: true,
                    },
                });

                let dataSlider = new Swiper(slider, {
                    autoplay: {
                        delay: 6000,
                        disableOnInteraction: false,
                    },
                    observer: true,
                    observeParents: true,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    autoHeight: true,
                    loop: true,
                    speed: 800,
                    navigation: {
                        nextEl: slider.querySelector('.testimonial__btn-next'),
                        prevEl: slider.querySelector('.testimonial__btn-prev'),
                    },
                });

                dataSlider.controller.control = dataImagesSlider;
                dataImagesSlider.controller.control = dataSlider;
            }
        })
    }
};
	{
    let testimonialSlider = document.querySelector('.testimonial-text__slider');
    if(testimonialSlider) {
        let slider = new Swiper(testimonialSlider.querySelector('.swiper-container'), {
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 20,
            autoHeight: true,
            speed: 800,
            // Dotts
            pagination: {
            	el: testimonialSlider.querySelector('.swiper-pagination'),
            	clickable: true,
            },
        });
    }
};
	//RATING
$('.rating.edit .star').hover(function () {
    var block = $(this).parents('.rating');
    block.find('.rating__activeline').css({ width: '0%' });
    var ind = $(this).index() + 1;
    var linew = ind / block.find('.star').length * 100;
    setrating(block, linew);
}, function () {
    var block = $(this).parents('.rating');
    block.find('.star').removeClass('active');
    var ind = block.find('input').val();
    var linew = ind / block.find('.star').length * 100;
    setrating(block, linew);
});
$('.rating.edit .star').click(function (event) {
    var block = $(this).parents('.rating');
    var re = $(this).index() + 1;
    block.find('input').val(re);
    var linew = re / block.find('.star').length * 100;
    setrating(block, linew);
});
$.each($('.rating'), function (index, val) {
    var ind = $(this).find('input').val();
    var linew = ind / $(this).parent().find('.star').length * 100;
    setrating($(this), linew);
});
function setrating(th, val) {
    th.find('.rating__activeline').css({ width: val + '%' });
};
	{
	const slider = document.querySelector('.partners__list');
	if(slider) {
		let mySwiper;

		function mobileSlider() {
			if(document.documentElement.clientWidth <= 768 && slider.dataset.mobile == 'false') {
				mySwiper = new Swiper(slider, {
					slidesPerView: 'auto',
					freeMode: true,
					speed: 600,
				});

				slider.dataset.mobile = 'true';

				//mySwiper.slideNext(0);
			}

			if(document.documentElement.clientWidth > 767.98) {
				slider.dataset.mobile = 'false';

				if(slider.classList.contains('swiper-container-initialized')) {
					mySwiper.destroy();
				}
			}
		}

		mobileSlider();

		window.addEventListener('resize', () => {
			mobileSlider();
		})
	}

};
	{
    let previewBlocks = document.querySelectorAll('.preview-block');
    if(previewBlocks.length) {
        previewBlocks.forEach(previewBlock => {
            let slider = previewBlock.querySelector('.preview-block__slider');
            let top = previewBlock.querySelector('.preview-block__top');
            let sliderChildren = previewBlock.querySelector('.preview-block__slider .swiper-wrapper').children;
            let dataSlider;
            let dataSliderBottom;

            if(sliderChildren.length > 2) {
                moveTwoFirstSliderChildrenToTop(top, sliderChildren);
            }

            if(slider) {
                dataSlider = new Swiper(slider.querySelector('.swiper-container'), {
                    observer: true,
                    observeParents: true,
                    speed: 800,
                    
                    loop: true,
                    watchSlidesVisibility: true,
                    // Arrows
                    navigation: {
                        nextEl: slider.querySelector('.preview-block__btn-next'),
                        prevEl: slider.querySelector('.preview-block__btn-prev'),
                    },
                    breakpoints: {
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 11,
                            autoHeight: true,
                            centeredSlides: false,
                           // loop: false,
                        },
                        768: {
                            slidesPerView: 'auto',
                            spaceBetween: 30,
                            centeredSlides: true,
                        },
                    },
                });

                if(document.documentElement.clientWidth < 768) {
                    createSlider();
                }
        
                function createSlider() {
                   
                    let container = slider;
                    let mainSliderChilds = [...slider.querySelector('.swiper-container .swiper-wrapper').children]
                        .filter(i => !i.classList.contains('swiper-slide-duplicate'));
                    let hulfChilds = mainSliderChilds.slice(Math.floor(mainSliderChilds.length / 2));
                    
                    let slider2 = document.createElement('div');
                    slider2.className = "top-slider swiper-container";
                    slider2.innerHTML = '<div class="swiper-wrapper"></div>';
                    slider2.firstChild.append(...hulfChilds);
        
                    dataSlider.update();
                    container.prepend(slider2);
        
                    dataSliderBottom = new Swiper(slider2, {
                        observer: true,
                        observeParents: true,
                        speed: 800,
                        
                        loop: true,
                        watchSlidesVisibility: true,
                        // Arrows
                        navigation: {
                            nextEl: slider.querySelector('.preview-block__btn-next'),
                            prevEl: slider.querySelector('.preview-block__btn-prev'),
                        },
                        breakpoints: {
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 11,
                                autoHeight: true,
                                centeredSlides: false,
                                //loop: false,
                            },
                            768: {
                                slidesPerView: 'auto',
                                spaceBetween: 30,
                                centeredSlides: true,
                            },
                        },
                        
                    });
        
                    dataSlider.controller.control = dataSliderBottom;
                    dataSliderBottom.controller.control = dataSlider;
                        
                }

                $('img.img-svg').each(function(){
                    var $img = $(this);
                    var imgClass = $img.attr('class');
                    var imgURL = $img.attr('src');
                    $.get(imgURL, function(data) {
                      var $svg = $(data).find('svg');
                      if(typeof imgClass !== 'undefined') {
                        $svg = $svg.attr('class', imgClass+' replaced-svg');
                      }
                      $svg = $svg.removeAttr('xmlns:a');
                      if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                      }
                      $img.replaceWith($svg);
                    }, 'xml');
                  });
            }
        })
    }

    function moveTwoFirstSliderChildrenToTop(wrapper, children) {
        let items;
        if(document.documentElement.clientWidth > 991.98) {
            items = Array.from(children).slice(0, 2);
        } else {
            items = Array.from(children).slice(0, 1);
        }

        wrapper.append(...items);

    }

    if(document.documentElement.clientWidth < 768) {
        let titles = document.querySelectorAll('.news-card__title');
        if(titles.length) {
            titles.forEach((title, index) => {
                if(index > 0) {
                    cropText(title, 30);
                }
            })
        }
        
    }
};
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
};
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
};
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
};
	class Quiz {
    constructor(parentEl) {
        this.parentEl = parentEl;
        this.btnBack = parentEl.querySelector('.quiz__btn-back');
        this.state = {};

        this._init();
    }

    _init() {
        this._createState();

        this._setActive(this.state['0'])

        this._toggleShowBtnBack(false);

        this.btnBack.addEventListener('click', this.prev.bind(this));
    }

    _createState() {
        let firstItems = this.parentEl.querySelectorAll('.quiz__body > .quiz__item');
        firstItems.forEach((item, index) => {
            let children = item.querySelectorAll('.quiz__item');

            this.state[index] = {
                el: item,
                active: false,
                children: children.length 
                ? { ...Array.from(children).map((item, index) => {
                    return {
                        el: item,
                        active: false,
                    }
                })}
                : null,
            };
        })
    }

    _toggleShowBtnBack(state = false) {
        if(state) {
            this.btnBack.classList.add('show'); 
        } else {
            this.btnBack.classList.remove('show'); 
        }
    }

    _setActive(prop) {
        prop.el.classList.add('active');
        prop.active = true;

        if(prop.children) {
            this._setActive(prop.children[0]);
        }
    }

    _removeActive(prop) {
        prop.el.classList.remove('active');
        prop.active = false;

        if(prop.children) {
            this._removeActive(prop.children[0]);
        }
    }

    next() {
        setTimeout(() => {
            for(let key in this.state) {
                if(this.state[key].active) {
                    if(this.state[key].children) {
                        let items = this.state[key].children;
    
                        for(let key in items) {
                            if(key != Object.keys(items).length - 1) {
                                if(items[key].active) {
                                    this._removeActive(items[key]);
                                    this._setActive(items[+key + 1]);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }, 100);
    }

    prev() {
        for(let key in this.state) {
    
            if(this.state[key].active) {
                if(this.state[key].children  && this.state[key].children[0].active) {
                    this._removeActive(this.state[key]);
                    this._removeActive(this.state[key].children[0]);
                    this._setActive(this.state[0]);
                    this._toggleShowBtnBack(false);
                } else if(this.state[key].children) {
                    let items = this.state[key].children;

                    for(let key in items) {
                        if(items[key].active) {
                            this._removeActive(items[key]);
                            this._setActive(items[+key - 1]);
                            break;
                        }
                    }
                }
            }
        }
    }

    toStart() {
        this._toggleShowBtnBack(false);

        for(let key in this.state) {
            if(key == 0) {
                this._setActive(this.state[key]);
            } else if(this.state[key].active) {
                this._removeActive(this.state[key]);

                if(this.state[key].children) {
                    let items = this.state[key].children;

                    for(let key in items) {
                        if(items[key].active) {
                            this._removeActive(items[key]);
                        }
                    }
                }
            }
        }
    }

    showMessage() {
        this._toggleShowBtnBack(false);

        for(let key in this.state) {
            if(key == Object.keys(this.state).length - 1) {
                this._setActive(this.state[key]);
            } else if(this.state[key].active) {
                this._removeActive(this.state[key]);

                if(this.state[key].children) {
                    let items = this.state[key].children;

                    for(let key in items) {
                        if(items[key].active) {
                            this._removeActive(items[key]);
                        }
                    }
                }
            }
        }
    }

    setWay(value) {
        setTimeout(() => {
            for(let key in this.state) {
                if(key === value.toString()) {
                    this._setActive(this.state[key]);
                } else {
                    this._removeActive(this.state[key]);
                }
            }

            if(value != 0 && value != Object.keys(this.state).length - 1) {
                this._toggleShowBtnBack(true);
            }
    
        }, 100);

    }
}


let quizBlock = document.querySelector('.quiz');
if (quizBlock) {
    window.quiz = new Quiz(quizBlock);

    function setArror(el, text = 'Required!') {
        let parent = el.parentElement;
        if (!parent.classList.contains('error')) {
            parent.classList.add('error');
            parent.insertAdjacentHTML('beforeend', `<div class="error-text">${text}</div>`)
        }
    }
    
    function removeError(el) {
        let parent = el.parentElement;
        parent.classList.remove('error');
        let div = parent.querySelector('.error-text');
        if (div) {
            div.remove();
        }
    }
    

    // (function quizDateHandler() {
    //     let inputsHiddenDate = quizBlock.querySelectorAll('.date-input-wrap');
    //     if (inputsHiddenDate.length) {
    //         inputsHiddenDate.forEach(inputWrap => {
    //             let input = inputWrap.firstElementChild;

    //             // datepicker(input, {
    //             //     formatter: (input, date, instance) => {
    //             //         const value = date.toLocaleDateString();
    //             //         input.value = value;

    //             //         let parent = inputWrap.closest('.item-quiz__answers');
    //             //         let year = parent.querySelector('._year');
    //             //         let month = parent.querySelector('._month');
    //             //         let day = parent.querySelector('._day');

    //             //         year.value = date.getFullYear();
    //             //         month.value = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1);
    //             //         day.value = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate();

    //             //         quiz.next();
    //             //     },
    //             //     alwaysShow: true,
    //             //     onSelect: function (input, instance, date) {
    //             //         let parent = inputWrap.closest('.item-quiz__answers');
    //             //         let datapicer = parent.querySelector('.qs-datepicker-container');
    //             //         datapicer.classList.remove('show');
    //             //     }
    //             // });

    //             // inputWrap.addEventListener('click', () => {
    //             //     let parent = inputWrap.closest('.item-quiz__answers');
    //             //     let datapicer = parent.querySelector('.qs-datepicker-container');
    //             //     datapicer.classList.add('show');
    //             // })

    //         })
    //     }
    // })()

    let selecDateButtons = quizBlock.querySelectorAll('.select-date');
    if(selecDateButtons.length) {
        selecDateButtons.forEach(button => {
            let form = button.closest('form');
            let parentItem = button.closest('.item-quiz');
            let selects = parentItem.querySelectorAll('select');

            selects.forEach(select => {
                let parent = select.closest('.select');
                parent.addEventListener('click', () => {
                    removeError(select);
                })
            })

            button.addEventListener('click', (e) => {
                e.preventDefault();

                let result = Array.from(selects).map(select => {
                    if(!select.value.trim()) {
                        setArror(select);
                        return false;
                    } else {
                        return true;
                    }
                }).every(i => i === true);

                if(result) {
                    quiz.next();
                }
            })
        })
    }

    let startInputs = quizBlock.querySelectorAll('input[name="start-q"]');
    if(startInputs.length) {
        startInputs.forEach(input => {
            input.addEventListener('click', () => {
                quiz.setWay(input.value);
            })
        })
    }

    let otherInputsRadio = quizBlock.querySelectorAll('input[type="radio"]:not([name="start-q"])');
    if(otherInputsRadio.length) {
        otherInputsRadio.forEach(input => {
            input.addEventListener('click', () => {
                quiz.next();
            })
        })
    }

    let submitButtons = quizBlock.querySelectorAll('button[type="submit"]');
    if(submitButtons.length) {
        submitButtons.forEach(button => {

            let form = button.closest('form');
            let parentItem = button.closest('.item-quiz');
            let inputs = parentItem.querySelectorAll('input[type="text"]');

            if(inputs.length) {
                inputs.forEach(input => {
                    input.addEventListener('focus', () => {
                        removeError(input);
                    })
                })
            }

            button.addEventListener('click', (e) => {
                e.preventDefault();

                let result = Array.from(inputs).map(input => {
                    if(!input.value.trim()) {
                        setArror(input);
                        return false;
                    } else {
                        return true;
                    }
                }).every(i => i === true);

                if(result) {
                    let event = new Event('submit', {bubbles: true});
                    form.dispatchEvent(event);
                }
            })
        })
    }
}

;
	
	
	{
    const slider = document.querySelector('.about-us-block__slider');
    if (slider) {
        let mySwiper;

        let hasMode = !!slider.closest('.about-us-block_v2');

        function mobileSlider() {
            if (document.documentElement.clientWidth > 767.98 && slider.dataset.mobile == 'false') {
                mySwiper = new Swiper(slider.querySelector('.swiper-container'), {
                    observer: true,
                    observeParents: true,

                    speed: 800,
                    watchSlidesVisibility: true,
                    // Arrows
                    navigation: {
                        nextEl: slider.querySelector('.about-us-block__slide-btn-next'),
                        prevEl: slider.querySelector('.about-us-block__slide-btn-prev'),
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 0,
                        },
                        1920: {
                            slidesPerView: hasMode ? 3 : 4,
                            spaceBetween: 0,
                        },
                    },
                });

                slider.dataset.mobile = 'true';

                //mySwiper.slideNext(0);
            }

            if (document.documentElement.clientWidth < 768) {
                slider.dataset.mobile = 'false';

                if (slider.classList.contains('swiper-container-initialized')) {
                    mySwiper.destroy();
                }
            }
        }

        mobileSlider();

        window.addEventListener('resize', () => {
            mobileSlider();
        })

        let wrapper = slider.querySelector('.swiper-wrapper');

        if (document.documentElement.clientWidth < 768) {
            let arr = Array.from(wrapper.children);
            if (arr.length > 3) {
                arr = arr.slice(3, arr.length);
                let div = document.createElement('div');
                div.className = '_toggleWrap';
                div.append(...arr);

                wrapper.append(div);

                // let btn = document.querySelector('.about-us-block__mobile-btn');
                // if(btn) {
                //     btn.addEventListener('click', function () {
                //         _slideDown(div);
                //         this.style.display = 'none';
                //     })
                // }
            }

        }
    }

    let bg = document.querySelector('.about-us-block__bg img');
    let items = document.querySelectorAll('.about-us-block__slider .swiper-slide');
    if (bg && items.length) {
        changeImgOnHoverItem(bg, items);
    }

}
;
	let bg = document.querySelector('.related-pages__bg img');
    let items = document.querySelectorAll('.related-pages__link');
    if( bg && items.length) {
        changeImgOnHoverItem(bg, items);
    };

	
	
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




