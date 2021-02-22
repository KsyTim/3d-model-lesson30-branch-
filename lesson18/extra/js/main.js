window.addEventListener('DOMContentLoaded', function(){
  'use strict';
  function getTime(){
    // массив с днями недели
    const weekdaysArray = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    function preNumber(num){
      if (num < 10){
        return `0${num}`;
      } else {
        return num;
      }
    }
    // создаем переменную, которая будет хранить объект даты
    const data = new Date();
    // переменная день недели, которой присваиваем функцию (при помощи метода getDay объекта Date получает текущий день недели в формате числа от 0 до 6, где 0 - вс, а 6 - сб, и возвращает элемент массива дней недели)
    const weekday = () => {
      let today = data.getDay();
      switch(today) {
        case 0: 
          return weekdaysArray[weekdaysArray.length - 1];
          break;
        case 1: 
          return weekdaysArray[today - 1];
          break;
        case 2: 
          return weekdaysArray[today - 1];
          break;
        case 3: 
          return weekdaysArray[today - 1];
          break;
        case 4: 
          return weekdaysArray[today - 1];
          break;
        case 5: 
          return weekdaysArray[today - 1];
          break;
        case 6: 
          return weekdaysArray[today - 1];
          break;  
      }
    }
    // переменная часы
    const hours = () => {
      let today = data.getHours();
      // функция, которая при значении до 10, прибавляет 0 в начале
      function zeroPre(){
        if (today > -1 && today < 10){
          return preNumber(today);
        } else if (today > 9 && today < 24) {
          today = today - 12;
          return preNumber(today);
        }
      } 
      return zeroPre();
    } 
    // переменная минуты 
    const minutes = () => {
      const today = data.getMinutes();
      // функция, которая при значении до 10, прибавляет 0 в начале
      function zeroPre(){
        if (today > -1 && today < 10){
          return preNumber(today);
        } else if (today > 9 && today < 60) {
          return today;
        }
      } 
      return zeroPre();
    }  
    // переменная секунды
    const seconds = () => {
      const today = data.getSeconds(); 
      // функция, которая при значении до 10, прибавляет 0 в начале
      function zeroPre(){
        if (today > -1 && today < 10){
          return preNumber(today);
        } else if (today > 9 && today < 60) {
          return today;
        }
      } 
      return zeroPre(); 
    } 
    const hourPmAm = () => {
      const today = data.getHours();
        if (today < 12){
          return 'AM';
        } else if (today > 11 && today < 24){
          return 'PM';
        }
    };
    const dayTiming = () => {
      const today = data.getHours();
      if (today < 12){
        return 'Доброе утро';
      } else if (today >= 12 && today < 18){
        return 'Добрый день';
      } else if (today >= 18 && today < 24){
        return 'Добрый вечер';
      }
    };
    const dayNewYear = () => {
      const newYear = '1 january 2022';
      const toDday = new Date(newYear).getTime(),
            today = new Date().getTime(),
            timeRemaining = (toDday - today) / 1000,
            day = Math.floor(timeRemaining / 3600 / 24);
      return day;      
    }
    // результат работы функции, выводим на страницу в необходимом формате, получив элемент по id
    document.querySelector('.time').innerHTML = (
      `${dayTiming()} <br />
      Сегодня: ${weekday()} <br />
      Текущее время: ${hours()}:${minutes()}:${seconds()} ${hourPmAm()} <br />
      До нового года осталось ${dayNewYear()} дней <br />
    `);
  }
  setInterval(getTime, 1000);
});