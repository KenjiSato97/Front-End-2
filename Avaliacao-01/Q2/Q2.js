function coletarNumeros() {
    let numerosPares = 0;
    let numerosImpares = 0;
    let numerosColetados = [];
    for (let i = 0; i < 10; i++) {
        let numero;
        let valido = false;
        while (!valido) {
            let input = prompt(`Digite o ${i+1}º número inteiro:`);
            if (input === null) {
                alert("Operação cancelada pelo usuário.");
                return;
            }
            numero = parseInt(input);
            if (!isNaN(numero)) {
                valido = true;
            } else {
                alert("Por favor, digite um número inteiro válido.");
            }
        }
        numerosColetados.push(numero);
        if (numero % 2 === 0) {
            numerosPares++;
        } else {
            numerosImpares++;
        }
    }
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.style.display = "block";
    resultadoDiv.innerHTML = `
        <h2>Resultado:</h2>
        <p>Números digitados: ${numerosColetados.join(", ")}</p>
        <p>Quantidade de números pares: ${numerosPares}</p>
        <p>Quantidade de números ímpares: ${numerosImpares}</p>
    `;
}