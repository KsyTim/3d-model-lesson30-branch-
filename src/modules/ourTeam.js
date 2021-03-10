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

export default ourTeam;