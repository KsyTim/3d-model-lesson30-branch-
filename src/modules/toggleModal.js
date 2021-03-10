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

export default toggleModal;