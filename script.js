// Player name logic
const registrationForm = document.getElementById('registration');
const nameForm = document.getElementById('name-form');
const nameInput = document.querySelector('#name');
const gameEl = document.querySelector('#main');
const restartBtn = document.createElement('button');
let phone = document.getElementById('phone');
let rules = document.getElementById('rules');
const phoneBackup = phone.innerHTML;
const rulesBackup = rules.innerHTML;

registrationForm.addEventListener('submit', (event) => {
    const greetingsEl = document.getElementById('player-name');
    event.preventDefault();

    if (!validateUserName(nameInput.value)) {
        return;
    }

    greetingsEl.textContent = `Hi ${nameInput.value}`;
    gameEl.style.display = 'flex';
    nameForm.innerHTML = '';
    nameForm.style.marginTop = '0';
    nameForm.classList.add('hidden');

    setupEventListeners();
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

function setupEventListeners() {
    let passcodeEl = document.getElementById('passcode');
    const keypadEl = document.querySelector('.keypad');
    const greaterTable = document.getElementById('greater');
    const lessTable = document.getElementById('less');
    const checkBtn = document.getElementById('btn-check');
    let passcodeNum = Math.floor(Math.random() * 101);
    let counter = 0;

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
        } else {
            winGame(counter);
            console.log('You win!');
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
    const message = document.createElement('h1');

    message.innerText = `You won in ${counter} tries.\n And unlock the phone!`
    message.style.color = 'green';
    message.style.marginTop = '20vh';
    
    restartBtn.textContent = 'Start new game';
    restartBtn.classList.add('btn-start');
    restartBtn.setAttribute('id', 'btn-restart');
    
    frag.appendChild(message);
    frag.appendChild(restartBtn);
    
    rules.replaceChildren(frag);
    phone.innerHTML = '';
    phone.style.backgroundImage = 'url(img/cool.jpg)'
}

// In case loosing the game
function looseGame() {
    phoneText.textContent = 'The phone is locked!'
    phone.style.textAlign = 'center';
    phone.style.color = 'red'
    phone.replaceChildren(phoneText);
}

restartBtn.addEventListener('click', () => {
    console.log('test')
    phone.innerHTML = phoneBackup;
    rules.innerHTML = rulesBackup;
    passcodeEl = document.getElementById('passcode');
    keypadEl = document.querySelector('.keypad');

    rules.style.color = 'black';
    phone.style.backgroundImage = '';

    setupEventListeners();
});
