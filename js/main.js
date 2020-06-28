'use strict';

let btnStart = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value') [0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value') [0],
    levelValue = document.getElementsByClassName('level-value') [0],
    expensesValue = document.getElementsByClassName('expenses-value') [0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value') [0],
    incomeValue = document.getElementsByClassName('income-value') [0],
    monthSavings = document.getElementsByClassName('monthsavings-value') [0],
    yearSavings = document.getElementsByClassName('yearsavings-value') [0],
    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button') [0],
    optionalExpensesBtn = document.getElementsByTagName('button') [1],
    countBtn = document.getElementsByTagName('button') [2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncomeLabel = document.querySelector('.choose-income-label'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('#sum'),
    percentValue = document.querySelector('#percent'),
    dayValue = document.querySelector('.day-value'),
    monthValue = document.querySelector('.month-value'),
    yearValue = document.querySelector('.year-value');

let money, time;

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};

button[].disabled = true;

btnStart.addEventListener('click', () => {
    time = prompt('Введите дату в формате	YYYY-MM-DD', '');
    money = +prompt('Ваш бюджет на месяц?', '');
    
    while (isNaN(money) || money == '' || money == null) {
        money = prompt('Ваш бюджет?', '');
    }
    appData.budget = money; // Доход
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear(); // Введенные пользователем данные сначала с помощью команды parse превратятся в кол-во милисекунд, прошедших с 1970 года. Потом эти полученные милисекунды используются для создания новой даты. И в конце полученная дата превращается в полный год.
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1; // В конце нужно прибавить единицу для корректного отображения месяца, т.к. в js месяцы (как и многие другие данные) начинаются с 0!!!
    dayValue.value = new Date(Date.parse(time)).getDate();

    button[].disabled = false;
});

// Для инпутов используем метод value!

expensesBtn.addEventListener('click', function() {
    let sum = 0;
    
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
            
        if ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b; //Пара ключ - значение
            sum += +b;
        } else {
            i = i - 1;
        }
        expensesValue.textContent = sum; // Обязательные расходы
    }
});

optionalExpensesBtn.addEventListener('click', function() {
    for (let i = 0; i <= optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' '; // Возможные траты
    }
});

countBtn.addEventListener('click', function() {

    if (appData.budget != undefined) {
        appData.moneyPerDay  = ((appData.budget - +expensesValue.textContent) / 30).toFixed(); // Рассчитываем бюджет на день и округляем его
        dayBudgetValue.textContent = appData.moneyPerDay;
    
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Cредний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Произошла ошибка";
        }
    } else {
        dayBudgetValue.textContent = 'Произошла ошибка';
    }
});

chooseIncome.addEventListener('input', function() { // то что будет вводиться в input будет сразу отображаться и в доп доходе 
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', () => {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent; // Месячный доход
        appData.yearIncome = sum/100*percent; // Годовой доход
        monthSavings.textContent = appData.monthIncome.toFixed(1);
        yearSavings.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent; // Месячный доход
        appData.yearIncome = sum/100*percent; // Годовой доход
        monthSavings.textContent = appData.monthIncome.toFixed(1);
        yearSavings.textContent = appData.yearIncome.toFixed(1);
    }
});

// Событие input возникает когда мы что-то вводим в input
// Событие change возникает, когда мы убираем мышь с inputa и кликаем в другом месте
