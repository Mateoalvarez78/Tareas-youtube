const inputCard = document.querySelector('#inputCard');
const inputDate = document.querySelector('#inputDate');
const inputCvv = document.querySelector('#inputCVV');

const mascaraNumber = "####-####-####-####";
const mascaraDate = '##/##';
const mascaraCvv = '###';

let current = '';
let cardNumber = [];
let dateNumber = [];
let cvvNumber = [];

inputCard.addEventListener('keydown', (e)=> {
    if(e.key === 'Tab'){
        return;
    }

    e.preventDefault()
    handlerInput(mascaraNumber, e.key, cardNumber);
    inputCard.value = cardNumber.join("")
})

inputDate.addEventListener('keydown', (e) => {

    if(e.key === 'Tab'){
        return;
    }
    e.preventDefault()
    handlerInput(mascaraDate, e.key, dateNumber);
    inputDate.value = dateNumber.join("")
})


const handlerInput = (mascara, key, arr) => {
    let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    if(key === 'backspace' && arr.length > 0){
        arr.pop();
        return;
    }

    if(numbers.includes(key) && arr.length + 1 <= mascara.length){
        if(mascara[arr.length] === '-' || mascara[arr.length]=== '/'){
            arr.push(mascara[arr.length], key)
        }
        else{
            arr.push(key)
        }
    } 
}



