// создаем массив, который хранит в себе дни недели
let weekdaysArray = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
// создаем переменную. которая будет хранить в себе сегодняшнюю дату в формате дня недели (где 0-вс, и 6-сб)
let today = new Date().getDay();
// цикл, который перебирает и выводит на страницу дни недели
for (let i = 0; i < weekdaysArray.length; i++) {
  // условие вывода дней недели
  if (weekdaysArray[i] === 'Суббота' && today === 6 || weekdaysArray[i] === 'Воскресенье' && weekdaysArray[today + 6] ){
    document.write(`<p style="font-weight: 700; font-style: italic;">${weekdaysArray[i]}</p>`);
  } else if (weekdaysArray[i] === weekdaysArray[today - 1]){
    document.write(`<p><i>${weekdaysArray[i]}</i></p>`);
  } else if (weekdaysArray[i] === 'Суббота' ||  weekdaysArray[i] === 'Воскресенье'){
    document.write(`<p><b>${weekdaysArray[i]}</b></p>`);
  } else {
    document.write(`<p>${weekdaysArray[i]}</p>`);
  }
}