const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');

let data = [];


addUserBtn.addEventListener('click', getUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortRichest);
showMillionaireBtn.addEventListener('click', showMill);
calculateBtn.addEventListener('click', calculateWealth);


/* function getUser() {
    fetch('https://randomuser.me/api')
        .then(res => res.json())
        .then(data => {

            const user = data.results[0].name.first + ' ' + data.results[0].name.last
            console.log(user);
        })
} */

async function getUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const newUser = {
        name: data.results[0].name.first + ' ' + data.results[0].name.last,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

//Double Money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    });
    updateDOM();
}

//Sort by richest
function sortRichest() {
    data.sort((a, b) => {
        return b.money - a.money
    });
    updateDOM();
}

//FIlter only Millionaires
function showMill() {
    data = data.filter(n => n.money > 1000000);

    updateDOM();
}

//Calculate the total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong> </h3>`;
    main.appendChild(wealthEl);
}

//Add new obj to data arr
function addData(obj) {
    data.push(obj);
    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
    //clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

//Format number 
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}



getUser();
getUser();
getUser();
