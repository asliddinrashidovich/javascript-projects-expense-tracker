const totalBalance = document.getElementById('total__balance');
const incomeBalance = document.getElementById('income__balance');
const expenseBalance = document.getElementById('expense__balance');
const totalList = document.getElementById('expense__list');
const expenseRadio = document.getElementById('expense__radio');
const incomeRadio = document.getElementById('income__radio');
const expenseLabel = document.getElementById('expence__label');
const incomeLabel = document.getElementById('income__label');
const form = document.getElementById('form');



let transactions = JSON.parse(localStorage.getItem('list')) ?  JSON.parse(localStorage.getItem('list')) : []
if (transactions.length) decleareValues()

// setLocaltorage Function
function setTransactions() {
    localStorage.setItem('list', JSON.stringify(transactions));
}

// decleare innerHTMl
function decleareValues() {
    let transactions = JSON.parse(localStorage.getItem('list'));

    let totalValue = 0;
    let incomeValue = 0;
    let expenseValue = 0;

    totalList.innerHTML = '';
    transactions.forEach((item, i) => {
        totalList.innerHTML += `
             <li>
                <div class="list__title">
                    <h4>${item.name}</h4>
                    <p>${formatDate(item.date)}</p>
                </div>
                <h3 class="list__value ${item.benefit ? 'income__color' : 'expense__color'}">${item.benefit ? '+': '-'}${item.amount}.00</h3>
                 <div class="list__delete" onclick="deleteList(${i})">
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </div>
            </li>
        `
        if(item.benefit) {
            incomeValue += +item.amount;
        } else {
            expenseValue += +item.amount;
        }
        totalValue = (incomeValue - expenseValue);
    });

    totalBalance.innerHTML = `$${formatNumber(totalValue)}.00`;
    incomeBalance.innerHTML = `+$${formatNumber(incomeValue)}.00`
    expenseBalance.innerHTML = `-$${formatNumber(expenseValue)}.00`
}

// format number
function formatNumber(num) {
    return num.toLocaleString();
}

// format date;
function formatDate(date) {
    return date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0,4)
}

// form Submit event
form.addEventListener('submit', (e)=> {
    e.preventDefault();

    const nameValue = form['name'].value;
    const amountValue = form['amount'].value;
    const dateValue = form['date'].value;

    transactions.push(
        {
            name:  nameValue,
            amount: amountValue,
            date: dateValue,
            benefit: checkedType(),
        }
    )
    setTransactions()
    decleareValues()
    form.reset()
})  

// checked type
function checkedType() {
    if(incomeLabel.classList.contains('checked')) {
       return true
    }else {
        return false
    }
}

// checkedType event
expenseLabel.addEventListener('click', ()=> {
    expenseLabel.classList.add('checked');
    incomeLabel.classList.remove('checked');
})
incomeRadio.addEventListener('click', ()=> {
    expenseLabel.classList.remove('checked');
    incomeLabel.classList.add('checked');
})

// delete List

function deleteList(id) {
    let newTransactions = transactions.filter((item, i) => {
        return id !== i
    })

    transactions = newTransactions;
    setTransactions()
    decleareValues()
}