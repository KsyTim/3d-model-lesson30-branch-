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
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItems = menu.querySelectorAll('ul>li');
		const actionMenu = () => {
			menu.classList.toggle('active-menu');
		};

		const width = document.documentElement.offsetWidth;
		if (width < 768) {
			btnMenu.addEventListener('click', () => {
				menu.style.transform = 'translateX(100%)';
			});
			closeBtn.addEventListener('click', () => {
				menu.style.transform = 'translateX(-100%)';
			});
			menuItems.forEach(elem => elem.addEventListener('click', () => {
				menu.style.transform = 'translateX(-100%)';
			}));
		} else {
			btnMenu.addEventListener('click', actionMenu);
			closeBtn.addEventListener('click', actionMenu);
			menuItems.forEach(elem => elem.addEventListener('click', event => {
				actionMenu();
				event.preventDefault();
				const id = elem.querySelector('a').getAttribute('href').substr(1);
				const scrollTo = document.getElementById(id);
				const elemPosition = scrollTo.getBoundingClientRect().top;
				window.scrollBy({
					top: elemPosition,
					behavior: 'smooth'
				});
			}));
			document.querySelector('[href="#service-block"').addEventListener('click',
				event => {
					event.preventDefault();
					const id = document.querySelector('[href="#service-block"').getAttribute('href').substr(1);
					const scrollTo = document.getElementById(id);
					const elemPosition = scrollTo.getBoundingClientRect().top;
					window.scrollBy({
						top: elemPosition,
						behavior: 'smooth'
					});
				});
		}
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
			}, 20);
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
			}, 20);
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
			closeModalBtn.addEventListener('click', () => {
				modal.style.display = 'none';
				closeModal();
			});
			modal.addEventListener('click', () => {
				modal.style.display = 'none';
				closeModal();
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

});
