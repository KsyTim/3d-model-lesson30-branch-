//lesson 02 simple
// создаем переменные
let money = 40000;
    income = 'freelance';
    addExpenses = 'FEES, MEDICINES, ENTERTAINS';
    deposit = false;
    mission = 400000;
    period = 8;
// выводим тип переменной money
console.log(typeof money);
// выводим тип переменной income
console.log(typeof income);
// выводим тип переменной deposit
console.log(typeof deposit);
// узнаем длину переменной addExpenses
console.log(addExpenses.length);
// выводим в консоль срок, в который необходимо достичь желаемого накопления
console.log(`Период равен ${period} месяцев`);
// выводим в консоль величину желаемого накопления
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
// приводим строку addExpenses к нижнему регистру, разбиваем строку на массив и выводим полученный массив в консоль
console.log(addExpenses.toLowerCase().split(', '));
// объявляем переменную budgetDay и присваиваем ей занчение как частное от деления месячного дохода на количество дней в месяце
let budgetDay = money / 30;
// выводим в консоль округленную до двух знаков после запятой переменную budgetDay
console.log(+budgetDay.toFixed(2));
