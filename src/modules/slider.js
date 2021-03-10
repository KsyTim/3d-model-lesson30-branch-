const slider = () => {
	const slider = document.querySelector('.portfolio-content'),
		dots = document.querySelector('.portfolio-dots');
	let slide = document.querySelectorAll('.portfolio-item'),
		dot =  document.querySelectorAll('.dot');

	slide = document.querySelectorAll('.portfolio-item');
	for (let i = 0; i < slide.length; i++) {
		dots.insertAdjacentHTML('beforeend', '<li class="dot"></li>');
		const firstDot = document.querySelectorAll('.dot');
		firstDot[0].classList.add('dot-active');
	}

	let currentSlide = 0,
		interval;

	const prevSlide = (elem, index, className) => {
		elem[index].classList.remove(className);
	};

	const nextSlide = (elem, index, className) => {
		elem[index].classList.add(className);
	};

	const autoPlaySlide = () => {
		slide = document.querySelectorAll('.portfolio-item');
		dot =  document.querySelectorAll('.dot');
		prevSlide(slide, currentSlide, 'portfolio-item-active');
		prevSlide(dot, currentSlide, 'dot-active');
		currentSlide++;
		if (currentSlide >= slide.length) {
			currentSlide = 0;
		}
		nextSlide(slide, currentSlide, 'portfolio-item-active');
		nextSlide(dot, currentSlide, 'dot-active');
	};
	const startSlide = (time = 2000) => {
		interval = setInterval(autoPlaySlide, time);
	};
	const stopSlide = () => {
		clearInterval(interval);
	};
	slider.addEventListener('click', event => {
		event.preventDefault();
		slide = document.querySelectorAll('.portfolio-item');
		const target = event.target;
		if (!target.matches('.portfolio-btn, .dot')) {
			return;
		}
		prevSlide(slide, currentSlide, 'portfolio-item-active');
		prevSlide(dot, currentSlide, 'dot-active');
		if (target.matches('#arrow-right')) {
			currentSlide++;
		} else if (target.matches('#arrow-left')) {
			currentSlide--;
		} else if (target.matches('.dot')) {
			dot.forEach((elem, index) => {
				if (elem === target) {
					currentSlide = index;
				}
			});
		}
		if (currentSlide >= document.querySelectorAll('.portfolio-item').length) {
			currentSlide = 0;
		} else if (currentSlide < 0) {
			currentSlide = document.querySelectorAll('.portfolio-item').length - 1;
		}
		nextSlide(slide, currentSlide, 'portfolio-item-active');
		nextSlide(dot, currentSlide, 'dot-active');
	});
	slider.addEventListener('mouseover', event => {
		if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
			stopSlide();
		}
	});
	slider.addEventListener('mouseout', event => {
		if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
			startSlide();
		}
	});
	startSlide(2000);
};

export default slider;