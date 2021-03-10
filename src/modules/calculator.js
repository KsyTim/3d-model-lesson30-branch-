const calculator = (price = 100) => {
	const calc = document.getElementById('calc');
	const calcAreas = calc.querySelectorAll('input'),
		calcBlock = document.querySelector('.calc-block'),
		calcType = document.querySelector('.calc-type'),
		calcSquare = document.querySelector('.calc-square'),
		calcDay = document.querySelector('.calc-day'),
		calcCount = document.querySelector('.calc-count'),
		totalValue = document.getElementById('total');
	calcAreas.forEach(item => {
		item.addEventListener('input', event => {
			const target = event.target;
			const regNum = target.value.replace(/\D/g, '');
			target.value = regNum;
		});
	});

	const countSum = () => {
		let total = 0,
			countValue = 1,
			dayValue = 1;
		const typeValue = calcType.options[calcType.selectedIndex].value,
			squareValue = +calcSquare.value;
		if (calcCount.value > 1) {
			countValue += (calcCount.value - 1) / 10;
		}
		if (calcDay.value && calcDay.value < 5) {
			dayValue *= 2;
		} else if (calcDay.value && calcDay.value < 10) {
			dayValue *= 1.5;
		}
		if (typeValue && squareValue) {
			total = Math.round(price * typeValue * squareValue * countValue * dayValue);
		}


		const setValue = function(oldValue, newValue, operation, increaseBy, speed) {
			let interval = false;
			if (operation) {
				interval = setInterval(() => {
					if (oldValue.innerHTML >= newValue) {
						oldValue.innerHTML = newValue;
						clearInterval(interval);
					} else {
						oldValue.innerHTML = oldValue.innerHTML * 1 + increaseBy;
					}
				}, speed);
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
		const oldPrice = document.getElementById('total');
		if (+oldPrice.textContent < total) {
			if (total < 10001) {
				setValue(totalValue, total, true, 100, .5);
			} else if (total > 10000) {
				setValue(totalValue, total, true, 1000, .5);
			}
		} else if (+oldPrice.textContent > total) {
			if (total < 10001) {
				setValue(totalValue, total, false, 100, .5);
			} else if (total > 10000) {
				setValue(totalValue, total, false, 1000, .5);
			}
		}
	};

	calcBlock.addEventListener('change', event => {
		const target = event.target;
		if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
			countSum();
		}
	});
};

export default calculator;