// lesson 09 complicated
// функция, которая будет выводить время в формате A - 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды' 
function getDateFormatA(){
  // массив с днями недели
  let weekdaysArray = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  // массив с месяцами года
  let monthArray = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  // создаем переменную, которая будет хранить объект даты
  const data = new Date();
  // переменная день недели, которой присваиваем функцию (при помощи метода getDay объекта Date получает текущий день недели в формате числа от 0 до 6, где 0 - вс, а 6 - сб, и возвращает элемент массива дней недели)
  let weekday = function getWeekday(){
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
  // переменная дата
  let date = data.getDate();
  // переменная месяц, которая возвращает элемент массива monthArray
  let month = function getMonth(){
    let today = data.getMonth();
    for (let i = 0; i < monthArray.length; i++){
      return monthArray[today];
    }
  }
  // переменная год
  let year = data.getFullYear();
  // переменная часы, которая возвращает значение часов с необходимым склонением
  let hours = function getHours(){
    let today = data.getHours();
    if (today === 1 || today === 21){
      return zeroPre() + ' час';
    } else if (today === 0 || today > 4 && today < 21) {
      return zeroPre() + ' часов';
    } else if (today > 1 && today < 5 || today > 21 && today < 24){
      return zeroPre() + ' часа';
    } 
    // функция, которая при значении до 10, прибавляет 0 в начале
    function zeroPre(){
    if (today > -1 && today < 10){
      return '0' + today;
    } else if (today > 9 && today < 24) {
      return today;
    }
    }
  }
  // переменная минуты, которая возвращает значение минут с необходимым склонением
  let minutes = function getMinutes(){
    let today = data.getMinutes();
    if (today === 1 || today === 21 || today === 31 || today === 41 || today === 51){
      return zeroPre() + ' минута';
    } else if (today === 0 || today > 4 && today < 21 || today > 24 && today < 31 || today > 34 && today < 41 || today > 44 && today < 51 || today > 54 && today < 60) {
      return zeroPre() + ' минут';
    } else if (today > 1 && today < 5 || today > 21 && today < 25 || today > 31 && today < 35 || today > 41 && today < 45 || today > 51 && today < 55){
      return zeroPre() + ' минуты';
    } 
    // функция, которая при значении до 10, прибавляет 0 в начале
    function zeroPre(){
    if (today > -1 && today < 10){
      return '0' + today;
    } else if (today > 9 && today < 60) {
      return today;
    }
    }
  } 
  // переменная секунды, которая возвращает значение секунд с необходимым склонением
  let seconds = function getSeconds(){
    let today = data.getSeconds();
    if (today === 1 || today === 21 || today === 31 || today === 41 || today === 51){
      return zeroPre() + ' секунда';
    } else if (today === 0 || today > 4 && today < 21 || today > 24 && today < 31 || today > 34 && today < 41 || today > 44 && today < 51 || today > 54 && today < 60) {
      return zeroPre() + ' секунд';
    } else if (today > 1 && today < 5 || today > 21 && today < 25 || today > 31 && today < 35 || today > 41 && today < 45 || today > 51 && today < 55){
      return zeroPre() + ' секунды';
    } 
    // функция, которая при значении до 10, прибавляет 0 в начале
    function zeroPre(){
    if (today > -1 && today < 10){
      return '0' + today;
    } else if (today > 9 && today < 60) {
      return today;
    }
    }
  }  
  // результат работы функции, выводим на страницу в необходимом формате, получив элемент по id
  document.getElementById('time_a').innerHTML = (`Сегодня ${weekday()}, ${date} ${month()} ${year} года, ${hours()} ${minutes()} ${seconds()}`);
} 
// функция, которая будет выводить время в формате B - '04.02.2020 - 21:05:33'  
function getDateFormatB(){
  // создаем переменную, которая будет хранить объект даты
  const data = new Date();
  // переменная дата  
  let date = function getDate(){
    let today = data.getDate();
    // функция, которая при значении до 10, прибавляет 0 в начале    
    function zeroPre(){
      if (today > -1 && today < 10){
        return '0' + today;
      } else if (today > 9 && today < 32) {
        return today;
      }
    } 
    return zeroPre();
  }   
  // переменная месяц
  let month = function getMonth(){
    let today = data.getMonth();
    for (let i = 0; i < 12; i++){
      return zeroPre() + (today + 1);
    }
    // функция, которая при значении до 10, прибавляет 0 в начале
    function zeroPre(){
    if (today > -1 && today < 10){
      return '0';
    } else if (today > 9 && today < 12) {
      return '';
    }
    }
  }
  // переменная год
  let year = data.getFullYear();
  // переменная часы
  let hours = function getHours(){
    let today = data.getHours();
    // функция, которая при значении до 10, прибавляет 0 в начале
    function zeroPre(){
      if (today > -1 && today < 10){
        return '0' + today;
      } else if (today > 9 && today < 24) {
        return today;
      }
    } 
    return zeroPre();
  } 
  // переменная минуты 
  let minutes = function getMinutes(){
    let today = data.getMinutes();
    // функция, которая при значении до 10, прибавляет 0 в начале
    function zeroPre(){
      if (today > -1 && today < 10){
        return '0' + today;
      } else if (today > 9 && today < 60) {
        return today;
      }
    } 
    return zeroPre();
  }  
  // переменная секунды
  let seconds = function getSeconds(){
    let today = data.getSeconds(); 
    // функция, которая при значении до 10, прибавляет 0 в начале
    function zeroPre(){
      if (today > -1 && today < 10){
        return '0' + today;
      } else if (today > 9 && today < 60) {
        return today;
      }
    } 
    return zeroPre(); 
  }  
  // результат работы функции, выводим на страницу в необходимом формате, получив элемент по id
  document.getElementById('time_b').innerHTML = (`${date()}.${month()}.${year} - ${hours()}:${minutes()}:${seconds()}`);
}
// с помощью функции setInterval обновляем дату и время каждую секунду 
setInterval(getDateFormatA, 1000);
setInterval(getDateFormatB, 1000);
