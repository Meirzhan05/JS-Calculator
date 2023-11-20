let btns = document.querySelectorAll('.button');
let num = document.querySelector('#num');
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        btnValue = btn.value;
        textContent = num.textContent;
        if ('0-+'.includes(textContent) || btnValue.includes('0-+')) {
            num.textContent = btnValue;
        } else if ((isNumeric(textContent) || btnValue == ".") && (isNumeric(btnValue) || btnValue == ".")) {
            num.textContent += btnValue;
        } else if (btnValue === "+/-") {
            if (isNumeric(textContent[0])) {
                num.textContent = "-" + textContent;
            } else {
                num.textContent = num.textContent.substring(1, textContent.length);
            }
        }
    })
});

function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}