// секция "наша команда"
const ourTeam = () => {
	// элемент со страницы "наша команда"
	const ourTeam = document.getElementById('command'),
		// каждый участник (карточка)
		member = ourTeam.querySelectorAll('.col-12');
	member.forEach(item => {
		// при наведении изменяем значение атрибута src на значение атрибута data-img
		item.addEventListener('mouseenter', event => {
			const target = event.target,
				memberPhoto = target.querySelector('img'),
				memberPhotoSrc = memberPhoto.src,
				memberPhotoData = memberPhoto.dataset.img;
			memberPhoto.src = memberPhotoData;
			memberPhoto.dataset.img = memberPhotoSrc;
		});
		// в противном случае, когда убираем курсор с карточки возвращаем значения атрибутов обратно
		item.addEventListener('mouseleave', event => {
			const target = event.target,
				memberPhoto = target.querySelector('img'),
				memberPhotoSrc = memberPhoto.src,
				memberPhotoData = memberPhoto.dataset.img;
			memberPhoto.src = memberPhotoData;
			memberPhoto.dataset.img = memberPhotoSrc;
		});
	});
};

// экспорт данных
export default ourTeam;