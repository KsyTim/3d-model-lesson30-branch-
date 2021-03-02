window.addEventListener('DOMContentLoaded', () => {


	// таймер
	function countTimer(dDay) {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds'),
			timerAction = document.querySelector('.timer-action');

		function getTimeRemaining() {
			const dateStop = new Date(dDay).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 3600);
			function preNumber(num) {
				if (num < 10) {
					return `0${num}`;
				} else {
					return num;
				}
			}
			return {
				timeRemaining,
				hours: preNumber(hours),
				minutes: preNumber(minutes),
				seconds: preNumber(seconds),
			};
		}
		function updateClock() {
			const timer = getTimeRemaining();
			timerHours.textContent = timer.hours;
			timerMinutes.textContent = timer.minutes;
			timerSeconds.textContent = timer.seconds;

			if (timer.timeRemaining > 0) {
				setInterval(updateClock, 1000);
			} else if (timer.timeRemaining <= 0) {
				clearInterval(updateClock);
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
				timerAction.textContent = 'Акция завершена';
			}
		}
		updateClock();
	}

	countTimer('25 february 2021');


	//меню
	const toggleMenu = () => {
		let menu = document.querySelector('menu');
		const actionMenu = () => {
			menu.classList.toggle('active-menu');
		};
		const eventListener = () => {
			document.addEventListener('click', event => {
				const target = event.target,
					targetMenu = target.closest('.menu'),
					targetCloseBtn = target.closest('.close-btn'),
					targetMenuItem = target.closest('ul>li>a'),
					targetToServices = target.closest('[href="#service-block"'),
					width = document.documentElement.offsetWidth;
				if (width < 768) {
					menu = document.querySelector('menu');
					if (targetMenu !== null) {
						menu.style.transform = 'translateX(100%)';
					} else if (targetCloseBtn !== null) {
						menu.style.transform = 'translateX(-100%)';
					} else if (targetMenuItem !== null) {
						menu.style.transform = 'translateX(-100%)';
					} else if (menu.getAttribute('style') === 'transform: translateX(100%);') {
						menu.style.transform = 'translateX(-100%)';
					}
				} else {
					menu = document.querySelector('menu');
					if (targetMenu !== null) {
						actionMenu();
					} else if (targetCloseBtn !== null) {
						actionMenu();
					} else if (targetMenuItem !== null) {
						actionMenu();
						event.preventDefault();
						const id = target.getAttribute('href').substr(1);
						const scrollTo = document.getElementById(id);
						const elemPosition = scrollTo.getBoundingClientRect().top;
						window.scrollBy({
							top: elemPosition,
							behavior: 'smooth'
						});
					} else if (targetToServices !== null) {
						event.preventDefault();
						const id = document.querySelector('[href="#service-block"').getAttribute('href').substr(1);
						const scrollTo = document.getElementById(id);
						const elemPosition = scrollTo.getBoundingClientRect().top;
						window.scrollBy({
							top: elemPosition,
							behavior: 'smooth'
						});
					} else if (menu.className === 'active-menu') {
						actionMenu();
					}
				}
			});
		};
		eventListener();
	};
	toggleMenu();



	// модальное окно
	const toggleModal = () => {
		const modal = document.querySelector('.popup'),
			modalContent = document.querySelector('.popup-content'),
			modalBtn = document.querySelectorAll('.popup-btn'),
			closeModalBtn = document.querySelector('.popup-close');
		const openModal = () => {
			let count = 0;
			const height = document.documentElement.offsetHeight / 50;
			const openModal = setInterval(() => {
				count += 5;
				if ((count - 5) < height) {
					modalContent.style.top = count + 'px';
				} else if (count === height) {
					clearInterval(openModal);
				}
			}, 5);
		};
		const closeModal = () => {
			let count = 0;
			const height = document.documentElement.offsetHeight / 50;
			const closeModal = setInterval(() => {
				count += 5;
				if ((count - 5) < height) {
					const top = height - count;
					modalContent.style.top = top + 'px';
				} else if (count === height) {
					clearInterval(closeModal);
				}
			}, 5);
		};
		const width = document.documentElement.offsetWidth;
		if (width < 768) {
			modalBtn.forEach(elem => {
				elem.addEventListener('click', () => {
					modal.style.display = 'block';
				});
			});
			closeModalBtn.addEventListener('click', () => {
				modal.style.display = 'none';
			});
			modal.addEventListener('click', () => {
				modal.style.display = 'none';
			});
			document.addEventListener('keydown', e => {
				if (e.which === 27) {
					modal.style.display = 'none';
				}
			});
		} else {
			modalBtn.forEach(elem => {
				elem.addEventListener('click', () => {
					modal.style.display = 'block';
					openModal();
				});
			});
			modal.addEventListener('click', event => {
				let target = event.target;
				if (target.classList.contains('popup-close')) {
					modal.style.display = 'none';
					closeModal();
				} else {
					target = target.closest('.popup-content');
					if (!target) {
						modal.style.display = 'none';
						closeModal();
					}
				}
			});
			document.addEventListener('keydown', event => {
				if (event.which === 27) {
					modal.style.display = 'none';
					closeModal();
				}
			});
		}
	};

	toggleModal();



	// табы
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');
		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};
		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');
			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
	};

	tabs();



	// слайдер
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

	slider();


	// наша команда
	const ourTeam = () => {
		const ourTeam = document.getElementById('command');
		const member = ourTeam.querySelectorAll('.col-12');
		member.forEach(item => {
			item.addEventListener('mouseenter', event => {
				const target = event.target;
				const memberPhoto = target.querySelector('img');
				const memberPhotoSrc = memberPhoto.src;
				const memberPhotoData = memberPhoto.dataset.img;
				memberPhoto.src = memberPhotoData;
				memberPhoto.dataset.img = memberPhotoSrc;
			});
			item.addEventListener('mouseleave', event => {
				const target = event.target;
				const memberPhoto = target.querySelector('img');
				const memberPhotoSrc = memberPhoto.src;
				const memberPhotoData = memberPhoto.dataset.img;
				memberPhoto.src = memberPhotoData;
				memberPhoto.dataset.img = memberPhotoSrc;
			});
		});
	};

	ourTeam();


	// калькулятор
	const calculator = () => {
		const calc = document.getElementById('calc');
		const calcAreas = calc.querySelectorAll('input');
		calcAreas.forEach(item => {
			item.addEventListener('input', event => {
				const target = event.target;
				const regNum = target.value.replace(/\D/g, '');
				target.value = regNum;
			});
		});
	};

	calculator();

	// подвал
	const footerForm = () => {
		const footerForm = document.querySelector('.footer-form');
		const formInput = footerForm.querySelectorAll('input');
		formInput.forEach(item => {
			item.addEventListener('blur', event => {
				const target = event.target;
				function replaceUpper(match1) {
					return match1.toUpperCase();
				}
				function replaceLower(match1) {
					return match1.toLowerCase();
				}
				if (target.placeholder === 'Ваше имя' || target.placeholder === 'Ваше сообщение') {
					let reg = target.value.replace(/[a-z0-9/.,+=_)({*&$%#@'"!~^:;?`<>№|\\})]/gi, '');
					reg = reg.replace(/ {2,}/g, ' ');
					reg = reg.replace(/^( *-* *)|( *-* *)$/g, '');
					target.value = reg;
				} else if (target.placeholder === 'E-mail') {
					const reg = target.value.replace(/[а-яё0-9/, +=)({&$%#^:;?`<>№|\\})]/gi, '');
					target.value = reg;
				} else if (target.placeholder === 'Номер телефона') {
					const reg = target.value.replace(/[а-яёa-z/, +=_~{!*&$%#'."^:;?`<>№|\][\\}]/gi, '');
					target.value = reg;
				}
				if (target.placeholder === 'Ваше имя') {
					const str = target.value;
					const regFirst = str.replace(/([А-ЯЁа-яё]*)/g, replaceLower).substr(1);
					const regOther = str.replace(/([А-ЯЁа-яё]*)/g, replaceUpper).substr(0, 1);
					const reg =  regOther + regFirst;
					target.value = reg;
				}
			});
		});
	};

	footerForm();
});
