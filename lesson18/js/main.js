window.addEventListener('DOMContentLoaded', function(){
  'use strict';

  // таймер
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


  //меню 
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'), 
          menuItems = menu.querySelectorAll('ul>li'),
          width = document.documentElement.offsetWidth;
    const actionMenu = () => {
      menu.classList.toggle('active-menu');
    };   
    const openModal = () => {
      let count = 0;  
      const width = document.documentElement.offsetWidth;    
      let openModal = setInterval(() => {
        count+=10;
        if((count - 10) < width){        
          menu.style.left = count + 'px';
        } else if (count === width) {
          clearInterval(openModal);
        }
      }, 10);
    };
    const closeModal = () => {
      let count = 0;
      const width = document.documentElement.offsetWidth;
      let closeModal = setInterval(() => {
        count+=10;
        if((count - 10) < width){  
          let left = width - count; 
          menu.style.left = left + 'px';
        } else if (count === width) {
          clearInterval(closeModal);
        }
      }, 10);
    };
    if (width < 768) {
      btnMenu.addEventListener('click', actionMenu);
      closeBtn.addEventListener('click', actionMenu);
      menuItems.forEach((elem) => elem.addEventListener('click', actionMenu));
    } else {
      btnMenu.addEventListener('click', openModal);
      closeBtn.addEventListener('click', closeModal);
      menuItems.forEach((elem) => {
        elem.addEventListener('click', () => {
          closeModal(); 
          // elem.scrollIntoView({
          //   behavior: 'smooth',
          //   block: 'end'
          // });
        });
      });
    } 
  };
  toggleMenu();



  // модальное окно 
  const toggleModal = () => {
    const modal = document.querySelector('.popup'),
          modalBtn = document.querySelectorAll('.popup-btn'),
          closeModal = document.querySelector('.popup-close');
    modalBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        modal.style.display = 'block';
      });
    });
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  };

  toggleModal();
});