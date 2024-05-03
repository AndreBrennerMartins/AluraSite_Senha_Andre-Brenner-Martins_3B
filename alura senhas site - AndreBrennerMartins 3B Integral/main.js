//character number of password-> + and -
const BUTTS= document.querySelectorAll('.param-passw__butt');
const LENGTHDISPLAY= document.querySelector('.param-passw__txt');
let passwLength= 12;
BUTTS[0].onclick= lamenLength; 
BUTTS[1].onclick= hardenLength;

const PASSW= document.querySelector('#campo-passw');

//symbols allowed
const TXTBIG= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const TXTsmol= 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS= '0123456789';
const SYMBOLS= '!?#$%&-_=+~\|/';

const CHECKB= document.querySelectorAll('.checkb');
let charset= TXTBIG;

//PASSW PAWAH
const POWER= document.querySelector('.forca');
const bad= document.querySelector('.bad');
const mid= document.querySelector('.mid');
const gut= document.querySelector('.gut');
//const bar= document.querySelector('.movingbar');

//entropy
const ENTROPYV= document.querySelector('.entropy');

//penis jokes
function lamenLength(){
    if(passwLength>1){
        passwLength--;
    }
    LENGTHDISPLAY.textContent= passwLength;
    
    generatePassw();
}

function hardenLength(){
    if(passwLength<20){
        passwLength++;
    }
    LENGTHDISPLAY.textContent= passwLength

    generatePassw();
}

//passw writing
for(let i=0; i<4; i++){
    CHECKB[i].onclick= checkUpdate;
}

function checkUpdate(){
    let allowed= '';
    if(CHECKB[0].checked){
        allowed= allowed + TXTBIG;
    }
    if(CHECKB[1].checked){
        allowed= allowed + TXTsmol;
    }
    if(CHECKB[2].checked){
        allowed= allowed + NUMBERS;
    }
    if(CHECKB[3].checked){
        allowed= allowed + SYMBOLS;
    }

    charset= allowed;

    generatePassw();
}

//passw generating
generatePassw();
function generatePassw(){
    let passw= '';
    
    if(charset!=''){
        for(let i=0; i<passwLength; i++){
            let randN= Math.floor(Math.random()*charset.length);
            passw= passw+ charset[randN];                
        }
    } else{
        passw= 'Selecione uma característica'
    }
    PASSW.value= passw;

    PAWAHCALCULATRICE();
}

function PAWAHCALCULATRICE(){
    POWER.classList.remove('bad','mid','gut','what','ultimate','pathetic');

    //safety percentage: 0 to 1
    //best= over 11 letters, biggest charset;
    /*let safePer= charset.length/(TXTBIG+TXTsmol+NUMBERS+SYMBOLS).length;
    if(passwLength<12){
        safePer= safePer*(passwLength/12);
    }*/

    let safePer= passwLength*Math.log2(charset.length);
    let themaximum= 20*Math.log2((TXTBIG+TXTsmol+NUMBERS+SYMBOLS).length);

    if(safePer===themaximum){
        POWER.classList.add('ultimate');
    } else if(safePer>(0.75*themaximum)){
        POWER.classList.add('what');
    } else if(safePer>(0.55*themaximum)){
        POWER.classList.add('gut');
    }else if(safePer>(0.25*themaximum)){
        POWER.classList.add('mid');
        //console.log(safePer.toLocaleString('en',{style:'percent'}));
        //mid.css('width', safePer.toLocaleString('en',{style: 'percent'}))
        //mid.style.width= safePer.toLocaleString('en',{style:'percent'})
    } else if(safePer>0){
        POWER.classList.add('bad');
        //bad.style.width= safePer.toLocaleString('en',{style: 'percentage'});
    }else{
        POWER.classList.add('pathetic');
    }

    ENTROPYV.textContent= "Um computador pode levar até "+Math.floor(2**safePer/(100e6*60*60*24))+" dias para descobrir essa senha.";

    //console.log(safePer);
}