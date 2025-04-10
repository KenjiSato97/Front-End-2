document.addEventListener('DOMContentLoaded', function() {
    const calcularBtn = document.getElementById('calcular-btn');
    calcularBtn.addEventListener('click', calcularCirculo);

    function calcularCirculo() {
        const raioInput = prompt('Digite o valor do raio do círculo:');
        
        if (raioInput === null || raioInput.trim() === '') {
            alert('Operação cancelada ou nenhum valor inserido.');
            return;
        }

        const raio = parseFloat(raioInput);
        
        if (isNaN(raio)) {
            alert('Por favor, insira um valor numérico válido.');
            return;
        }
        
        if (raio <= 0) {
            alert('O raio deve ser um valor positivo.');
            return;
        }

        const area = calcularArea(raio);
        const perimetro = calcularPerimetro(raio);
        
        exibirResultados(raio, area, perimetro);
        document.getElementById('result-section').style.display = 'block';
    }

    function calcularArea(raio) {
        return Math.PI * Math.pow(raio, 2);
    }

    function calcularPerimetro(raio) {
        return 2 * Math.PI * raio;
    }

    function exibirResultados(raio, area, perimetro) {
        document.getElementById('raio-valor').textContent = raio.toFixed(2);
        document.getElementById('area-valor').textContent = area.toFixed(2);
        document.getElementById('perimetro-valor').textContent = perimetro.toFixed(2);
    }
});
