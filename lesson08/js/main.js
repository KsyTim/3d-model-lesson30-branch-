//lesson 08 simple
// создаем функцию, которая будет обрабатывать входные данные от пользователя на null, undefined, '', NaN
let meaning = function checkNumMeaning(variable, info) {
  do {
    variable = +prompt('Пожалуйста введите ' + info);
  } while (!variable || variable <=0);
  return variable;
};
let meaningStr = function checkStrMeaning(variable, info) {
  do {
    variable = prompt('Пожалуйста введите ' + info);
  } while (!variable || variable.includes(+variable));
  return variable;
};
// создаем функцию, которая будет запрашивать доход у пользователя
let moneyInfo = 'Ваш месячный доход?'; 
let money;
let start = function(){
  // вызываем функцию, которая будет требовать от пользователя, чтобы было обязательно введено числовое значение дохода
  money = meaning(money, moneyInfo);
}
let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0, 
  mission: 400000,
  period: 8,
  asking: function(){
    if(confirm('Есть ли у Вас дополнительный источник заработка?')) {
      let item, itemInfo = 'Какой у Вас дополнительный заработок?';
      let itemIncome = meaningStr(item, itemInfo);
      let cash, cashInfo = 'Какой доход это Вам приносит в месяц?';
      let cashIncome = meaning(cash, cashInfo);
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'квартплата, проездной, кредит');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let expense, key;
    let infoExpense = 'Во сколько это обойдется?';
    let infoKey = 'Введите обязательную статью расходов?';
    for (let i = 0; i < 2; i++) {
      let prop = meaningStr(key, infoKey);
      appData.expenses[prop] = meaning(expense, infoExpense);
    }
  },
  budget: start(),
  getExpensesMonth: function(){
    let sum = 0;
    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    return sum;
  },  
  expensesMonth: function(){
    return appData.getExpensesMonth();
  },
  getBudget: function(){
    return money - appData.expensesMonth();
  },
  budgetMonth: function(){
    return appData.getBudget();
  },
  getTargetMonth: function() {
    return Math.ceil(appData.mission / appData.budgetMonth());
  },
  budgetDay: function(){
    return Math.floor(appData.getBudget() / 30);
  },
  getStatusIncome: function(){
    if(appData.getBudget() >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (appData.getBudget() < 1200 && appData.getBudget() >= 600) {
      return 'У вас средний уровень дохода';
    } else if (appData.getBudget() < 600 && appData.getBudget() >= 0) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что то пошло не так';
    }
  },
  checkTarget: function() {
    let budget = appData.getBudget();
    if(budget <= 0){ 
      budget = 'Цель не будет достигнута';
    } else { 
      budget = `Цель будет достигнута за ${appData.getTargetMonth()} месяца(-ев)`;
    }
    return budget;
  },
  getInfoDeposit: function(){
    if (appData.deposit){
      let depositRate, depositRateInfo = 'Какой годовой процент?';
      let depositAmount, depositAmountInfo = 'Какая сумма заложена?';
      appData.percentDeposit = meaning(depositRate, depositRateInfo);
      appData.moneyDeposit = meaning(depositAmount, depositAmountInfo);
    }
  },
  calcSavedMoney: function(){
    return appData.budgetMonth() * +appData.period;
  }
};
appData.asking();
// выводим в консоль величину желаемого накопления
console.log(`Цель заработать ${appData.mission} рублей`);
// выводим в консоль переменную budgetMonth
console.log(`Расходы за месяц: ${appData.getExpensesMonth()}`);
// выводим в консоль срок, за который будет накомплена желаемая сумма mission
console.log(appData.checkTarget());
// вызов функции с определением уровня дохода
console.log(appData.getStatusIncome());
for (let key in appData) {
  console.log('Наша программа включает в себя: ' + key + ' со значением ' + appData[key]);
}
function arrToString(){
  let arr = appData.addExpenses;
  let str = '';
  let newStr = str.split('').join(', ');
  for(let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    newStr += arr[i] + ', ';
  }
  console.log(newStr);
}
arrToString();