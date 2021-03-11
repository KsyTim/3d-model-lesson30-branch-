// функция, скрывающая и отображающая меню при клике на "гамбургер"
const toggleMenu = () => {
	// переменная с блоком меню
	let menu = document.querySelector('menu');
	// функция, отображающая меню на странице путем toggle class
	const actionMenu = () => {
		menu.classList.toggle('active-menu');
	};
	// функция, отслеживающая клики по элементам на странице
	const eventListener = () => {
		document.addEventListener('click', event => {
			// переменная события по клику
			const target = event.target,
				// клик по меню
				targetMenu = target.closest('.menu'),
				// клик по "закрыть"
				targetCloseBtn = target.closest('.close-btn'),
				// клик по элементам меню
				targetMenuItem = target.closest('ul>li>a'),
				// клик по стрелке "перейти к нашим услугам" в главной секции
				targetToServices = target.closest('[href="#service-block"'),
				// ширина эдемента на странице
				width = document.documentElement.offsetWidth;

			// условие для отключения анимации на экранах < 768px
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
					// условие: если клик по элементам меню, то скролить до элемента с id,
					// совпадающим со значением ссылки (href) на кликнутом элементе
				} else if (targetMenuItem !== null) {
					actionMenu();
					event.preventDefault();
					// значение ссылки (href) gj кликнутому элементу
					const id = target.getAttribute('href').substr(1),
						// элемент с id
						scrollTo = document.getElementById(id),
						// значение до верхней границы элемента, по которому происходит клик
						elemPosition = scrollTo.getBoundingClientRect().top;
					// плавная прокуратка на необходимое количество px до элемента
					window.scrollBy({
						top: elemPosition,
						behavior: 'smooth'
					});
					// условие: если клик по стрелке "перейти к нашим услугам" в главной 
					// секции, то плавный скролл до секции "наши услуги"
				} else if (targetToServices !== null) {
					event.preventDefault();
					// значение ссылки (href) gj кликнутому элементу
					const id = document.querySelector('[href="#service-block"').getAttribute('href').substr(1),
						// элемент с id
						scrollTo = document.getElementById(id),
						// значение до верхней границы элемента, по которому происходит клик
						elemPosition = scrollTo.getBoundingClientRect().top;
					// плавная прокуратка на необходимое количество px до элемента
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
	// вызов функции, отслеживающей клики по элементам на странице
	eventListener();
};

// экспорт данных
export default toggleMenu;