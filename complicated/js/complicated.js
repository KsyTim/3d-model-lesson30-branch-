//lesson 02 complicated
let num = 266219;
let newNum = 1;
for (i = 0; i < num.toString().length; i++) {
  newNum *= num.toString()[i];
}
newNum **= 3;
console.log(newNum.toString().slice(0, 2));
