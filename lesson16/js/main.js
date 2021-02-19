'use strict'
// кнопка 'рассчитать'
const calculateButton = document.getElementById('start'),
    // кнопка 'сбросить'
    resetButton = document.getElementById('cancel'),
    //  кнопка 'плюс' дополнительный доход
    extraIncome = document.getElementsByTagName('button')[0],
    // кнопка 'плюс' обязательные рассходы
    fixedExpenses = document.getElementsByTagName('button')[1],
    // чекбокс депозит
    depositCheck = document.querySelector('#deposit-check'),
    // поля для ввода возможных доходов 
    possibleIncomes = document.querySelectorAll('.additional_income-item'),
    // дневной бюджет
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    // расходы за месяц
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    // возможные доходы
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    // возможные расходы
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
     // накопления за период
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    // срок достижения цели
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    // возможные расходы
    possibleExpenses = document.querySelector('.additional_expenses-item'),
    // цель
    targetAmount = document.querySelector('.target-amount'),
     // период
    periodMonth = document.querySelector('.period-select'),
    // доход за месяц
    incomeMonth = document.querySelector('.budget_month-value'),
    depositBank = document.querySelector('.deposit-bank');
// месячный доход
let monthIncome = document.querySelector('.salary-amount'),
    // наименование дополнительного дохода
    extraIncomeTitle = document.querySelectorAll('input.income-title'),
    extraIncomeAmount = document.querySelectorAll('input.income-amount'),
    // наименование статьи обязательных расходов
    fixedExpensesTitle = document.querySelectorAll('input.expenses-title'),
    fixedExpensesAmount = document.querySelectorAll('input.expenses-amount'),
    // сумма статьи обязательных расходов
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItem = document.querySelectorAll('.income-items'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

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
    this.getExpInc();
    // this.getIncome();
    // this.getExpenses();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
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
  }
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
  }
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
  getExpInc(){
    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if(itemTitle !== '' && itemAmount !== ''){
        this[startStr][itemTitle] = +itemAmount;
      }
    };
    incomeItem.forEach(count); 
    expensesItems.forEach(count);
    for (let key in this.income){
      this.incomeMonth += this.income[key];
    }
  }
  getAddExpenses(){
    // const _this = this; 
    let addExpenses = possibleExpenses.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== ''){
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome(){
    // const _this = this; 
    possibleIncomes.forEach((item) => {
      let itemValue = item.value.trim();
      if(item.value !== ''){
        this.addIncome.push(itemValue);
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
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    return this.budget + this.incomeMonth - this.expensesMonth() + monthDeposit;
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
    this.getBudget() >= 1200 ? console.log('У вас высокий уровень дохода') :
      this.getBudget() < 1200 && this.getBudget() >= 600 ? console.log('У вас средний уровень дохода') :
        this.getBudget() < 600 && this.getBudget() >= 0 ? console.log('К сожалению у вас уровень дохода ниже среднего') : console.log('Что то пошло не так');
  }
  checkTarget() {
    const _this = this;
    let budget = this.getBudget();
    budget <= 0 ? budget = 'Цель не будет достигнута' : budget = `Цель будет достигнута за ${_this.getTargetMonth()} месяца(-ев)`;
    return budget;
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
    inputGroup.forEach( (item) => {
      item.setAttribute('readonly', 1);
    });    
  }
  inputUnblock(){
    const inputGroup = document.querySelectorAll('input[type = "text"]');
    inputGroup.forEach((item) => {
      item.removeAttribute('readonly');
    });  
  }
  resetPre(){
      calculateButton.style.display = 'none';
      resetButton.style.display = 'block';
  }
  resetAll(){
    const allElems = document.querySelectorAll('input');
    allElems.forEach((item) => {
      item.value = '';
    });
    periodMonth.value = 1;
    document.querySelector('.period-amount').innerHTML = periodMonth.value;
    this.addExpenses.splice(0, this.addExpenses.length);
    this.addIncome.splice(0, this.addIncome.length);
    this.budget = 0;
    this.incomeMonth = 0;
    targetMonthValue.value = '';
    depositCheck.checked = false;
    this.checkIncome();
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositPercent.style.display = 'none';
  } 
  resetEvent(){
    resetButton.style.display = 'none';
    calculateButton.style.display = 'block';
  }
  checkDeposit(){
    depositPercent = document.querySelector('.deposit-percent');
    if (!(+depositPercent.value) || +depositPercent.value <= 0 || +depositPercent.value > 100) {
      calculateButton.disabled = true;
      console.log('заблокирована');
    }  else {
      console.log('активная');
      calculateButton.disabled = false;
    }
  }  
  checkIncome(){
    monthIncome = document.querySelector('.salary-amount');
    if (!(+monthIncome.value) || +monthIncome.value <= 0 || monthIncome.value === ''){
        calculateButton.disabled = true;
        console.log('заблокирована');
    } else {
      console.log('активная');
      calculateButton.disabled = false;
    }
  }
  getInfoDeposit(){
    if(this.deposit){
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  changePercent(){
    const selectedValue = this.value;
    if(selectedValue === 'other'){ 
      depositPercent.style.display = 'inline-block';
      depositPercent.addEventListener('change', function () {
        depositPercent = document.querySelector('.deposit-percent');
        if (!(+this.value) || +this.value <= 0 || +this.value > 100){
          alert('Введите корректное значение в поле проценты');
          depositPercent.value = this.value;
        }
      });
    } else {
      depositPercent.style.display = 'none';
      console.log('активная');
      calculateButton.disabled = false;
      depositPercent.value = selectedValue;
    }
  }
  depositHandler(){
    const _this = this;
    if(depositCheck.checked){
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
      _this.checkDeposit();
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = true;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  eventListeners(){
    const _this = this;
    // функция, которая обрабатывает событие по кнопке "рассчитать" в калькуляторе
    monthIncome.addEventListener('change', _this.checkIncome.bind(_this));
    depositPercent.addEventListener('change', _this.checkDeposit.bind(_this));
    this.checkIncome();
    calculateButton.addEventListener('click', _this.start.bind(_this));  
    calculateButton.addEventListener('click', () => {
      _this.inputBlock();
    });
    // клик по кнопке обязательные расходы добавляет дополнительные блоки для заполнения
    fixedExpenses.addEventListener('click', () => {
      // const elemClass = this.parentElement.className;
      // _this.addExpIncBlock(expensesItems, fixedExpenses, fixedExpensesTitle, fixedExpensesAmount, elemClass);
      _this.addExpensesBlock();
    });
    // клик по кнопке дополнительные доходы добавляет дополнительные блоки для заполнения
    extraIncome.addEventListener('click', () => {
      _this.addIncomeBlock();
      // const elemClass = this.parentElement.className;
      // _this.addExpIncBlock(incomeItem, extraIncome, extraIncomeTitle, extraIncomeAmount, elemClass);
    });
    // обработчик события на инпуте типа range, для отображения числового значения 
    periodMonth.addEventListener('input', () => {
      document.querySelector('.period-amount').innerHTML = periodMonth.value;
    });
    // присвоим паттерн инпутам, где необходимо ввести строковое значение
    const placeholderName = document.querySelectorAll('input[placeholder="Наименование"');
    placeholderName.forEach((item) => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^\.\,\-\_\'\"\@\?\!\:\$ А-ЯЁа-яё()]/g, '');
      });
    });
    // присвоим паттерн инпутам, где необходимо ввести числовое значение
    const placeholderSum = document.querySelectorAll('input[placeholder="Сумма"');
    placeholderSum.forEach((item) => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^0-9]/g, '');
      });
    });
    resetButton.addEventListener('click', () => {
      _this.reset();
    });
    depositCheck.addEventListener('change', _this.depositHandler.bind(_this));
  }
  // метод, при сбросе удаляющий дополнительные инпуты
  addIncomeUnBlock(){
    incomeItem = document.querySelectorAll('.income-items');
    if(incomeItem.length > 1){
      const variable = Array.prototype.slice.call(incomeItem, 1);
      variable.forEach((item) => {
        item.parentNode.removeChild(item);
      });
      extraIncome.style.display = 'block';
    } else if (incomeItem.length === 0 || incomeItem.length === 1){
      const inc = this.income;
      for(let i in inc){
        delete inc[i];
      }
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
      const exp = this.expenses;
      for(let i in exp){
        delete exp[i];
      }
    }
  }
}  

const appData = new AppData();
appData.eventListeners();