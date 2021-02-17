'use strict'
//lesson 14 simple
// создаем функцию, которая будет обрабатывать входные данные от пользователя на null, undefined, '', NaN
let meaning = function checkNumMeaning(variable, info) {
  do {
    variable = +prompt('Пожалуйста введите ' + info);
  } while (!variable || variable <=0);
  return variable;
};
// создаем функцию, которая будет обрабатывать входные данные от пользователя на null, undefined, '', NaN и чтобы принимала строковые и числовые значения, но при этом не начиналась с числа
let meaningStr = function checkStrMeaning(variable, info) {
  do {
    variable = prompt('Пожалуйста введите ' + info);
  } while (!variable || variable.includes(+variable));
  return variable;
};
// кнопка 'рассчитать'
let calculateButton = document.getElementById('start');
// кнопка 'сбросить'
let resetButton = document.getElementById('cancel');
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
let extraIncomeTitle = document.querySelectorAll('input.income-title');
let extraIncomeAmount = document.querySelectorAll('input.income-amount');
// наименование статьи обязательных расходов
let fixedExpensesTitle = document.querySelectorAll('input.expenses-title');
let fixedExpensesAmount = document.querySelectorAll('input.expenses-amount');
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


const AppData = function () {
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
};
// метод объекта, который приводит в действие основные методы объекта, в том числе выводит данные результирующего метода объекта showResult в соответсвующие инпуты калькулятора
AppData.prototype.start = function(){
  const _this = appData;
  _this.budget = +monthIncome.value;
  _this.getExpenses();
  _this.getIncome();
  _this.getExpensesMonth();
  _this.getAddExpenses();
  _this.getAddIncome();
  _this.getBudget();
  _this.showResult();
  _this.inputBlock();
  _this.resetPre();
};
// метод объекта, который присваивает значения переменных свойствам объекта
AppData.prototype.showResult = function(){
  const _this = this; 
  incomeMonth.value = this.budgetMonth();
  budgetDayValue.value = this.budgetDay();
  expensesMonthValue.value = this.getExpensesMonth();
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcSavedMoney();
  periodMonth.addEventListener('input', function(){
    incomePeriodValue.value = _this.calcSavedMoney();
  });
};
// метод объекта, добавляющие валидные блоки с обязательными рассходами
AppData.prototype.addExpensesBlock = function(){
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, fixedExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      fixedExpenses.style.display = 'none';
    }
    fixedExpensesTitle = document.querySelectorAll('input.expenses-title');
    fixedExpensesAmount = document.querySelectorAll('input.expenses-amount');
    if(fixedExpensesTitle.length === 2 && fixedExpensesAmount.length === 2){
      fixedExpensesTitle[1].value = '';
      fixedExpensesAmount[1].value = '';
    } else if (fixedExpensesTitle.length === 3 && fixedExpensesAmount.length === 3){
      fixedExpensesTitle[2].value = '';
      fixedExpensesAmount[2].value = '';
    }
};
// метод объекта, добавляющие валидные блоки с дополнительными доходами
AppData.prototype.addIncomeBlock = function(){
  let cloneIncomeItems = incomeItem[0].cloneNode(true);
  incomeItem[0].parentNode.insertBefore(cloneIncomeItems, extraIncome);
  incomeItem = document.querySelectorAll('.income-items');
  if(incomeItem.length === 3){
    extraIncome.style.display = 'none';
  }
  extraIncomeTitle = document.querySelectorAll('input.income-title');
  extraIncomeAmount = document.querySelectorAll('input.income-amount');
  if(extraIncomeTitle.length === 2 && extraIncomeAmount.length === 2){
    extraIncomeTitle[1].value = '';
    extraIncomeAmount[1].value = '';
  } else if (extraIncomeTitle.length === 3 && extraIncomeAmount.length === 3){
    extraIncomeTitle[2].value = '';
    extraIncomeAmount[2].value = '';
  }
};
// метод объекта, присваивающий значение свойству(объект expenses) объекта с рассходами
AppData.prototype.getExpenses = function(){
  const _this = this; 
  expensesItems.forEach(function(item){
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== ''){
      _this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};
// метод объекта, присваивающий значение свойству(объект income) объекта с доходами
AppData.prototype.getIncome = function(){
  const _this = this; 
  incomeItem.forEach(function(item){
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== ''){
      _this.income[itemIncome] = cashIncome;
    }
  });
  for (let key in this.income){
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getAddExpenses = function(){
  const _this = this; 
  let addExpenses = possibleExpenses.value.split(',');
  addExpenses.forEach(function(item){
    item = item.trim();
    if (item !== ''){
      _this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function(){
  const _this = this; 
  possibleIncomes.forEach(function(item){
    let itemValue = item.value.trim();
    if(item.value !== ''){
      _this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getExpensesMonth = function(){
  let sum = 0;
  for (let key in this.expenses) {
    sum += this.expenses[key];
  }
  return +sum;
};  
AppData.prototype.expensesMonth = function(){
  return this.getExpensesMonth();
};
AppData.prototype.getBudget = function(){
  return this.budget + this.incomeMonth - this.expensesMonth();
};
AppData.prototype.budgetMonth = function(){
  return this.getBudget();
};
AppData.prototype.getTargetMonth = function() {
  return Math.ceil(targetAmount.value / this.budgetMonth());
};
AppData.prototype.budgetDay = function(){
  return Math.floor(this.getBudget() / 30);
};
AppData.prototype.getStatusIncome = function(){
  const _this = this;
  if(_this.getBudget() >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (_this.getBudget() < 1200 && _this.getBudget() >= 600) {
    return 'У вас средний уровень дохода';
  } else if (_this.getBudget() < 600 && _this.getBudget() >= 0) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else {
    return 'Что то пошло не так';
  }
};
AppData.prototype.checkTarget = function() {
  const _this = this;
  let budget = this.getBudget();
  if(budget <= 0){ 
    budget = 'Цель не будет достигнута';
  } else { 
    budget = `Цель будет достигнута за ${_this.getTargetMonth()} месяца(-ев)`;
  }
  return budget;
};
AppData.prototype.getInfoDeposit = function(){
  const _this = this;
  _this.deposit = confirm('Есть ли у вас депозит в банке?');
  if (_this.deposit){
    let depositRate, depositRateInfo = 'Какой годовой процент?';
    let depositAmount, depositAmountInfo = 'Какая сумма заложена?';
    _this.percentDeposit = meaning(depositRate, depositRateInfo);
    _this.moneyDeposit = meaning(depositAmount, depositAmountInfo);
  }
};
AppData.prototype.calcSavedMoney =function(){
  return this.budgetMonth() * periodMonth.value;
};
AppData.prototype.reset = function(){
  this.resetAll();
  this.resetEvent();
  this.resetAll();
  this.inputUnblock();
};
AppData.prototype.inputBlock = function(){
  let inputGroup = document.querySelectorAll('input[type = "text"]');
  inputGroup.forEach(function(item){
    item.setAttribute('readonly', 1);
  });    
  // console.log('инпуты заблокированы');
};
AppData.prototype.inputUnblock = function(){
  let inputGroup = document.querySelectorAll('input[type = "text"]');
  inputGroup.forEach(function(item){
    item.removeAttribute('readonly');
  });  
};
AppData.prototype.resetPre = function(){
    calculateButton.style.display = 'none';
    resetButton.style.display = 'block';
};
AppData.prototype.resetAll = function(){
  const _this = this;
  let allElems = document.querySelectorAll('input');
  allElems.forEach(function (item) {
    item.value = '';
  });
  periodMonth.value = 1;
  document.querySelector('.period-amount').innerHTML = periodMonth.value;
  this.addExpenses.splice(0, this.addExpenses.length);
  const exp = _this.expenses;
  for(let i in exp){
    delete exp[i];
  }
  this.addIncome.splice(0, this.addIncome.length);
  this.budget = 0;
  const inc = this.income;
  for(let i in inc){
    delete inc[i];
  }
  _this.incomeMonth = 0;
  targetMonthValue.value = '';
}; 
AppData.prototype.resetEvent = function(){
  resetButton.style.display = 'none';
  calculateButton.style.display = 'block';
};

AppData.prototype.eventListeners = function(){
  const _this = this;
  // функция, которая обрабатывает событие по кнопке "рассчитать" в калькуляторе
  monthIncome.addEventListener('change', function(){
    if (!(+monthIncome.value) || +monthIncome.value <= 0){
    calculateButton.disabled = true;
    console.log('заблокирована');
    } else {
      console.log('активная');
      calculateButton.disabled = false;
      // привязsdftv контекст вызова функции start к объекту appData 
      calculateButton.addEventListener('click', _this.start.bind(this));  
      calculateButton.addEventListener('click', function(){
        _this.inputBlock();
      });
    }
  });
  // клик по кнопке обязательные расходы добавляет дополнительные блоки для заполнения
  fixedExpenses.addEventListener('click', function(){
    _this.addExpensesBlock();
  });
  // клик по кнопке дополнительные доходы добавляет дополнительные блоки для заполнения
  extraIncome.addEventListener('click', _this.addIncomeBlock);
  // обработчик события на инпуте типа range, для отображения числового значения 
  periodMonth.addEventListener('input', function(){
    document.querySelector('.period-amount').innerHTML = this.value;
  });
  // присвоим паттерн инпутам, где необходимо ввести строковое значение
  let placeholderName = document.querySelectorAll('input[placeholder="Наименование"');
  placeholderName.forEach(function(item){
    item.addEventListener('input', function(){
      item.value = item.value.replace(/[^\.\,\-\_\'\"\@\?\!\:\$ А-ЯЁа-яё()]/g, '');
    });
  });
  // присвоим паттерн инпутам, где необходимо ввести числовое значение
  let placeholderSum = document.querySelectorAll('input[placeholder="Сумма"');
  placeholderSum.forEach(function(item){
    item.addEventListener('input', function(){
      item.value = item.value.replace(/[^0-9]/g, '');
    });
  });
  resetButton.addEventListener('click', function () {
    _this.reset();
  });
}

const appData = new AppData();
appData.eventListeners();




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

