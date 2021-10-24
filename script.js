const mainLog = document.querySelector('.mainLog');
const clearBtn = document.querySelector('.clear');

const calculatorBG = document.querySelector('.calculator');

const numbers = document.querySelectorAll('.number');
const toprowNumbers = document.querySelectorAll('.toprow');
const otherrowNumbers = document.querySelectorAll('.otherrow');

const addBtn = document.querySelector('.add');
const subtractBtn = document.querySelector('.subtract');
const multiplyBtn = document.querySelector('.multiply');
const divideBtn = document.querySelector('.divide');
const equalsBtn = document.querySelector('.equals');
const decimalBtn = document.querySelector('.decimal');

let log = '';
let operator = undefined;
let a = null;
let b = null;
let result = undefined;

decimalBtn.addEventListener('mouseover', () => changeBG(document.querySelector('.number')));
decimalBtn.addEventListener('click', addDecimalPoint);

numbers.forEach((number) => number.addEventListener('click', () => {
        if(b != null) {
            b = b.toString();
            b += number.textContent;
        }
        else{
            b = number.textContent;
        }
        b = parseFloat(b);
        mainLog.textContent = b;
        mainLog.style.lineHeight = `${60 / Math.ceil(mainLog.textContent.length / 9)}px`;
    }));
toprowNumbers.forEach((button) => button.addEventListener('mouseover', () => changeBG(mainLog)));
otherrowNumbers.forEach((button) => button.addEventListener('mouseover', () => changeBG(document.querySelector('.number'))));

clearBtn.addEventListener('click', () => {
        a = 0;
        b = 0;
        result = undefined;
        operator = undefined;
        mainLog.textContent = '';
        mainLog.style.lineHeight = `60px`;
    });
clearBtn.addEventListener('mouseover', () => changeBG(document.querySelector('body')));

equalsBtn.addEventListener('click', () => {
        if(!isNaN(operate(operator, a, b))){
            displayResult();
            b = null;
        }
    });
equalsBtn.addEventListener('mouseover', () => changeBG(document.querySelector('.number')));

addBtn.addEventListener('click', assignOperator);
addBtn.addEventListener('mouseover', () => changeBG(clearBtn));
subtractBtn.addEventListener('click', assignOperator);
subtractBtn.addEventListener('mouseover', () => changeBG(addBtn));
multiplyBtn.addEventListener('click', assignOperator);
multiplyBtn.addEventListener('mouseover', () => changeBG(subtractBtn));
divideBtn.addEventListener('click', assignOperator);
divideBtn.addEventListener('mouseover', () => changeBG(multiplyBtn));

function addDecimalPoint() {
    if(mainLog.textContent.search(/\./) != -1 || mainLog.textContent ==  '') return;
    else {
        if(b == null) b = result;
        b = b.toString() + '.';
        mainLog.textContent += '.';
        mainLog.style.lineHeight = `${60 / Math.ceil(mainLog.textContent.length / 9)}px`;
    }
}

function changeBG(sideOf) {
    calculatorBG.style.backgroundColor = pSBC(-0.2, window.getComputedStyle(sideOf).backgroundColor);
}

function displayResult () {
    if(operate(operator, a, b) == null) return;
    result = operate(operator, a, b);
    mainLog.textContent = result;
    mainLog.style.lineHeight = `${60 / Math.ceil(mainLog.textContent.length / 9)}px`;
    operator = undefined;
    a = result;
}

function assignOperator () {
    if(operator != undefined){
        displayResult(operator, a, b);
    }
    else if(result == undefined){
        a = b;
    }
    operator = this.textContent;
    b = null;
}

function add (a,b) {
    return a+b;
}

function subtract (a,b) {
    return a-b;
}

function multiply (a,b) {
    return a*b;
}

function divide (a,b) {
    if(b==0) {
        mainLog.textContent = "Don't try to break me. :[";
        mainLog.style.lineHeight = `18px`;
        return null;
    }
    return a/b;
}

function operate (operator, a,b) {
    switch(operator){
        case "+" : return add(a,b); break;
        case "-" : return subtract(a,b); break;
        case "*" : return multiply(a,b); break;
        case "/" : return divide(a,b); break;
    }
}

//color modified function by Pimp Trizkit

const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}
