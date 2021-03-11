// калькулятор в секции "рассчитать стоимость услуг"
const calculator = (price = 100) => {
	// элементы со страницы
	const calc = document.getElementById('calc'),
		calcAreas = calc.querySelectorAll('input'),
		calcBlock = document.querySelector('.calc-block'),
		calcType = document.querySelector('.calc-type'),
		calcSquare = document.querySelector('.calc-square'),
		calcDay = document.querySelector('.calc-day'),
		calcCount = document.querySelector('.calc-count'),
		totalValue = document.getElementById('total');
	// обработка ввода данных в поля формы и их валидация
	calcAreas.forEach(item => {
		item.addEventListener('input', event => {
			const target = event.target,
				regNum = target.value.replace(/\D/g, '');
			target.value = regNum;
		});
	});
	// функция рассчет стоимости
	const countSum = () => {
		let total = 0,
			countValue = 1,
			dayValue = 1;
		const typeValue = calcType.options[calcType.selectedIndex].value,
			squareValue = +calcSquare.value;
		// условие, если количество помещений > 1
		if (calcCount.value > 1) {
			countValue += (calcCount.value - 1) / 10;
		}
		// условие, если срок исполнения от 2 до 5 дней, т.е. срочный заказ
		if (calcDay.value && calcDay.value < 5) {
			dayValue *= 2;
			// условие, если срок исполнения < 10
		} else if (calcDay.value && calcDay.value < 10) {
			dayValue *= 1.5;
		}
		// условие, если поля заполнены, рассчитать стоимость
		if (typeValue && squareValue) {
			total = Math.round(price * typeValue * squareValue * countValue * dayValue);
		}

		// функция с анимацией пересчета
		const setValue = function(oldValue, newValue, operation, increaseBy, speed) {
			let interval = false;
			// условие, если старая цена (oldValue) меньше новой (newValue), то 
			// увеличиваем значение на (increaseBy) со скоростью (speed)
			if (operation) {
				interval = setInterval(() => {
					if (oldValue.innerHTML >= newValue) {
						oldValue.innerHTML = newValue;
						clearInterval(interval);
					} else {
						oldValue.innerHTML = oldValue.innerHTML * 1 + increaseBy;
					}
				}, speed);
				// иначе уменьшаем
			} else {
				interval = setInterval(() => {
					if (oldValue.innerHTML <= newValue) {
						oldValue.innerHTML = newValue;
						clearInterval(interval);
					} else {
						oldValue.innerHTML = oldValue.innerHTML * 1 - increaseBy;
					}
				}, speed);
			}
		};
		// если итого меньше новой цены, то operation = true, т.е. увеличиваем
		const oldPrice = document.getElementById('total');
		if (+oldPrice.textContent < total) {
			if (total < 10001) {
				setValue(totalValue, total, true, 100, .5);
			} else if (total > 10000) {
				setValue(totalValue, total, true, 1000, .5);
			}
			// иначе operation = false, т.е. уменьшаем
		} else if (+oldPrice.textContent > total) {
			if (total < 10001) {
				setValue(totalValue, total, false, 100, .5);
			} else if (total > 10000) {
				setValue(totalValue, total, false, 1000, .5);
			}
		}
	};
	// событие изменения данных полей формы и вызов функции пересчета итого
	calcBlock.addEventListener('change', event => {
		const target = event.target;
		if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
			countSum();
		}
	});
};

// экспорт данных
export default calculator;
