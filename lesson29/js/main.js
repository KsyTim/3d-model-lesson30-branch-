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
		const updateClock = () => {
			const timer = getTimeRemaining();
			timerHours.textContent = timer.hours;
			timerMinutes.textContent = timer.minutes;
			timerSeconds.textContent = timer.seconds;
			let interval;
			if (timer.timeRemaining > 0) {
				interval = setInterval(updateClock, 1000);
			} else if (timer.timeRemaining <= 0) {
				clearInterval(interval);
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
				timerAction.textContent = 'Акция завершена';
			}
		};
		updateClock();
	}

	countTimer('07 March 2021');

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
			modal.addEventListener('click', event => {
				let target = event.target;
				if (target.classList.contains('popup-close')) {
					modal.style.display = 'none';
				} else {
					target = target.closest('.popup-content');
					if (!target) {
						modal.style.display = 'none';
					}
				}
			});
			document.addEventListener('keydown', event => {
				if (event.which === 27) {
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
	const calculator = (price = 100) => {
		const calc = document.getElementById('calc');
		const calcAreas = calc.querySelectorAll('input'),
			calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totalValue = document.getElementById('total');
		calcAreas.forEach(item => {
			item.addEventListener('input', event => {
				const target = event.target;
				const regNum = target.value.replace(/\D/g, '');
				target.value = regNum;
			});
		});

		const countSum = () => {
			let total = 0,
				countValue = 1,
				dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquare.value;
			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}
			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}
			if (typeValue && squareValue) {
				total = Math.round(price * typeValue * squareValue * countValue * dayValue);
			}


			const setValue = function(oldValue, newValue, operation, increaseBy, speed) {
				let interval = false;
				if (operation) {
					interval = setInterval(() => {
						if (oldValue.innerHTML >= newValue) {
							oldValue.innerHTML = newValue;
							clearInterval(interval);
						} else {
							oldValue.innerHTML = oldValue.innerHTML * 1 + increaseBy;
						}
					}, speed);
				} else {
					interval = setInterval(() => {
						if (oldValue.innerHTML <= newValue) {
							oldValue.innerHTML = newValue;
							clearInterval(interval);
						} else {
							oldValue.innerHTML = oldValue.innerHTML * 1 - increaseBy;
						}
					}, speed);
				}
			};
			const oldPrice = document.getElementById('total');
			if (+oldPrice.textContent < total) {
				setValue(totalValue, total, true, 100, .5);
			} else if (+oldPrice.textContent > total) {
				setValue(totalValue, total, false, 100, .5);
			}
		};

		calcBlock.addEventListener('change', event => {
			const target = event.target;
			if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
				countSum();
			}
		});
	};

	calculator(100);

	// валидация форм
	const formValidator = () => {
		const form = document.querySelectorAll('form');
		form.forEach(item => {
			item.querySelectorAll('input').forEach(item => {
				item.addEventListener('blur', event => {
					const target = event.target;
					function replaceUpper(match) {
						return match.toUpperCase();
					}
					function replaceLower(match) {
						return match.toLowerCase();
					}
					if (target.placeholder === 'Ваше сообщение') {
						let reg = target.value.replace(/[a-z+=)({*&$%#~^`<>№|\\})]/gi, '');
						reg = reg.replace(/ {2,}/g, ' ');
						reg = reg.replace(/^( *-* *)|( *-* *)$/g, '');
						target.value = reg;
					} else if (target.placeholder === 'Ваше имя') {
						let reg = target.value.replace(/[a-z0-9/.,\-+=_)({*&$%#@'"!~^:;?`<>№|\\})]/gi, '');
						reg = reg.replace(/ {2,}/g, ' ');
						reg = reg.replace(/^( *)|( *)$/g, '');
						target.value = reg;
					} else if (target.placeholder === 'E-mail' || target.placeholder === 'Ваш E-mail') {
						const reg = target.value.replace(/[а-яё0-9/, +=)({&$%#^:;?`<>№|\\})]/gi, '');
						target.value = reg;
					} else if (target.placeholder === 'Номер телефона' || target.placeholder === 'Ваш номер телефона') {
						const checkNumber = reg => {
							const firstDigit = reg.substr(0, 1);
							let inputValue = target.value;
							const result = inputValue.replace(/[a-zа-яё/.,\-=_)({*&$%#@'"!~^:;?`<>№|\\})]/gi, '');
							inputValue = result;
							if (inputValue.length < 11) {
								inputValue = '';
								return inputValue;
							} else {
								if (firstDigit === '+') {
									if (inputValue.substr(1).includes('+')) {
										inputValue = '';
										return inputValue;
									} else if (inputValue[1] !== '7') {
										inputValue = '';
										return inputValue;
									} else {
										inputValue = inputValue.substr(0, 12);
										return inputValue;
									}
								} else if (firstDigit === '7' || firstDigit === '8') {
									if (inputValue.substr(1).includes('+')) {
										inputValue = '';
										return inputValue;
									} else {
										inputValue = inputValue.substr(0, 11);
										return inputValue;
									}
								} else if (firstDigit !== '+' || firstDigit !== '7' || firstDigit !== '8') {
									inputValue = '';
									return inputValue;
								}
							}
						};
						const reg = target.value.replace(/[a-zа-яё/.,\-=_)({*&$%#@'"!~^:;?`<>№|\\})]/gi, '');
						const result = checkNumber(reg);
						target.value = result;
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
		});
	};
	formValidator();

	// send-ajax-form
	const sendForm = () => {
		const errorMessage = 'Что-то пошло не так...',
			successMessage = 'Спасибо! Мы скоро свяжемся с Вами!';

		const statusMessage = document.createElement('div');
		statusMessage.classList.add('status-message');
		statusMessage.style.cssText = 'font-size: 1.5rem; color: #fff;';
		document.body.addEventListener('submit', event => {
			event.preventDefault();
			if (event.target.tagName.toLowerCase() === 'form') {
				event.target.appendChild(statusMessage);
				const animationLoading = `
				<div class="sk-wave">
					<div class="sk-rect sk-rect-1"></div>
					<div class="sk-rect sk-rect-2"></div>
					<div class="sk-rect sk-rect-3"></div>
					<div class="sk-rect sk-rect-4"></div>
					<div class="sk-rect sk-rect-5"></div>
				</div>
				`;
				statusMessage.insertAdjacentHTML('beforeend', animationLoading);
				const formData = new FormData(event.target);
				const body = {};
				formData.forEach((val, key) => {
					body[key] = val;
				});
				const postData = body => fetch('./server.php', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json; charset=utf-8'
					},
					body: JSON.stringify(body)
				});
				const closePopup = () => {
					const timeout = setTimeout(closePopup, 2000);
					const status = document.querySelector('.status-message'),
						statusParent = status.closest('form').parentElement.parentElement.parentElement;
					if (statusMessage.textContent === '' && statusParent.className === 'popup') {
						statusParent.style.display = 'none';
					}
					if (statusParent.style.display === 'none') {
						clearTimeout(timeout);
					}
				};
				const clearOutputData = () => {
					const timeout = setTimeout(clearOutputData, 3000);
					if (statusMessage.textContent) {
						statusMessage.textContent = '';
						setTimeout(closePopup, 2000);
					} else if (statusMessage.textContent === '') {
						clearTimeout(timeout);
					}
				};
				const outputData = () => {
					statusMessage.textContent = successMessage;
					event.target.querySelectorAll('input').forEach(item => {
						item.value = '';
					});
					setTimeout(clearOutputData, 3000);
				};
				postData(body)
					.then(response => {
						if (response.status !== 200) {
							throw new Error('status network is not 200');
						}
						outputData();
					})
					.catch(error => {
						statusMessage.textContent = errorMessage;
						console.error(error);
					});
			}
		});
	};

	sendForm();
});
