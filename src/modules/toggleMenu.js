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

export default toggleMenu;