// валидация всех форм на странице
const formValidator = () => {
	// все элементы форм на странице
	const form = document.querySelectorAll('form');
	form.forEach(item => {
		// все поля всех форм на странице
		item.querySelectorAll('input').forEach(item => {
			// событие вне фокуса поля формы
			item.addEventListener('blur', event => {
				const target = event.target;
				// функция увеличения символов
				const replaceUpper = match => match.toUpperCase();
				// функция уменьшения символов
				const replaceLower = match => match.toLowerCase();
				// для полей 'Ваше сообщение'
				if (target.placeholder === 'Ваше сообщение') {
					// регулярное выражение ввод кириллических букв, пробелов, '-' и чисел
					let reg = target.value.replace(/[a-z+=)({*&$%#~^`<>№|\\})]/gi, '');
					// замена двух пробелов в середине строки на один
					reg = reg.replace(/ {2,}/g, ' ');
					// удаление пробелов и знаков '-' в конце и начале строки
					reg = reg.replace(/^( *-* *)|( *-* *)$/g, '');
					// замена введенного пользователем значения на валидное
					target.value = reg;
					// для полей 'Ваше имя'
				} else if (target.placeholder === 'Ваше имя') {
					// регулярное выражение ввод кириллических букв и пробелов
					let reg = target.value.replace(/[a-z0-9/.,\-+=_)({*&$%#@'"!~^:;?`<>№|\\})]/gi, '');
					// замена двух пробелов в середине строки на один
					reg = reg.replace(/ {2,}/g, ' ');
					// удаление пробелов конце и начале строки
					reg = reg.replace(/^( *)|( *)$/g, '');
					// замена введенного пользователем значения на валидное
					target.value = reg;
					// для полей 'Ваш E-mail' и 'E-mail'
				} else if (target.placeholder === 'E-mail' || target.placeholder === 'Ваш E-mail') {
					// регулярное выражение ввод латинских букв, точек, знаков '-' и '@'
					const reg = target.value.replace(/[а-яё0-9/, +=)({&$%#^:;?`<>№|\\})]/gi, '');
					// замена введенного пользователем значения на валидное
					target.value = reg;
					// для полей 'Номер телефона' и 'Ваш номер телефона'
				} else if (target.placeholder === 'Номер телефона' || target.placeholder === 'Ваш номер телефона') {
					// проверка на номер +7/7/8:
					// запрет ввода символов больше 12 символов при формате +7 и больше 11 при формате 7/8
					// проверка, если внутри строки буквы и '+'
					const checkNumber = reg => {
						// первый символ подстроки
						const firstDigit = reg.substr(0, 1);
						// значение поля
						let inputValue = target.value;
						// регулярное выражение ввод цифр, знаков '+'
						const result = inputValue.replace(/[a-zа-яё/.,\-=_)({*&$%#@'"!~^:;?`<>№|\\})]/gi, '');
						// замена введенного пользователем значения на валидное
						inputValue = result;
						// условие если введеная строка короче 11 символов, то стирать значение
						if (inputValue.length < 11) {
							inputValue = '';
							return inputValue;
							// иначе условие
						} else {
							// условие, если введенное значение начинается с '+'
							if (firstDigit === '+') {
								// условие, если введеная строка короче 12 символов, то стирать значение
								if (inputValue.length < 12) {
									inputValue = '';
									return inputValue;
									// иначе условие
								} else {
									// если внутри строки знаки '+', то стрирать значение
									if (inputValue.substr(1).includes('+')) {
										inputValue = '';
										return inputValue;
										// если второй символ не '7', то стрирать значение
									} else if (inputValue[1] !== '7') {
										inputValue = '';
										return inputValue;
										// иначе вывод введенного пользователем значения
									} else {
										inputValue = inputValue.substr(0, 12);
										return inputValue;
									}
								}
								// условие если введенное значение начинается с '7' или '8'
							} else if (firstDigit === '7' || firstDigit === '8') {
								// если внутри строки знаки '+', то стрирать значение
								if (inputValue.substr(1).includes('+')) {
									inputValue = '';
									return inputValue;
									// иначе вывод введенного пользователем значения
								} else {
									inputValue = inputValue.substr(0, 11);
									return inputValue;
								}
								// условие, если введенное значение не начинается с '+', '7' или '8',
								// то стирать значение
							} else if (firstDigit !== '+' || firstDigit !== '7' || firstDigit !== '8') {
								inputValue = '';
								return inputValue;
							}
						}
					};
					// регулярное выражение ввод цифр, знаков '+'
					const reg = target.value.replace(/[a-zа-яё/.,\-=_)({*&$%#@'"!~^:;?`<>№|\\})]/gi, '');
					// результат валидации поля
					const result = checkNumber(reg);
					// замена введенного пользователем значения на валидное
					target.value = result;
				}
				// для поля 'Ваше имя'
				if (target.placeholder === 'Ваше имя') {
					// введенное пользователем значение
					const str = target.value,
						// валидация на кириллические буквы с увеличением первой буквы в заглавную
						regFirst = str.replace(/([А-ЯЁа-яё]*)/g, replaceLower).substr(1),
						// валидация на кириллические буквы с уменьшением последующих букв в строчные
						regOther = str.replace(/([А-ЯЁа-яё]*)/g, replaceUpper).substr(0, 1),
						// конкатенация строк с заглавной и строчными буквами
						reg =  regOther + regFirst;
						// замена введенного пользователем значения на валидное
					target.value = reg;
				}
			});
		});
	});
};

// экспорт данных
export default formValidator;
