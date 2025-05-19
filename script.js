// Player name logic
const registrationForm = document.getElementById('registration');
const nameForm = document.getElementById('name-form');
const nameInput = document.querySelector('#name');
const gameEl = document.querySelector('#main');

registrationForm.addEventListener('submit', (event) => {
    const greetingsEl = document.getElementById('player-name');
    event.preventDefault();

    if (!validateUserName(nameInput.value)) return;

    greetingsEl.textContent = `Hi ${nameInput.value}`;
    gameEl.style.display = 'flex';
    nameForm.style.marginTop = '0';
});

function validateUserName(name) {
    name = name.trim();
    if (!name) {
        alert('Please enter your name!');
        nameInput.focus();
        return false;
    }

    if (name.length < 3) {
        alert('Your name should be at least 3 char long!');
        nameInput.focus();
        return false;
    }

    return true;
}

// Phone logic
const passcodeEl = document.getElementById('passcode');
const keypadEl = document.querySelector('.keypad');

keypadEl.addEventListener('click', event => {
    event.preventDefault();    
    if (!validateKeypad(event.target)) return;

    const num = event.target.textContent;
    if (passcodeEl.textContent.includes('*')) {
        passcodeEl.textContent = num;
    } else {
        passcodeEl.textContent += num;
    }
});

function validateKeypad(button) {
    if (button.id === 'remove-num') {
        passcodeEl.textContent = passcodeEl.textContent.slice(0, -1);
        return false;
    }

    return button.tagName === 'BUTTON' && passcodeEl.textContent.length < 3;
}

// Check number logic
const greaterTable = document.getElementById('greater');
const lessTable = document.getElementById('less');
const checkBtn = document.getElementById('btn-check');

let passcodeNum = Math.floor(Math.random() * 101);
let counter = 0;
console.log('pass: ' + passcodeNum);

checkBtn.addEventListener('click', () => {
    const userNum = Number(passcodeEl.textContent);
    if (!validateNumbers(userNum)) {
        return;
    }
    const hintEl = document.createElement('li');

    if (userNum > passcodeNum) {
        hintEl.textContent = `>${userNum}`
        greaterTable.appendChild(hintEl);
    } else if (userNum < passcodeNum) {
        hintEl.textContent = `<${userNum}`
        lessTable.appendChild(hintEl);
    } else {
        console.log('You win!');
    }

    passcodeEl.textContent = '**';
    counter++;
})

function validateNumbers(userNum) {
    console.log(counter);
    if (counter >= 7) {
        console.log('You lose!');
        return false;
    }
    if (isNaN(userNum) || userNum.length == 0) {
        console.log(isNaN(userNum))
        console.log(userNum.length == 0)

        return false;
    }
    if (userNum > 100) {
        alert('number should be less then 100');
        return false;
    }

    return true;
}
