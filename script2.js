function calcular(){

let valor = Number(document.getElementById("valor").value);

let parcelas = Number(document.getElementById("parcelas").value);

let pagamento = document.querySelector('input[name="pagamento"]:checked').value;

let resultado = document.getElementById("resultado");

if(pagamento == "avista"){

    let desconto = valor * 0.085;

    let total = valor - desconto;

    resultado.innerHTML = "Total com desconto: R$ " + total.toFixed(2);

}
else{

    let taxa = valor * 0.06;

    let taxaParcelas = 6.90 * parcelas;

    let total = valor + taxa + taxaParcelas;

    let valorParcela = total / parcelas;

    if(valorParcela < 10){

        resultado.innerHTML = "Parcelas menores que R$10 não são permitidas";

        return;
    }

    resultado.innerHTML = 
    "Total: R$ " + total.toFixed(2) + 
    "<br>Parcelas: " + parcelas +
    "<br>Valor da parcela: R$ " + valorParcela.toFixed(2);
}

}
