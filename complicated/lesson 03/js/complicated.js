// lesson03 complicated
//создаем переменную и присваиваем значение путем взаимодействия с пользователем
let ruWeekdaysArray = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let enWeekdaysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let lang = prompt('Выберите язык для отображения страницы', 'Введите ru или en');
if (lang === 'ru') {
  for(i = 0; i < ruWeekdaysArray.length; i++){
    console.log(ruWeekdaysArray[i]);
  }
} else if (lang === 'en') {
  for(i = 0; i < enWeekdaysArray.length; i++){
    console.log(enWeekdaysArray[i]);
  }
} else {
  console.log('Пожалуйста обновите страницу и снова введите запрашиваемую информацию');
}