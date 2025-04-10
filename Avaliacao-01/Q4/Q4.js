document.addEventListener('DOMContentLoaded', function() {
    // Botões
    const calcularFixoBtn = document.getElementById('calcular-fixo');
    const calcularPersonalizadoBtn = document.getElementById('calcular-personalizado');
    
    const anoAtual = 2025;
    const anoInicial = 1995;
    
    
    calcularFixoBtn.addEventListener('click', function() {
        const salarioInicial = 1000;
        const resultado = calcularSalarioAtual(salarioInicial);
        
        document.getElementById('salario-atual').textContent = formatarMoeda(resultado.salarioAtual);
    });
    
    calcularPersonalizadoBtn.addEventListener('click', function() {
        const salarioInicialInput = document.getElementById('salario-inicial').value;
        
        if (!salarioInicialInput || isNaN(salarioInicialInput) || Number(salarioInicialInput) <= 0) {
            alert('Por favor, insira um valor válido para o salário inicial!');
            return;
        }
        
        const salarioInformado = prompt('Confirme o salário inicial:', salarioInicialInput);
        
        if (salarioInformado === null) {
            return;
        }
        
        const salarioInicial = Number(salarioInformado);
        
        if (isNaN(salarioInicial) || salarioInicial <= 0) {
            alert('Por favor, insira um valor válido para o salário inicial!');
            return;
        }
        
        const resultado = calcularSalarioAtual(salarioInicial);
        
        document.getElementById('salario-personalizado').textContent = formatarMoeda(resultado.salarioAtual);
    });
    
    // Função para calcular o salário atual com base nas regras de aumento
    function calcularSalarioAtual(salarioInicial) {
        let salarioAtual = salarioInicial;
        let percentualAumento = 0.0015;
        
    
        
        // Calcula os aumentos ano a ano
        for (let ano = anoInicial + 1; ano <= anoAtual; ano++) {
            if (ano === 1996) {
                salarioAtual = salarioInicial * (1 + percentualAumento);
            } 
            // A partir de 1997, o percentual é o dobro do ano anterior
            else if (ano >= 1997) {
                percentualAumento = percentualAumento * 2;
                salarioAtual = salarioAtual * (1 + percentualAumento);
            }
        }
        
        return {
            salarioAtual: salarioAtual,
        };
    }
    // Função para formatar valores em moeda brasileira
    function formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }
});