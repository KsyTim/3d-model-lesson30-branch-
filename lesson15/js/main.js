'use strict'
// кнопка 'рассчитать'
const calculateButton = document.getElementById('start');
// кнопка 'сбросить'
const resetButton = document.getElementById('cancel');
//  кнопка 'плюс' дополнительный доход
const extraIncome = document.getElementsByTagName('button')[0];
// кнопка 'плюс' обязательные рассходы
const fixedExpenses = document.getElementsByTagName('button')[1];
// чекбокс депозит
const depositCheck = document.querySelector('#deposit-check');
// поля для ввода возможных доходов 
const possibleIncomes = document.querySelectorAll('.additional_income-item');
// дневной бюджет
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
// расходы за месяц
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
// возможные доходы
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
// возможные расходы
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
// накопления за период
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
// срок достижения цели
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
// месячный доход
const monthIncome = document.querySelector('.salary-amount');
// наименование дополнительного дохода
let extraIncomeTitle = document.querySelectorAll('input.income-title');
let extraIncomeAmount = document.querySelectorAll('input.income-amount');
// наименование статьи обязательных расходов
let fixedExpensesTitle = document.querySelectorAll('input.expenses-title');
let fixedExpensesAmount = document.querySelectorAll('input.expenses-amount');
// сумма статьи обязательных расходов
let expensesItems = document.querySelectorAll('.expenses-items');
// возможные расходы
const possibleExpenses = document.querySelector('.additional_expenses-item');
// цель
const targetAmount = document.querySelector('.target-amount');
// период
const periodMonth = document.querySelector('.period-select');
// доход за месяц
const incomeMonth = document.querySelector('.budget_month-value');
let incomeItem = document.querySelectorAll('.income-items');

class AppData {
  constructor(){
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
  }

  // метод объекта, который приводит в действие основные методы объекта, в том числе выводит данные результирующего метода объекта showResult в соответсвующие инпуты калькулятора
  start(){    
    this.budget = +monthIncome.value;
    // this.getExpInc();
    this.getIncome();
    this.getExpenses();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
    this.inputBlock();
    this.resetPre();
  }
  // метод объекта, который присваивает значения переменных свойствам объекта
  showResult(){
    incomeMonth.value = this.budgetMonth();
    budgetDayValue.value = this.budgetDay();
    expensesMonthValue.value = this.getExpensesMonth();
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    periodMonth.addEventListener('input', () => {
      incomePeriodValue.value = this.calcSavedMoney();
    });
  }

