// слайдер
const slider = () => {
	// элементысао страницы
	const slider = document.querySelector('.portfolio-content'),
		dots = document.querySelector('.portfolio-dots');
	let slide = document.querySelectorAll('.portfolio-item'),
		dot =  document.querySelectorAll('.dot');
	// добавляем точки для управления слайдами в зависимости от количества слайдов на странице
	for (let i = 0; i < slide.length; i++) {
		dots.insertAdjacentHTML('beforeend', '<li class="dot"></li>');
		const firstDot = document.querySelectorAll('.dot');
		firstDot[0].classList.add('dot-active');
	}

	let currentSlide = 0,
		interval;
	// к предыдущему слайду
	const prevSlide = (elem, index, className) => {
		elem[index].classList.remove(className);
	};
	// к следующему слайду
	const nextSlide = (elem, index, className) => {
		elem[index].classList.add(className);
	};
	// авто слайд-шоу
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
	// воспроизвести слайд-шоу
	const startSlide = (time = 2000) => {
		interval = setInterval(autoPlaySlide, time);
	};
	// остановить слайд-шоу
	const stopSlide = () => {
		clearInterval(interval);
	};
	// клики по кнопкам "листать вправо", "листать влево", "точкам" (для активных слайдов
	// добавляем класс активной) для управления сладами на странице
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
		//  условие, если дошли до последнего слайда (при перелистывании вправо), то вернуться к первому
		if (currentSlide >= document.querySelectorAll('.portfolio-item').length) {
			currentSlide = 0;
			// иначе (при перелистывании влево), вернуться к крайнему
		} else if (currentSlide < 0) {
			currentSlide = document.querySelectorAll('.portfolio-item').length - 1;
		}
		nextSlide(slide, currentSlide, 'portfolio-item-active');
		nextSlide(dot, currentSlide, 'dot-active');
	});
	// при наведении мыши на элементы управления слайдами останавливать слайд-шоу
	slider.addEventListener('mouseover', event => {
		if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
			stopSlide();
		}
	});
	// воспроизводить обратно слайд-шоу, когда мышь убрана с элементов управления слайдами
	slider.addEventListener('mouseout', event => {
		if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
			startSlide();
		}
	});
	startSlide(2000);
};

// экспорт данных
export default slider;
