function calcularMedia(notas) {
    const soma = notas.reduce((acumulador, nota) => acumulador + nota, 0);
    return soma / notas.length;
}

function mostrarAlunosAprovados(alunos) {
    const alunosAprovados = [];
    
    alunos.forEach(aluno => {
        const media = calcularMedia(aluno.notas);
        
        if (media >= 7) {
            alunosAprovados.push({
                nome: aluno.nome,
                curso: aluno.curso,
                media: media.toFixed(2)
            });
        }
    });
    
    return alunosAprovados;
}

function exibirAlunosAprovados(alunos) {
    const alunosAprovados = mostrarAlunosAprovados(alunos);
    const resultadoDiv = document.getElementById("resultado");
    
    resultadoDiv.innerHTML = "";
    
    if (alunosAprovados.length === 0) {
        resultadoDiv.innerHTML = "<p>Nenhum aluno aprovado.</p>";
        return;
    }
    
    const titulo = document.createElement("h2");
    titulo.textContent = `Alunos Aprovados (${alunosAprovados.length})`;
    resultadoDiv.appendChild(titulo);
    
    alunosAprovados.forEach(aluno => {
        const alunoDiv = document.createElement("div");
        alunoDiv.className = "aluno";
        
        const nome = document.createElement("h3");
        nome.textContent = aluno.nome;
        
        const curso = document.createElement("p");
        curso.className = "info";
        curso.textContent = `Curso: ${aluno.curso}`;
        
        const media = document.createElement("p");
        media.className = "info";
        media.textContent = `Média: ${aluno.media}`;
        
        alunoDiv.appendChild(nome);
        alunoDiv.appendChild(curso);
        alunoDiv.appendChild(media);
        
        resultadoDiv.appendChild(alunoDiv);
    });
    
    console.log("Alunos aprovados (média >= 7):");
    alunosAprovados.forEach(aluno => {
        console.log(`Nome: ${aluno.nome}, Média: ${aluno.media}, Curso: ${aluno.curso}`);
    });
}

function carregarAlunos() {
    const statusDiv = document.getElementById("status");
    statusDiv.className = "status carregando";
    statusDiv.textContent = "Carregando dados dos alunos...";
    
    fetch('alunos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível carregar o arquivo JSON');
            }
            return response.json();
        })
        .then(alunos => {
            statusDiv.style.display = 'none';
            exibirAlunosAprovados(alunos);
        })
        .catch(error => {
            statusDiv.className = "status erro";
            statusDiv.textContent = `Erro ao carregar os dados: ${error.message}`;
            console.error('Erro:', error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("mostrarAprovados").addEventListener("click", carregarAlunos);
});