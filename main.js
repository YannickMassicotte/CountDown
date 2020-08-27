// MY VARIABLES
let leftTo100 = {
    years: "",
    days: "",
    hours: "",
    mins: "",
    secs: "",
};
let userBirth = {
    birthYear: "",
    birthMonth: "",
    birthDay: "",
};
const output = document.querySelector('.output-content');
const input = document.querySelector('.input-content');
const deadline = document.querySelector('.deadline-wrapper');
const timeItems = document.querySelectorAll('h4');
const backBtn = document.querySelector('.back-to-input');
let countDownStart = false;

// MY FUNCTIONS
const init = function(){
    document.getElementById('button-reset').addEventListener('click', reset);
    document.getElementById('button-send').addEventListener('click', send);
}

document.addEventListener('DOMContentLoaded', init);

backBtn.addEventListener('click', function(){
    output.classList.remove("active");
    input.classList.add("active");
});

const reset = function(e){
    e.preventDefault();
    document.getElementById('form-user').reset();
    document.querySelectorAll('.form-box').forEach(function (field){
        field.classList.remove("error");
    });
};

const send = function(e){
    e.preventDefault();
    // e.stopPropagation();
    let fails = validate();
    if(fails.length === 0){
        // GOOD TO GO
        // document.getElementById('form-user').submit();
        output.classList.add("active");
        input.classList.remove("active");

        countDownStart = true;
        letCountDownStart(countDownStart);

    }else {
        // CREATE ERR MESSAGE
        fails.forEach(obj => {
            let field = document.getElementById(obj.input);
            field.parentElement.setAttribute('data-errormsg', obj.msg);
            field.parentElement.classList.add("error");
        });
    }
};

const validate = function (e){
    // REMOVE ALL ERR MSG
    document.querySelectorAll('.form-box').forEach(function (field){
        field.classList.remove("error");
    });

    // ARRAY TO STORE ERR MSG
    let failures = [];

    // GET INPUTS FROM USER
    let day = document.getElementById('input-day').value;
    let month = document.getElementById('input-month').value;
    let year = document.getElementById('input-year').value;
    
    userBirth.birthDay = day;
    userBirth.birthMonth = month;
    userBirth.birthYear = year;

    // CHECK IF EMPTY FIELDS
    if(day === ""){
        failures.push({ input:'input-day', msg:'Required Field'});
        return failures;
    }
    if(year === ""){
        failures.push({ input:'input-year', msg:'Required Field'});
        return failures;
    }

    // CHECK IF NUMBERS IN RANGE
    let d = new Date();
    if(isNaN(day) || day > 31 || day < 1){
        failures.push({ input:'input-day', msg:'Realistic Number'});
        return failures;
    }
    if(isNaN(year) || year < d.getFullYear() - 100 || year > d.getFullYear() + 1 ){
        failures.push({ input:'input-year', msg:'Realistic Number'});
        return failures;
    }

    // IS DATE VALID ?
        // FORMAT DATE 
    let usDate = new Date(`${year}-${month}-${day}`);

    Date.prototype.isValid = function () {
        // An invalid date object returns NaN for getTime() and NaN is the only object not strictly equal to itself.
        return this.getTime() === this.getTime();
    };  

    if(!usDate.isValid()){
        failures.push({ input:'input-day', msg:'Invalid Date'});
        failures.push({ input:'input-month', msg:'Invalid Date'});
        failures.push({ input:'input-year', msg:'Invalid Date'});
    }else {
        countDownTo100();      
    }

    return failures;
};

function countDownTo100 () {
    
    let userDate = new Date(`${userBirth.birthYear}-${userBirth.birthMonth}-${userBirth.birthDay}`);
    
    // 100 YEARS (ms) - [ACTUAL DATE (ms) - BIRTH DATE (ms)] = NUMBER OF MILLISECONDS LEFT BEFORE THE PERSON GETS TO 100 YRS OLD  
    let actualDate = new Date();
    let actualTo1970 = actualDate.getTime();
    let birthTo1970 = userDate.getTime(); 
    let milSinceBirth = actualTo1970 - birthTo1970;
    let milTo100 = 3155695200000 - milSinceBirth;

    // GET YEARS,DAYS,HOURS,MINS,SECS LEFT...
    let years = milTo100 / 31557600000;
    let reminder = milTo100 % 31557600000;
    let days = reminder / 86400000;
    reminder = reminder % 86400000;
    let hours = reminder / 3600000;
    reminder = reminder % 3600000;
    let mins = reminder / 60000;
    reminder = reminder % 60000;
    let secs = reminder / 1000;

    // console.log(`${Math.floor(Math.abs(years))},${Math.floor(Math.abs(days))},${Math.floor(Math.abs(hours))},${Math.floor(Math.abs(mins))},${Math.floor(Math.abs(secs))}`);   

    leftTo100.years = Math.floor(Math.abs(years));
    leftTo100.days = Math.floor(Math.abs(days));
    leftTo100.hours = Math.floor(Math.abs(hours));
    leftTo100.mins = Math.floor(Math.abs(mins));
    leftTo100.secs = Math.floor(Math.abs(secs));

    // DISPLAY COUNTDOWN
    console.log(leftTo100);
        
    timeItems.forEach(function (item){
        item.innerText = leftTo100[`${item.className}`];
    });

};

function letCountDownStart(countDownStart){
    if(countDownStart){
        setInterval(countDownTo100, 1000);
        countDownTo100();
    }
};

// MEDIA QUERY VIA JQUERY
function changeText(x){
    if(x.matches){
        document.querySelector('.content-text').innerHTML = `Don't waste your time watching your time pass...<br><br><a href="https://www.youtube.com/watch?v=jAhjPd4uNFY"><strong>Be Immortal Now !</strong></a>`;
        document.querySelector('.output-content > h1').innerHTML = "100 Y/0 IN ... !";
    }else {
        document.querySelector('.content-text').innerHTML = `Don't waste your time watching your time pass...  Work to make the world a fertile playground for the application of sciences and technologies.<br><br><a href="https://www.youtube.com/watch?v=jAhjPd4uNFY"><strong>Be Immortal Now !</strong></a>`;
        document.querySelector('.output-content > h1').innerHTML = "COUNTDOWN TILL 100 Y/0!";
    }
};
let x = window.matchMedia("(max-width: 500px)");
changeText(x);
x.addListener(changeText);