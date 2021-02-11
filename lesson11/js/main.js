'use strict'
//lesson 11 simple
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
// кнопка 'рассчитать'
let calculateButton = document.querySelector('#start');
//  кнопка 'плюс' дополнительный доход
let extraIncome = document.getElementsByTagName('button')[0];
// кнопка 'плюс' обязательные рассходы
let fixedExpenses = document.getElementsByTagName('button')[1];
// чекбокс депозит
let depositCheck = document.querySelector('#deposit-check');
// поля для ввода возможных доходов 
let possibleIncomes = document.querySelectorAll('.additional_income-item');
// дневной бюджет
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
// расходы за месяц
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
// возможные доходы
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
// возможные расходы
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
// накопления за период
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
// срок достижения цели
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
// месячный доход
let monthIncome = document.querySelector('.salary-amount');
// наименование дополнительного дохода
let extraIncomeTitle = document.querySelector('input.income-title');
// наименование статьи обязательных расходов
let fixedExpensesTitle = document.querySelector('input.expenses-title');
// сумма статьи обязательных расходов
let expensesItems = document.querySelectorAll('.expenses-items');
// возможные расходы
let possibleExpenses = document.querySelector('.additional_expenses-item');
// цель
let targetAmount = document.querySelector('.target-amount');
// период
let periodMonth = document.querySelector('.period-select');
// доход за месяц
let incomeMonth = document.querySelector('.budget_month-value');
let incomeItem = document.querySelectorAll('.income-items');
let money;
let moneyInfo = 'Ваш месячный доход?'; 
let appData = {
  start: function(){
    appData.budget = +monthIncome.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();
  },
  showResult: function(){
    incomeMonth.value = appData.budgetMonth();
    budgetDayValue.value = appData.budgetDay();
    expensesMonthValue.value = appData.getExpensesMonth();
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcSavedMoney();
    periodMonth.addEventListener('input', function(){
      incomePeriodValue.value = appData.calcSavedMoney();
    });
    // incomePeriodValue.value = appData.calcSavedMoney();
  },
  addExpensesBlock: function(){
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, fixedExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      fixedExpenses.style.display = 'none';
    }
  },
  addIncomeBlock: function(){
    let cloneIncomeItems = incomeItem[0].cloneNode(true);
    incomeItem[0].parentNode.insertBefore(cloneIncomeItems, extraIncome);
    incomeItem = document.querySelectorAll('.income-items');
    if(incomeItem.length === 3){
      extraIncome.style.display = 'none';
    }
  },
  getExpenses: function(){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function(){
    incomeItem.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = cashIncome;
      }
    });
    for (let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function(){
    let addExpenses = possibleExpenses.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function(){
    possibleIncomes.forEach(function(item){
      let itemValue = item.value.trim();
      if(item.value !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0, 
  budget: 0,
  //  function(){
  //   return appData.start();
  // },  
  getExpensesMonth: function(){
    let sum = 0;
    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    return +sum;
  },  
  expensesMonth: function(){
    return appData.getExpensesMonth();
  },
  getBudget: function(){
    return appData.budget + appData.incomeMonth - appData.expensesMonth();
  },
  budgetMonth: function(){
    return appData.getBudget();
  },
  getTargetMonth: function() {
    return Math.ceil(targetAmount.value / appData.budgetMonth());
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
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    if (appData.deposit){
      let depositRate, depositRateInfo = 'Какой годовой процент?';
      let depositAmount, depositAmountInfo = 'Какая сумма заложена?';
      appData.percentDeposit = meaning(depositRate, depositRateInfo);
      appData.moneyDeposit = meaning(depositAmount, depositAmountInfo);
    }
  },
  calcSavedMoney: function(){
    return appData.budgetMonth() * periodMonth.value;
  }
};

fixedExpenses.addEventListener('click', appData.addExpensesBlock);
extraIncome.addEventListener('click', appData.addIncomeBlock);
periodMonth.addEventListener('input', function(){
  document.querySelector('.period-amount').innerHTML = this.value;
});
monthIncome.addEventListener('change', function(){
  if (monthIncome.value === null || monthIncome.value === ''){
    calculateButton.disabled = true;
    console.log('заблокирована');
  } else {
    console.log('активная');
    calculateButton.disabled = false;
    calculateButton.addEventListener('click', appData.start);
}
})

// calculateButton.disabled = true;
// calculateButton.disabled = false;
// // выводим в консоль величину желаемого накопления
// console.log(`Цель заработать ${appData.mission} рублей`);
// // выводим в консоль переменную budgetMonth
// console.log(`Расходы за месяц: ${appData.getExpensesMonth()}`);
// // выводим в консоль срок, за который будет накомплена желаемая сумма mission
// console.log(appData.checkTarget());
// // вызов функции с определением уровня дохода
// console.log(appData.getStatusIncome());
// for (let key in appData) {
//   console.log('Наша программа включает в себя: ' + key + ' со значением ' + appData[key]);
// }
// function arrToString(){
//   let arr = appData.addExpenses;
//   let str = '';
//   let newStr = str.split('').join(', ');
//   for(let i = 0; i < arr.length; i++) {
//     arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
//     newStr += arr[i] + ', ';
//   }
//   console.log(newStr);
// }
// arrToString();

