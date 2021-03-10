const sendForm = () => {
	const errorMessage = 'Что-то пошло не так...',
		successMessage = 'Спасибо! Мы скоро свяжемся с Вами!';

	const statusMessage = document.createElement('div');
	statusMessage.classList.add('status-message');
	statusMessage.style.cssText = 'font-size: 1.5rem; color: #fff;';
	document.body.addEventListener('submit', event => {
		event.preventDefault();
		if (event.target.tagName.toLowerCase() === 'form') {
			event.target.appendChild(statusMessage);
			const animationLoading = `
      <div class="sk-wave">
        <div class="sk-rect sk-rect-1"></div>
        <div class="sk-rect sk-rect-2"></div>
        <div class="sk-rect sk-rect-3"></div>
        <div class="sk-rect sk-rect-4"></div>
        <div class="sk-rect sk-rect-5"></div>
      </div>
      `;
			statusMessage.insertAdjacentHTML('beforeend', animationLoading);
			const formData = new FormData(event.target);
			const body = {};
			formData.forEach((val, key) => {
				body[key] = val;
			});
			const postData = body => fetch('./server.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				},
				body: JSON.stringify(body)
			});
			const closePopup = () => {
				const timeout = setTimeout(closePopup, 2000);
				const status = document.querySelector('.status-message'),
					statusParent = status.closest('form').parentElement.parentElement.parentElement;
				if (statusMessage.textContent === '' && statusParent.className === 'popup') {
					statusParent.style.display = 'none';
				}
				if (statusParent.style.display === 'none') {
					clearTimeout(timeout);
				}
			};
			const clearOutputData = () => {
				const timeout = setTimeout(clearOutputData, 3000);
				if (statusMessage.textContent) {
					statusMessage.textContent = '';
					setTimeout(closePopup, 2000);
				} else if (statusMessage.textContent === '') {
					clearTimeout(timeout);
				}
			};
			const outputData = () => {
				statusMessage.textContent = successMessage;
				event.target.querySelectorAll('input').forEach(item => {
					item.value = '';
				});
				setTimeout(clearOutputData, 3000);
			};
			postData(body)
				.then(response => {
					if (response.status !== 200) {
						throw new Error('status network is not 200');
					}
					outputData();
				})
				.catch(error => {
					statusMessage.textContent = errorMessage;
					console.error(error);
				});
		}
	});
};

export default sendForm;