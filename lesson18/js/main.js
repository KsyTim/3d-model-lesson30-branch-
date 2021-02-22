window.addEventListener('DOMContentLoaded', function(){
  'use strict';

  function countTimer(dDay){
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds'),
        timerAction = document.querySelector('.timer-action');

    function getTimeRemaining() {
      let dateStop = new Date(dDay).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 3600);
      function preNumber(num){
        if (num < 10){
          return `0${num}`;
        } else {
          return num;
        }
      }
      return {
        timeRemaining: timeRemaining,
        hours: preNumber(hours),
        minutes: preNumber(minutes),
        seconds: preNumber(seconds),
      };      
    }
    function updateClock(){
      let timer = getTimeRemaining();
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;

      if(timer.timeRemaining > 0){
        setInterval(updateClock, 1000);
      } else if (timer.timeRemaining <= 0){
        clearInterval(updateClock);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        timerAction.textContent = 'Акция завершена';
      }
    }
    updateClock();
  }

  countTimer('23 february 2021');
});