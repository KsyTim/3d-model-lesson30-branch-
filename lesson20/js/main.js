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
		const menu = document.querySelector('menu');
		const actionMenu = () => {
			menu.classList.toggle('active-menu');
		};
		const eventListener = () => {
			document.addEventListener('click', event => {
				const target = event.target,
					targetMenu = target.closest('.menu'),
					targetCloseBtn = target.closest('.close-btn'),
					targetMenuItem = target.closest('ul>li'),
					targetToServices = target.closest('[href="#service-block"'),
					width = document.documentElement.offsetWidth,
					notMenu = target.closest('menu.active-menu');
				if (width < 768) {
					if (targetMenu !== null) {
						menu.style.transform = 'translateX(100%)';
					} else if (targetCloseBtn !== null) {
						menu.style.transform = 'translateX(-100%)';
					} else if (targetMenuItem !== null) {
						menu.style.transform = 'translateX(-100%)';
					} else if (!notMenu) {
						menu.style.transform = 'translateX(-100%)';
					}
				} else {
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
					} else if (!notMenu) {
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

});
