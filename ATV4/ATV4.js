function calcularTotal(precoUnitario, quantidade) {
    return precoUnitario * quantidade;
}

function aplicarDesconto(valorTotal) {
    if (valorTotal > 100) {
        return valorTotal * 0.9;
    } else {
        return valorTotal;
    }
}

function exibirResumo() {
    console.log("Valor total antes do desconto: R$" + valorTotal.toFixed(2));
    console.log("Valor final com desconto, se aplicável: R$" + valorFinal.toFixed(2));
}
