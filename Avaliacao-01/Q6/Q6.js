document.addEventListener('DOMContentLoaded', function() {
    const calcularBtn = document.getElementById('calcular');
    const resultadoDiv = document.getElementById('resultado');
    
    calcularBtn.addEventListener('click', calcularInvestimento);
    
    function calcularInvestimento() {
        const capital = prompt('Digite o capital inicial:');
        if (capital === null) return;
        
        const taxa = prompt('Digite a taxa de juros mensal (em percentual):');
        if (taxa === null) return;
        
        const tempo = prompt('Digite o tempo do investimento (em meses):');
        if (tempo === null) return;
        
        const C = parseFloat(capital.replace(',', '.'));
        const i = parseFloat(taxa.replace(',', '.')) / 100;
        const t = parseInt(tempo);
        
        if (isNaN(C) || isNaN(i) || isNaN(t)) {
            resultadoDiv.innerHTML = '<p class="erro">Por favor, insira valores numéricos válidos.</p>';
            return;
        }
        
        if (C <= 0 || i <= 0 || t <= 0) {
            resultadoDiv.innerHTML = '<p class="erro">Todos os valores devem ser positivos.</p>';
            return;
        }
        
        const montante = C * Math.pow(1 + i, t);
        
        resultadoDiv.innerHTML = `
            <p>Capital Inicial: R$ ${C.toFixed(2)}</p>
            <p>Taxa de Juros: ${(i * 100).toFixed(2)}% ao mês</p>
            <p>Tempo: ${t} meses</p>
            <p class="montante">Montante Final: R$ ${montante.toFixed(2)}</p>
        `;
    }
});
