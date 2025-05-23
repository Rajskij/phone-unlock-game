const registrationForm = document.getElementById('registration');
const nameForm = document.getElementById('name-form');
const nameInput = document.querySelector('#name');
const gameEl = document.querySelector('#main');
const restartBtn = document.createElement('button');
const message = document.createElement('h1');

let phone = document.getElementById('phone');
let rules = document.getElementById('rules');
const phoneBackup = phone.innerHTML;
const rulesBackup = rules.innerHTML;

// Player name logic and setup content
registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateUserName(nameInput.value)) {
        return;
    }

    localStorage.setItem('playerName', nameInput.value);

    gameEl.style.display = 'flex';
    nameForm.innerHTML = '';
    nameForm.style.marginTop = '0';
    nameForm.classList.add('hidden');

    restartBtn.textContent = 'Start new game';
    restartBtn.setAttribute('class', 'btn-start');

    setupEventListeners();
});

function validateUserName(name) {
    console.log(window.navigator);
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

function setupEventListeners() {
    const passcodeEl = document.getElementById('passcode');
    const greetingsEl = document.getElementById('player-name');
    const keypadEl = document.querySelector('.keypad');
    const greaterTable = document.getElementById('greater');
    const lessTable = document.getElementById('less');
    const checkBtn = phone.lastElementChild;

    let passcodeNum = Math.floor(Math.random() * 101);
    let counter = 0;
    greetingsEl.textContent = `Hi ${localStorage.getItem('playerName')}`;

    // Phone logic
    keypadEl.addEventListener('click', event => {
        event.preventDefault();
        const button = event.target;

        if (button.id === 'remove-num') {
            passcodeEl.textContent = passcodeEl.textContent.slice(0, -1);
            return false;
        }
        if (button.tagName !== 'BUTTON' || passcodeEl.textContent.length > 2) {
            return;
        }

        passcodeEl.textContent += button.textContent;
    });

    // Check number logic
    console.log('pass: ' + passcodeNum);

    checkBtn.addEventListener('click', () => {
        const userNum = Number(passcodeEl.textContent);
        if (!validateNumbers(passcodeEl.textContent)) {
            return;
        }

        const hintEl = document.createElement('li');
        counter++;
        if (userNum < passcodeNum) {
            hintEl.textContent = `>${userNum}`
            greaterTable.appendChild(hintEl);
        } else if (userNum > passcodeNum) {
            hintEl.textContent = `<${userNum}`
            lessTable.appendChild(hintEl);
        } else if (userNum === passcodeNum) {
            winGame(counter);
            return;
        }

        passcodeEl.textContent = '';
        if (counter >= 7) {
            looseGame();
        }
    })
}

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
// In case winning the game
function winGame(counter) {
    const frag = document.createDocumentFragment();

    message.innerText = `You won in ${counter} tries.\n And unlock the phone!`
    message.style.color = 'green';
    message.style.marginTop = '20vh';

    frag.appendChild(message);
    frag.appendChild(restartBtn);

    rules.replaceChildren(frag);
    phone.innerHTML = '';
    phone.style.backgroundImage = 'url(img/cool.jpg)'
}

// In case loosing the game
function looseGame() {
    message.textContent = 'The phone is locked!'
    message.style.color = 'red';

    phone.style.textAlign = 'center';
    phone.replaceChildren(message);
    phone.appendChild(restartBtn);
}

restartBtn.addEventListener('click', () => {
    phone.innerHTML = phoneBackup;
    rules.innerHTML = rulesBackup;
    passcodeEl = document.getElementById('passcode');
    keypadEl = document.querySelector('.keypad');

    const elementsToReset = [phone, rules];
    elementsToReset.forEach(el => {
        el.style.removeProperty('background-image');
        el.style.removeProperty('color');
    });
    
    setupEventListeners();
});
