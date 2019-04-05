console.log('start app');


document.getElementById("bi").addEventListener("input", capturar);
//*******************************************************************
var hide = document.getElementById("result");
hide.style.display = "none";

var hideIcon = document.getElementById("close");
hideIcon.style.display = "none";

var hideIcons = document.getElementById("closes");
hideIcons.style.display = "none";
//*******************************************************************

function capturar(bi) {
    var x = document.getElementById("bi").value;

    var f = Split(x,''); 
    console.log(f)

    var soma = 0;
        for (i = 0; i < f.length - 1; i++){
            soma+=Number(f[i]);
        }
        console.log(soma);
        console.log(f[f.length - 1])

    var numC = 0;
    numC = soma % 10;
    console.log(numC);

    if (f[f.length - 1] == numC) {
        console.log("Valido")
        hide.style.display = "block";
        document.getElementById("result").innerHTML = "Válido";
        hideIcons.style.display = "block";
        hideIcon.style.display = "none";
    } else {
        console.log("invalido")
        hide.style.display = "block";
        document.getElementById("result").innerHTML = "Invalido";
        hideIcon.style.display = "block";
        hideIcons.style.display = "none";
    } if(x == false){
        hide.style.display = "none";
        hideIcon.style.display = "none";
        hideIcons.style.display = "none";
    }
    
}




//function pad() {
//    //document.getElementById("bi").value = "1";
//    //var para = document.getElementById("bi");
//    //para.textContent += "1";
//
//  
//}
//function padDois() {
//document.getElementById("bi").value = "2";
//}
//function padTres() {
//    document.getElementById("bi").value = "3";
//}
//function padQuatro() {
//    document.getElementById("bi").value = "4";
//}
//function padCinco() {
//    document.getElementById("bi").value = "5";
//}
//function padSeis() {
//    document.getElementById("bi").value = "6";
//}
//function padSete() {
//    document.getElementById("bi").value = "7";
//}
//function padOito() {
//    document.getElementById("bi").value = "8";
//}
//function padNove() {
//    document.getElementById("bi").value = "9";
//}
//function padZero() {
//    document.getElementById("bi").value = "0";
//}

