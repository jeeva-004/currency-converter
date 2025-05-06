const currency = document.querySelectorAll('select');
const btn = document.querySelector('button');
const amount = document.querySelector('#input');
const result = document.querySelector('#result');
const error = document.querySelector('.error');
// display the currencies in the select tag
fetch('https://api.frankfurter.app/latest')
    .then(res => res.json())
    .then(data => {
        const rates = Object.keys(data.rates)
        rates.forEach((lang) => {
            let opt = `<option value="${lang}">${lang}</option>`;
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
        error.style.display = 'block';
        error.innerHTML = 'Please select different currencies';
    }
    else if (amountValue === '') {
        error.style.display = 'block';
        error.innerHTML = 'Please enter a valid amount';
    }
    else {
        error.style.display = 'none';
    }

    fetch(`https://api.frankfurter.app/latest?amount=${amountValue}&from=${from}&to=${to}`).then(res => res.json()).then(data => {
        if (data.rates && data.rates[to] !== undefined) {
            const rate = data.rates[to];
            result.value = rate;
        }
    })
        .catch(err => {
            error.style.display = 'block';
            error.innerHTML = 'Something went wrong. Please try again later.';
        })
})
