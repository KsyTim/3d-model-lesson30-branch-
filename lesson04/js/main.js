//lesson 03 simple
// создаем переменные
let moneyInfo = 'Ваш месячный доход?'; 
let money;
// создаем функцию, которая будет обрабатывать входные данные от пользователя на null, undefined, '', NaN
let meaning = function checkNumMeaning(variable, info) {
  do {
    variable = +prompt('Пожалуйста введите ' + info);
  } while (!variable || variable <=0);
  return variable;
};
// вызываем функцию, которая будет требовать от пользователя, чтобы было обязательно введено числовое значение дохода
money = meaning(money, moneyInfo);
let income = 'freelance';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'квартплата, проездной, кредит');
let deposit = Boolean(confirm('Есть ли у вас депозит в банке?'));
let mission = 400000;
let expenses1 = prompt('Введите обязательную статью расходов?', 'квартплата');
let amount1Info = 'Во сколько это обойдется?';
let amount1;
amount1 = meaning(amount1, amount1Info);
let expenses2 = prompt('Введите обязательную статью расходов?', 'проездной');
let amount2Info = 'Во сколько это обойдется?';
let amount2;
amount2 = meaning(amount2, amount2Info);
let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1 , amount2));
let period = 8;
let goal = Math.ceil(getTargetMonth(mission, accumulatedMonth));
// выводим тип переменной money
console.log(showTypeOf(money));
// выводим тип переменной income
console.log(showTypeOf(income));
// выводим тип переменной deposit
console.log(showTypeOf(deposit));
console.log(deposit);
// узнаем длину переменной addExpenses
console.log(addExpenses.length);
// выводим в консоль срок, в который необходимо достичь желаемого накопления
console.log(`Период равен ${period} месяца(-ев)`);
// выводим в консоль величину желаемого накопления
console.log(`Цель заработать ${mission} рублей`);
// приводим строку addExpenses к нижнему регистру, разбиваем строку на массив и выводим полученный массив в консоль
console.log(addExpenses.toLowerCase().split(', '));
// выводим в консоль переменную budgetMonth
console.log(`Бюджет на месяц: ${accumulatedMonth}`);
// выводим в консоль срок, за который будет накомплена желаемая сумма mission
console.log(`Цель будет достигнута за ${goal} месяца(-ев)`);
// объявляем переменную budgetDay и присваиваем ей занчение как частное от деления месячного дохода на количество дней в месяце, округленное в меньшую сторону
let budgetDay = Math.floor(accumulatedMonth / 30);
// выводим в консоль округленную в меньшую сторону переменную budgetDay
console.log(`Бюджет на день: ${budgetDay}`);
// вызов функции с определением уровня дохода
console.log(getStatusIncome(budgetDay));
//функция, с условной конструкция для определения уровня дохода
function getStatusIncome(income){
  if(income >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (income < 1200 && income >= 600) {
    return 'У вас средний уровень дохода';
  } else if (income < 600 && income >= 0) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else {
    return 'Что то пошло не так';
  }
}
// функция возвращающая тип переменной
function showTypeOf(variable){
    return typeof variable;
}
// функция, возвращающая сумму всех обязательных расходов за месяц
function getExpensesMonth(expense01, expense02){
    return expense01 + expense02;
}
// функция, возвращаеющая накопления за месяц (доходы - расходы)
function getAccumulatedMonth(income, expensesMonth) {
    return income - expensesMonth;
}
// функция, подсчитывающая за какой период будет достигнута цель, зная результат месячного накопления accumulatedMonth
function getTargetMonth(moneyGoal, monthIncome) {
    return moneyGoal / monthIncome;
}