  addExpensesBlock(){
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
  addIncomeBlock(){
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



  // метод объекта, добавляющие валидные блоки с обязательными рассходами
  // метод объекта, добавляющие валидные блоки с дополнительными доходами
  // addExpIncBlock(item, button, itemTitle, itemAmount, elemClass){
  //     const cloneItems = item[0].cloneNode(true);
  //     item[0].parentNode.insertBefore(cloneItems, button);
  //     item = document.querySelectorAll(`.${elemClass}-items`);
  //     console.log(item);
  //     if(item.length === 3){
  //       button.style.display = 'none';
  //     }
  //     itemTitle = document.querySelectorAll(`input.${elemClass}-title`);
  //     itemAmount = document.querySelectorAll(`input.${elemClass}-amount`);
  //     if(itemTitle.length === 2 && itemAmount.length === 2){
  //       itemTitle[1].value = '';
  //       itemAmount[1].value = '';
  //     } else if (itemTitle.length === 3 && itemAmount.length === 3){
  //       itemTitle[2].value = '';
  //       itemAmount[2].value = '';
  //     }
  // }




  // метод объекта, присваивающий значение свойству(объект expenses) объекта с рассходами
  // метод объекта, присваивающий значение свойству(объект income) объекта с доходами
  // getExpInc(){
  //   const count = item => {
  //     const startStr = item.className.split('-')[0];
  //     const itemTitle = item.querySelector(`.${startStr}-title`).value;
  //     const itemAmount = item.querySelector(`.${startStr}-amount`).value;
  //     if(itemTitle !== '' && itemAmount !== ''){
  //       this[startStr][itemTitle] = itemAmount;
  //     }
  //   };
  //   incomeItem.forEach(count); 
  //   expensesItems.forEach(count);
  //   for (let key in this.income){
  //     this.incomeMonth += +this.income[key];
  //   }
  // }
  // метод объекта, присваивающий значение свойству(объект expenses) объекта с рассходами
  getExpenses(){
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }
  // метод объекта, присваивающий значение свойству(объект income) объекта с доходами
  getIncome(){
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
  }
  getAddExpenses(){
    const _this = this; 
    let addExpenses = possibleExpenses.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== ''){
        _this.addExpenses.push(item);
      }
    });
  }
  getAddIncome(){
    const _this = this; 
    possibleIncomes.forEach(function(item){
      let itemValue = item.value.trim();
      if(item.value !== ''){
        _this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth(){
    let sum = 0;
    for (let key in this.expenses) {
      sum += this.expenses[key];
    }
    return +sum;
  }
  expensesMonth(){
    return this.getExpensesMonth();
  }
  getBudget(){
    return this.budget + this.incomeMonth - this.expensesMonth();
  }
  budgetMonth(){
    return this.getBudget();
  }
  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth());
  }
  budgetDay(){
    return Math.floor(this.getBudget() / 30);
  }
  getStatusIncome(){
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
  }
  checkTarget() {
    const _this = this;
    let budget = this.getBudget();
    if(budget <= 0){ 
      budget = 'Цель не будет достигнута';
    } else { 
      budget = `Цель будет достигнута за ${_this.getTargetMonth()} месяца(-ев)`;
    }
    return budget;
  }
  getInfoDeposit(){
    const _this = this;
    _this.deposit = confirm('Есть ли у вас депозит в банке?');
    if (_this.deposit){
      let depositRate, depositRateInfo = 'Какой годовой процент?';
      let depositAmount, depositAmountInfo = 'Какая сумма заложена?';
      _this.percentDeposit = meaning(depositRate, depositRateInfo);
      _this.moneyDeposit = meaning(depositAmount, depositAmountInfo);
    }
  }
  calcSavedMoney(){
    return this.budgetMonth() * periodMonth.value;
  }
  reset(){
    this.resetAll();
    this.resetEvent();
    this.resetAll();
    this.inputUnblock();
    this.addIncomeUnBlock();
    this.addExpensesUnBlock();
  }
  inputBlock(){
    const inputGroup = document.querySelectorAll('input[type = "text"]');
    inputGroup.forEach(function(item){
      item.setAttribute('readonly', 1);
    });    
    // console.log('инпуты заблокированы');
  }
  inputUnblock(){
    const inputGroup = document.querySelectorAll('input[type = "text"]');
    inputGroup.forEach(function(item){
      item.removeAttribute('readonly');
    });  
  }
  resetPre(){
      calculateButton.style.display = 'none';
      resetButton.style.display = 'block';
  }
  resetAll(){
    const allElems = document.querySelectorAll('input');
    allElems.forEach(function (item) {
      item.value = '';
    });
    periodMonth.value = 1;
    document.querySelector('.period-amount').innerHTML = periodMonth.value;
    this.addExpenses.splice(0, this.addExpenses.length);
    const exp = this.expenses;
    for(let i in exp){
      delete exp[i];
    }
    this.addIncome.splice(0, this.addIncome.length);
    this.budget = 0;
    const inc = this.income;
    for(let i in inc){
      delete inc[i];
    }
    this.incomeMonth = 0;
    targetMonthValue.value = '';
    depositCheck.checked = false;
  } 
  resetEvent(){
    resetButton.style.display = 'none';
    calculateButton.style.display = 'block';
  }
  eventListeners(){
    const _this = this;
    // функция, которая обрабатывает событие по кнопке "рассчитать" в калькуляторе
    monthIncome.addEventListener('change', function(){
      if (!(+monthIncome.value) || +monthIncome.value <= 0 || monthIncome.value === ''){
      calculateButton.disabled = true;
      console.log('заблокирована');
      } else {
        console.log('активная');
        calculateButton.disabled = false;
        // привязsdftv контекст вызова функции start к объекту appData 
        calculateButton.addEventListener('click', _this.start.bind(_this));  
        calculateButton.addEventListener('click', function(){
          _this.inputBlock();
        });
      }
    });
    // клик по кнопке обязательные расходы добавляет дополнительные блоки для заполнения
    fixedExpenses.addEventListener('click', function(){
      // const elemClass = this.parentElement.className;
      // _this.addExpIncBlock(expensesItems, fixedExpenses, fixedExpensesTitle, fixedExpensesAmount, elemClass);
      _this.addExpensesBlock();
    });
    // клик по кнопке дополнительные доходы добавляет дополнительные блоки для заполнения
    extraIncome.addEventListener('click', function() {
      _this.addIncomeBlock();
      // const elemClass = this.parentElement.className;
      // _this.addExpIncBlock(incomeItem, extraIncome, extraIncomeTitle, extraIncomeAmount, elemClass);
    });
    // обработчик события на инпуте типа range, для отображения числового значения 
    periodMonth.addEventListener('input', function(){
      document.querySelector('.period-amount').innerHTML = this.value;
    });
    // присвоим паттерн инпутам, где необходимо ввести строковое значение
    const placeholderName = document.querySelectorAll('input[placeholder="Наименование"');
    placeholderName.forEach(function(item){
      item.addEventListener('input', function(){
        item.value = item.value.replace(/[^\.\,\-\_\'\"\@\?\!\:\$ А-ЯЁа-яё()]/g, '');
      });
    });
    // присвоим паттерн инпутам, где необходимо ввести числовое значение
    const placeholderSum = document.querySelectorAll('input[placeholder="Сумма"');
    placeholderSum.forEach(function(item){
      item.addEventListener('input', function(){
        item.value = item.value.replace(/[^0-9]/g, '');
      });
    });
    resetButton.addEventListener('click', function () {
      _this.reset();
    });
  }
  // метод, при сбросе удаляющий дополнительные инпуты
  addIncomeUnBlock(){
    incomeItem = document.querySelectorAll('.income-items');
    if(incomeItem.length > 1){
      const variable = Array.prototype.slice.call(incomeItem, 1);
      variable.forEach((item) =>{
        item.parentNode.removeChild(item);
      });
      extraIncome.style.display = 'block';
    } else if (incomeItem.length === 0 || incomeItem.length === 1){
      console.log(this);
    }
  }
  addExpensesUnBlock(){
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length > 1){
      const variable = Array.prototype.slice.call(expensesItems, 1);
      variable.forEach((item) =>{
        item.parentNode.removeChild(item);
      });
      fixedExpenses.style.display = 'block';
    } else if (expensesItems.length === 0 || expensesItems.length === 1){
      console.log(this);
    }
  }
}  

const appData = new AppData();
appData.eventListeners();