const form = document.querySelector('#loanCalculator');

form.addEventListener('submit', runSpinner );

function runSpinner(e) {
    document.querySelector('#results').style.display = 'none';
    document.querySelector('#spinner').style.display = 'block';

    setTimeout(calculate, 2000);

    e.preventDefault();
};

function calculate() {
    
    //INPUTS
    const amountEL = document.querySelector('#loanAmount');
    const interestEL = document.querySelector('#interestRate');
    const timeEL = document.querySelector('#time');    
    
    //OUTPUTS
    const monthlyPaymentEL = document.querySelector('#monthlyPayment');
    const totalInterestEL = document.querySelector('#totalInterest');
    const totalAmountEL = document.querySelector('#totalAmount');

    //CONVERSION
    const principle = parseFloat(amountEL.value);
    const interest = parseFloat(interestEL.value) / 100 /12;
    const payments = parseFloat(timeEL.value) * 12;

    //MONTHLY PAYMENTS
    const a = Math.pow(1 + interest, payments);
    const monthlyPayment = (principle*a*interest)/(a-1);

    if(isFinite(monthlyPayment)) {
        monthlyPaymentEL.value = monthlyPayment.toFixed(2);
        totalAmountEL.value = (monthlyPayment * payments ).toFixed(2);
        totalInterestEL.value = ((monthlyPayment * payments) - principle).toFixed(2);

        document.querySelector('#spinner').style.display = 'none';
        document.querySelector('#results').style.display = 'block';
    } else {
        document.querySelector('#spinner').style.display = 'none';
        document.querySelector('#results').style.display = 'none';
        showError('Check Again')
    };
    
};

function showError(error) {

    const errorDiv = document.createElement('div')
    const title = document.querySelector
    errorDiv.className = 'alert alert-danger';

    errorDiv.appendChild(document.createTextNode(error));

    const formTitle = document.querySelector('#formTitle')

    form.insertBefore(errorDiv, formTitle);

    setTimeout(removeError, 2500);

};

function removeError() {
    document.querySelector('.alert').remove();
};