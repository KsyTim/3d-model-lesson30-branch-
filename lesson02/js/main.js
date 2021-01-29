//lesson 02 simple
let money = 42000;
    income = 'freelance';
    addExpenses = 'FEES, MEDICINES, ENTERTAINS';
    deposit = false;
    mission = 400000;
    period = 8;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Period is ${period} months`);
console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log(budgetDay);
