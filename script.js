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

// Game logic
let passcodeEl = document.getElementById('passcode');
const keypadEl = document.querySelector('.keypad');

keypadEl.addEventListener('click', event => {
    event.preventDefault();
    const num = event.target.textContent;

    console.log(num)
    if (passcodeEl.textContent === '****') {
        passcodeEl.textContent = num;
    } else {
        passcodeEl.textContent += num;
    }
});
