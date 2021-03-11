// таймер
const countTimer = dDay => {
	// объявляем переменные с данными со страницы, куда будет выведен результат работы фкнции таймера
	const timerHours = document.querySelector('#timer-hours'),
		timerMinutes = document.querySelector('#timer-minutes'),
		timerSeconds = document.querySelector('#timer-seconds'),
		timerAction = document.querySelector('.timer-action');

	// функция, подсчитывающая оставшееся кол-во времени до завершения акции
	const getTimeRemaining = () => {
		// дата завершения акции
		const dateStop = new Date(dDay).getTime(),
			// сегодняшняя дата
			dateNow = new Date().getTime(),
			// общее количество времени до завершения акции (в мс)
			timeRemaining = (dateStop - dateNow) / 1000,
			// количество секунд до завершения акции
			seconds = Math.floor(timeRemaining % 60),
			// количество минут до завершения акции
			minutes = Math.floor((timeRemaining / 60) % 60),
			// количество часов до завершения акции
			hours = Math.floor(timeRemaining / 3600),

			// функция, подставляющая ноль перед часами/минутами/секундами, если их количество измеряется в единицах
			preNumber = num => {
				if (num < 10) {
					return `0${num}`;
				} else {
					return num;
				}
			};
		return {
			timeRemaining,
			hours: preNumber(hours),
			minutes: preNumber(minutes),
			seconds: preNumber(seconds),
		};
	};

	// функция-таймер, обновляющая данные на странице
	const updateClock = () => {
		const timer = getTimeRemaining();
		timerHours.textContent = timer.hours;
		timerMinutes.textContent = timer.minutes;
		timerSeconds.textContent = timer.seconds;
		// переменная с таймером
		let clockTimeout;
		// условие: если до завершения акции более 0 (в мс), то отработатывает
		//  функция-таймер, обновляющая данные на странице updateClock, в протичном
		// случае - значение обнуляется и выводится информация о завершении акуии
		if (timer.timeRemaining > 0) {
			clockTimeout = setTimeout(() => {
				setTimeout(updateClock, 1000);
			});
		} else if (timer.timeRemaining <= 0) {
			clearTimeout(clockTimeout);
			timerHours.textContent = '00';
			timerMinutes.textContent = '00';
			timerSeconds.textContent = '00';
			timerAction.textContent = 'Акция завершена';
		}
	};
	updateClock();
};

// экспорт данных
export default countTimer;
