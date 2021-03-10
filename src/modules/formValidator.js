const formValidator = () => {
	const form = document.querySelectorAll('form');
	form.forEach(item => {
		item.querySelectorAll('input').forEach(item => {
			item.addEventListener('blur', event => {
				const target = event.target;
				function replaceUpper(match) {
					return match.toUpperCase();
				}
				function replaceLower(match) {
					return match.toLowerCase();
				}
				if (target.placeholder === 'Ваше сообщение') {
					let reg = target.value.replace(/[a-z+=)({*&$%#~^`<>№|\\})]/gi, '');
					reg = reg.replace(/ {2,}/g, ' ');
					reg = reg.replace(/^( *-* *)|( *-* *)$/g, '');
					target.value = reg;
				} else if (target.placeholder === 'Ваше имя') {
					let reg = target.value.replace(/[a-z0-9/.,\-+=_)({*&$%#@'"!~^:;?`<>№|\\})]/gi, '');
					reg = reg.replace(/ {2,}/g, ' ');
					reg = reg.replace(/^( *)|( *)$/g, '');
					target.value = reg;
				} else if (target.placeholder === 'E-mail' || target.placeholder === 'Ваш E-mail') {
					const reg = target.value.replace(/[а-яё0-9/, +=)({&$%#^:;?`<>№|\\})]/gi, '');
					target.value = reg;
				} else if (target.placeholder === 'Номер телефона' || target.placeholder === 'Ваш номер телефона') {
					const checkNumber = reg => {
						const firstDigit = reg.substr(0, 1);
						let inputValue = target.value;
						const result = inputValue.replace(/[a-zа-яё/.,\-=_)({*&$%#@'"!~^:;?`<>№|\\})]/gi, '');
						inputValue = result;
						if (inputValue.length < 11) {
							inputValue = '';
							return inputValue;
						} else {
							if (firstDigit === '+') {
								if (inputValue.substr(1).includes('+')) {
									inputValue = '';
									return inputValue;
								} else if (inputValue[1] !== '7') {
									inputValue = '';
									return inputValue;
								} else {
									inputValue = inputValue.substr(0, 12);
									return inputValue;
								}
							} else if (firstDigit === '7' || firstDigit === '8') {
								if (inputValue.substr(1).includes('+')) {
									inputValue = '';
									return inputValue;
								} else {
									inputValue = inputValue.substr(0, 11);
									return inputValue;
								}
							} else if (firstDigit !== '+' || firstDigit !== '7' || firstDigit !== '8') {
								inputValue = '';
								return inputValue;
							}
						}
					};
					const reg = target.value.replace(/[a-zа-яё/.,\-=_)({*&$%#@'"!~^:;?`<>№|\\})]/gi, '');
					const result = checkNumber(reg);
					target.value = result;
				}
				if (target.placeholder === 'Ваше имя') {
					const str = target.value;
					const regFirst = str.replace(/([А-ЯЁа-яё]*)/g, replaceLower).substr(1);
					const regOther = str.replace(/([А-ЯЁа-яё]*)/g, replaceUpper).substr(0, 1);
					const reg =  regOther + regFirst;
					target.value = reg;
				}
			});
		});
	});
};

export default formValidator;