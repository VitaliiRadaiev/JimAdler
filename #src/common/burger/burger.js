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
// === Burger Handler =====================================================================