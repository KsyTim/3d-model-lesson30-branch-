// модальное окно
const toggleModal = () => {
	// элементы со страницы
	const modalContent = document.querySelector('.popup-content'),
		modalBtn = document.querySelectorAll('.popup-btn'),
		closeModalBtn = document.querySelector('.popup-close'),
		modal = document.querySelector('.popup');
	// функция с анимацией для открытия модального окна
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
	// функция с анимацией для закрытия модального окна
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
	// клик по кнопкам "оставить заявку"
	modalBtn.forEach(item  => {
		item.addEventListener('click', () => {
			// условие для отключения анимации на экранах < 768px
			if (document.documentElement.offsetWidth < 768) {
				// клик по кнопке "оставить заявку" = отобразить модальное окно
				modal.style.display = 'block';
				// клик по кнопке закрыть модальное окно
				closeModalBtn.addEventListener('click', () => {
					modal.style.display = 'none';
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
			}
			// условие для работы анимации на экранах > 768px
			if (document.documentElement.offsetWidth >= 768) {
				modal.style.display = 'block';
				openModal();
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
		});
	});
};

// экспорт данных
export default toggleModal;
