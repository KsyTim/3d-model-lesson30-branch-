function countTimer(dDay) {
	const timerHours = document.querySelector('#timer-hours'),
		timerMinutes = document.querySelector('#timer-minutes'),
		timerSeconds = document.querySelector('#timer-seconds'),
		timerAction = document.querySelector('.timer-action');

	function getTimeRemaining() {
		const dateStop = new Date(dDay).getTime(),
			dateNow = new Date().getTime(),
			timeRemaining = (dateStop - dateNow) / 1000,
			seconds = Math.floor(timeRemaining % 60),
			minutes = Math.floor((timeRemaining / 60) % 60),
			hours = Math.floor(timeRemaining / 3600);
		function preNumber(num) {
			if (num < 10) {
				return `0${num}`;
			} else {
				return num;
			}
		}
		return {
			timeRemaining,
			hours: preNumber(hours),
			minutes: preNumber(minutes),
			seconds: preNumber(seconds),
		};
	}
	const updateClock = () => {
		const timer = getTimeRemaining();
		timerHours.textContent = timer.hours;
		timerMinutes.textContent = timer.minutes;
		timerSeconds.textContent = timer.seconds;
		let interval;
		if (timer.timeRemaining > 0) {
			interval = setInterval(updateClock, 1000);
		} else if (timer.timeRemaining <= 0) {
			clearInterval(interval);
			timerHours.textContent = '00';
			timerMinutes.textContent = '00';
			timerSeconds.textContent = '00';
			timerAction.textContent = 'Акция завершена';
		}
	};
	updateClock();
};

export default countTimer;