function calcularPagamento(){

    let total = 0;

    let produtos = document.querySelectorAll(".quantidade");

    for(let i = 0; i < produtos.length; i++){

        let qtd = Number(produtos[i].value);
        let preco = Number(produtos[i].dataset.preco);

        total += qtd * preco;

    }

    let opcao = document.querySelector('input[name="pagamento"]:checked');

    let resultado = document.getElementById("resultado");

    if(!opcao){
        resultado.innerHTML = "Escolha uma forma de pagamento";
        return;
    }

    if(opcao.value === "avista"){

        let desconto = total * 0.085;
        let totalFinal = total - desconto;

        resultado.innerHTML =
        "Total: R$ " + totalFinal.toFixed(2);

    }
    else{

        let parcelas = Number(document.getElementById("parcelas").value);

        let taxa = total * 0.06;
        let taxaParcelas = 6.90 * parcelas;

        let totalFinal = total + taxa + taxaParcelas;

        let valorParcela = totalFinal / parcelas;

        if(valorParcela < 10){
            resultado.innerHTML = "Parcelas menores que R$10 não permitidas";
            return;
        }

        resultado.innerHTML =
        "Total: R$ " + totalFinal.toFixed(2) +
        "<br>" + parcelas + "x de R$ " + valorParcela.toFixed(2);

    }

}
