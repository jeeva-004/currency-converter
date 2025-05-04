const currency = document.querySelectorAll('select');
const btn = document.querySelector('button');
const amount = document.querySelector('#input');
const result = document.querySelector('#result');
const rate = document.querySelector('#rate');   
// display the currencies in the select tag
fetch('https://api.frankfurter.app/latest')
    .then(res => res.json())
    .then(data => {
        const rates = Object.keys(data.rates)
        rates.forEach((lang) => {
           let opt =  `<option value="${lang}">${lang}</option>`;
           currency[0].innerHTML += opt;
           currency[1].innerHTML += opt;
        })
    })

// convert the currency

btn.addEventListener('click', () => {
    const from = currency[0].value;
    const to = currency[1].value;
    const amountValue = amount.value;
    if (from === to) {
       alert(`You have to select different currencies`);
    }
    fetch(`https://api.frankfurter.app/latest?amount=${amountValue}&from=${from}&to=${to}`)
        .then(res => res.json())
})