// табы "нащи услуги"
const tabs = () => {
	// элементы со страницы
	const tabHeader = document.querySelector('.service-header'),
		tab = tabHeader.querySelectorAll('.service-header-tab'),
		tabContent = document.querySelectorAll('.service-tab'),
		// функция, добавляющая/убирающая активный класс контенту таба
		toggleTabContent = index => {
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
	// функция, добавляющая/убирающая активный класс заголовку активного таба
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

// экспорт данных
export default tabs;