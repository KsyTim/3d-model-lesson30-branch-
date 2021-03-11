// модальное окно
const toggleModal = () => {
	// элементы со страницы
	const modal = document.querySelector('.popup'),
		modalContent = document.querySelector('.popup-content'),
		modalBtn = document.querySelectorAll('.popup-btn'),
		closeModalBtn = document.querySelector('.popup-close'),
		// функция с анимацией для открытия модального окна
		openModal = () => {
			let count = 0;
			const height = document.documentElement.offsetHeight / 50,
				openModal = setInterval(() => {
					count += 5;
					if ((count - 5) < height) {
						modalContent.style.top = count + 'px';
					} else if (count === height) {
						clearInterval(openModal);
					}
				}, 5);
		},
		// функция с анимацией для закрытия модального окна
		closeModal = () => {
			let count = 0;
			const height = document.documentElement.offsetHeight / 50,
				closeModal = setInterval(() => {
					count += 5;
					if ((count - 5) < height) {
						const top = height - count;
						modalContent.style.top = top + 'px';
					} else if (count === height) {
						clearInterval(closeModal);
					}
				}, 5);
		},
		// ширина эдемента на странице
		width = document.documentElement.offsetWidth;
	// условие для отключения анимации на экранах < 768px
	if (width < 768) {
		modalBtn.forEach(elem => {
			// клик по кнопке "оставить заявку" = отобразить модальное окно
			elem.addEventListener('click', () => {
				modal.style.display = 'block';
			});
		});
		// клик по элементам модального окна
		modal.addEventListener('click', event => {
			let target = event.target;
			// клик по кнопке "закрыть" = закрыть модальное окно
			if (target.classList.contains('popup-close')) {
				modal.style.display = 'none';
				// клик по контенту моадльного окна
			} else {
				target = target.closest('.popup-content');
				// при клике по подложке (вне окна) = закрыть модальное окно
				if (!target) {
					modal.style.display = 'none';
				}
			}
		});
		// esc = закрыть модальное окно
		document.addEventListener('keydown', event => {
			if (event.which === 27) {
				modal.style.display = 'none';
			}
		});
	// иначе анимация работает
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

// экспорт данных
export default toggleModal;
