// Player name logic
const registrationForm = document.getElementById('registration');
const nameForm = document.getElementById('name-form');
const nameInput = document.querySelector('#name');
const gameEl = document.querySelector('#main');

registrationForm.addEventListener('submit', (event) => {
    const greetingsEl = document.getElementById('player-name');
    event.preventDefault();

    if (!validateUserName(nameInput.value)) {
        return;
    }

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
    if (!validateKeypad(event.target)) {
        return;
    }

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
    if (!validateNumbers(passcodeEl.textContent)) {
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
        winGame();
        console.log('You win!');
    }

    passcodeEl.textContent = '';
    counter++;
    if (counter >= 7) {
        looseGame();
    }
})

function validateNumbers(userNum) {
    if (isNaN(userNum) || userNum.length == 0) {
        return false;
    }
    if (userNum > 100) {
        alert('number should be less then 100');
        return false;
    }

    return true;
}

// Lose & win logic
const phone = document.getElementById('phone');
const rules = document.getElementById('rules');
const phoneText = document.createElement('h1');
const startNewGameBtn = document.createElement('button');
const phoneBackup = phone;
const rulesBackup = rules;

// In case winning the game
function winGame() {
    phoneText.textContent = `You won in ${counter} tries. And unlock the phone!`
    phone.style.textAlign = 'center';
    phone.style.color = 'green'
    phone.replaceChildren(phoneText);
    clearLists();
}

// In case loosing the game
function looseGame() {
    phoneText.textContent = 'The phone is locked!'
    phone.style.textAlign = 'center';
    phone.style.color = 'red'
    phone.replaceChildren(phoneText);
    clearLists();
}

function clearLists() {
    greaterTable.innerHTML = '';
    lessTable.innerHTML = '';
}

// phoneText.innerText = `You won in ${counter} tries.\n And unlock the phone!`
// startNewGameBtn.textContent = 'Start Game';
// startNewGameBtn.setAttribute('id', 'btn-start');
// rules.style.justifyContent = 'center'
// rules.style.color = 'green'
// rules.replaceChildren(phoneText)
// rules.appendChild(startNewGameBtn)
