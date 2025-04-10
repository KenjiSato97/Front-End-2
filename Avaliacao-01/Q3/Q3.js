document.addEventListener('DOMContentLoaded', function() {
    const calcularBtn = document.getElementById('calcular');
    
    calcularBtn.addEventListener('click', function() {
        // Obter o valor do textarea
        const numerosInput = document.getElementById('numeros').value;
        
        // Verificar se há entrada
        if (!numerosInput.trim()) {
            alert('Por favor, digite os números separados por vírgula.');
            return;
        }
        
        // Converter a string em um array de números
        const numerosArray = numerosInput.split(',')
            .map(num => num.trim())
            .filter(num => num !== '')
            .map(num => parseFloat(num));
        
        // Verificar se todos os valores são números válidos
        if (numerosArray.some(isNaN)) {
            alert('Por favor, digite apenas números válidos.');
            return;
        }
        
        // Verificar se há pelo menos um número
        if (numerosArray.length === 0) {
            alert('Por favor, digite pelo menos um número.');
            return;
        }
        
        // Calcular menor, maior e soma
        const menor = Math.min(...numerosArray);
        const maior = Math.max(...numerosArray);
        const soma = numerosArray.reduce((total, num) => total + num, 0);
        
        // Exibir resultados
        document.getElementById('menor').textContent = menor;
        document.getElementById('maior').textContent = maior;
        document.getElementById('soma').textContent = soma;
        
        // Mostrar o container de resultados com animação
        const resultadoContainer = document.getElementById('resultado-container');
        resultadoContainer.classList.add('mostrar');
    });
});