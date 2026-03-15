const res = document.getElementById("result");
const toast = document.getElementById("toast");

function calci(value) {
  const calculatedValue = eval(value || null);
  if (isNaN(calculatedValue)) {
    res.value = "Can't divide 0 with 0";
    setTimeout(() => {
      res.value = "";
    }, 1300);
  } else {
    res.value = calculatedValue;
  }
}

function livescreen(enteredValue) {
  if (!res.value) {
    res.value = "";
  }
  res.value += enteredValue;
}

function calculate(){

    let expressao = res.value;

    if(expressao == ""){
        return;
    }

    res.value = eval(expressao);

}
function calcularBhaskara(){

    let valores = res.value.split(",");

    if(valores.length != 3){
        res.value = "Digite a,b,c";
        return;
    }

    let a = Number(valores[0]);
    let b = Number(valores[1]);
    let c = Number(valores[2]);

    let delta = (b*b) - (4*a*c);

    if(delta < 0){
        res.value = "Sem solução real";
        return;
    }

    let x1 = (-b + Math.sqrt(delta))/(2*a);
    let x2 = (-b - Math.sqrt(delta))/(2*a);

    res.value = "x1=" + x1 + " x2=" + x2;

}
function calcularParouImpar(){

    let numero = Number(res.value);

    if(numero % 2 == 0){
        res.value = "PAR";
    }else{
        res.value = "IMPAR";
    }
}
function calcularmedia(){

    let valores = res.value.split(",");

    if(valores.length != 4){
        res.value = "Digite 4 valores separados por vírgula";
        return;
    }

    let soma = 0;

    for(let i = 0; i < valores.length; i++){
        soma += Number(valores[i]);
    }

    res.value = soma / 4;

}
