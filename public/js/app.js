const charactersArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const uppercaseCharactersArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const numbersArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbolsArray = ['"', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'];
const output = document.getElementById('output');
const resultLength = document.getElementById('length-value');
const range = document.getElementById('length');
const form = document.getElementById('form');
const copyBtn = document.getElementById('copy');
const uppercase = document.getElementById('uppercase');
const number = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
let passwordLength = 0

//password length
const passwordLengthHandler = e => {
    resultLength.innerHTML = e.target.value;
    passwordLength = e.target.value;
}

//generate password
const generatePasswordHandler = e => {
    e.preventDefault();
    let passwordArray = [...charactersArray];
    uppercase.checked && (passwordArray = [...passwordArray, ...uppercaseCharactersArray]);
    number.checked && (passwordArray = [...passwordArray, ...numbersArray]);
    symbols.checked && (passwordArray = [...passwordArray, ...symbolsArray]);

    //test
    let outputPassword = [];
    let randomIndex = null;
    for (let i = 0; i < passwordLength; i++) {
        randomIndex = Math.floor(Math.random() * passwordArray.length)
        outputPassword.push(passwordArray[randomIndex]);
    }

    outputPassword = outputPassword.sort(() => Math.random() - 0.5);

    //check for uppercase
    if (uppercase.checked && passwordLength >= 4) {
        const includeUppercase = uppercaseCharactersArray.some(item => outputPassword.includes(item));
        if (!includeUppercase) {
            outputPassword.pop();
            let index = Math.floor(Math.random() * uppercaseCharactersArray.length);
            outputPassword.push(uppercaseCharactersArray[index])
            outputPassword = outputPassword.sort(() => Math.random() - 0.5);
        }
    }

    //check for number
    if (number.checked && passwordLength >= 5) {
        const includeUppercase = numbersArray.some(item => outputPassword.includes(item));
        if (!includeUppercase) {
            outputPassword.pop();
            let index = Math.floor(Math.random() * numbersArray.length);
            outputPassword.push(numbersArray[index])
            outputPassword = outputPassword.sort(() => Math.random() - 0.5);
        }
    }

    //check for symbols
    if (symbols.checked && passwordLength >= 6) {
        const includeUppercase = symbolsArray.some(item => outputPassword.includes(item));
        if (!includeUppercase) {
            outputPassword.pop();
            let index = Math.floor(Math.random() * symbolsArray.length);
            outputPassword.push(symbolsArray[index])
            outputPassword = outputPassword.sort(() => Math.random() - 0.5);
        }
    }


    //show password status
    if (outputPassword.length === 0) {
        alert('can not generate password with length 0')
    } else {
        output.value = outputPassword.join('')
        if (output.value.length <= 4) {
            passwordStatus('border-red-950')
        } else if (output.value.length > 4 && output.value.length < 8) {
            passwordStatus('border-orange-500')
        } else {
            passwordStatus('border-green-950')
        }
    }


}


//copy password
const copyPasswordHandler = async () => {
    if (output.value.length === 0) {
        alert('generate a password for then try to copy')
    } else {
        try {
            await navigator.clipboard.writeText(output.value);
            console.log('Content copied to clipboard');
            copyBtn.classList.add('bg-green-950')
            copyBtn.innerHTML = 'copied'

            setTimeout(() => {
                copyBtn.classList.remove('bg-green-950');
                copyBtn.innerHTML = 'copy'
            }, 2000);

        } catch (err) {
            console.error('Failed to copy: ', err);

            copyBtn.classList.add('bg-red-600');
            copyBtn.innerHTML = 'error'

            setTimeout(() => {
                copyBtn.classList.remove('bg-red-600');
                copyBtn.innerHTML = 'copy'
            }, 2000);
        }
    }

}

// show password status
const passwordStatus = className => {
    output.classList.add(`border-b-4`);
    output.classList.add(className);

    setTimeout(() => {
        output.classList.remove('border-b-4');
        output.classList.remove(className);
    }, 2500);
}



//set events
window.addEventListener('input', passwordLengthHandler);
form.addEventListener('submit', generatePasswordHandler);
uppercase.addEventListener('change', e => {
    passwordLength = 4
    resultLength.innerHTML = `4`
    range.value = 4
})
number.addEventListener('change', e => {
    passwordLength = 5
    resultLength.innerHTML = `5`
    range.value = 5
})
symbols.addEventListener('change', e => {
    passwordLength = 6
    resultLength.innerHTML = `6`
    range.value = 6
})

copyBtn.addEventListener('click', copyPasswordHandler)