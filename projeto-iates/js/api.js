function obterMensagens() {
    var retorno = [];

    var consulta = $.ajax({
        url: "https://app-p2-js-a2fa67e2c96b.herokuapp.com/mensagens",
        method: "GET",
        dataType: "json",
        async: false,
    }).fail(function () {
        return retorno;
    });

    consulta.done(function (data) {
        retorno = data;
    });

    return retorno;
}

function inserirMensagem(mensagem) {
    var inserir = $.ajax({
        url: "https://app-p2-js-a2fa67e2c96b.herokuapp.com/mensagens",
        method: "POST",
        data: JSON.stringify(mensagem),
        dataType: "json",
        async: false,
        contentType: "application/json",
    });
}

function validarUsuario(objLoginSenha) {
    var retorno = false;

    var validacao = $.ajax({
        url: "https://app-p2-js-a2fa67e2c96b.herokuapp.com/usuarios/validar",
        method: "POST",
        dataType: "json",
        async: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        contentType: "application/json",
        data: JSON.stringify(objLoginSenha),
    }).fail(function () {
        return retorno;
    });

    validacao.done(function (data) {
        retorno = data;
    });

    return retorno;
}

function mostrarFeedback(mensagem, tipo) {
    const feedbackDiv = document.getElementById("mensagem-feedback");
    feedbackDiv.textContent = mensagem;
    feedbackDiv.style.display = "block";

    if (tipo === "sucesso") {
        feedbackDiv.style.backgroundColor = "#d4edda";
        feedbackDiv.style.color = "#155724";
        feedbackDiv.style.border = "1px solid #c3e6cb";
    } else {
        feedbackDiv.style.backgroundColor = "#f8d7da";
        feedbackDiv.style.color = "#721c24";
        feedbackDiv.style.border = "1px solid #f5c6cb";
    }

    setTimeout(() => {
        feedbackDiv.style.display = "none";
    }, 5000);
}

function limparFormulario() {
    document.getElementById("form-contato").reset();
}

function validarCampos(nome, email, mensagem) {
    if (!nome.trim()) {
        mostrarFeedback("Por favor, preencha o campo Nome.", "erro");
        return false;
    }

    if (!email.trim()) {
        mostrarFeedback("Por favor, preencha o campo E-mail.", "erro");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarFeedback("Por favor, insira um e-mail válido.", "erro");
        return false;
    }

    if (!mensagem.trim()) {
        mostrarFeedback("Por favor, preencha o campo Mensagem.", "erro");
        return false;
    }

    return true;
}

function enviarMensagemFormulario() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("msg").value;

    if (!validarCampos(nome, email, mensagem)) {
        return;
    }

    const objetoMensagem = {
        nome: nome.trim(),
        email: email.trim(),
        mensagem: mensagem.trim(),
    };

    const btnEnviar = document.getElementById("btn-enviar");
    btnEnviar.disabled = true;
    btnEnviar.textContent = "Enviando...";

    try {
        inserirMensagem(objetoMensagem);

        mostrarFeedback(
            "Mensagem enviada com sucesso! Entraremos em contato em breve.",
            "sucesso"
        );

        limparFormulario();
    } catch (error) {
        mostrarFeedback(
            "Erro ao enviar mensagem. Tente novamente mais tarde.",
            "erro"
        );
        console.error("Erro ao enviar mensagem:", error);
    } finally {
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Enviar";
    }
}

function inicializarPaginaContato() {
    document
        .getElementById("btn-enviar")
        .addEventListener("click", enviarMensagemFormulario);

    document
        .getElementById("form-contato")
        .addEventListener("keypress", function (e) {
            if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
                e.preventDefault();
                enviarMensagemFormulario();
            }
        });
}

$(document).ready(function () {
    if (document.getElementById("form-contato")) {
        inicializarPaginaContato();
    }
});

function validarCamposLogin(email, senha) {
            if (!email.trim()) {
                mostrarFeedback("Por favor, preencha o campo E-mail.", "erro");
                return false;
            }

            // Validação básica de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                mostrarFeedback("Por favor, insira um e-mail válido.", "erro");
                return false;
            }

            if (!senha.trim()) {
                mostrarFeedback("Por favor, preencha o campo Senha.", "erro");
                return false;
            }

            return true;
        }


function realizarLogin() {
            // Obter valores dos campos
            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

            // Validar campos
            if (!validarCamposLogin(email, senha)) {
                return;
            }

            // Criar objeto conforme esperado pela função validarUsuario
            const objLoginSenha = {
                email: email.trim(),
                senha: senha.trim()
            };

            // Desabilitar botão durante a validação
            const btnLogin = document.getElementById("btn-login");
            const textoOriginal = btnLogin.textContent;
            btnLogin.disabled = true;
            btnLogin.innerHTML = '<span class="loading"></span>Validando...';

            // Simular delay de rede (remova na implementação real)
            setTimeout(() => {
                try {
                    // Chamar função de validação
                    const loginValido = validarUsuario(objLoginSenha);

                    if (loginValido) {
                        // Login válido - redirecionar para mensagens.html
                        mostrarFeedback("Login realizado com sucesso! Redirecionando...", "sucesso");
                        
                        // Redirecionar após 1.5 segundos
                        setTimeout(() => {
                            window.location.href = "mensagens.html";
                        }, 1500);
                    } else {
                        // Login inválido
                        mostrarFeedback("E-mail e Senha inválidos", "erro");
                        
                        // Reabilitar botão
                        btnLogin.disabled = false;
                        btnLogin.textContent = textoOriginal;
                        
                        // Limpar campos
                        document.getElementById("senha").value = "";
                        document.getElementById("email").focus();
                    }
                } catch (error) {
                    console.error("Erro ao validar usuário:", error);
                    mostrarFeedback("Erro ao validar credenciais. Tente novamente.", "erro");
                    
                    // Reabilitar botão
                    btnLogin.disabled = false;
                    btnLogin.textContent = textoOriginal;
                }
            }, 1000); // Simula delay - remova na implementação real
        }

        // Inicializar quando o DOM estiver carregado
        $(document).ready(function () {
            // Event listener para o botão de login
            const btnLogin = document.getElementById("btn-login");
            if (btnLogin) {
                btnLogin.addEventListener("click", function(e) {
                    e.preventDefault();
                    realizarLogin();
                });
            }

            // Permitir login com Enter
            const formAdmin = document.getElementById("form-admin");
            if (formAdmin) {
                formAdmin.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        realizarLogin();
                    }
                });
            }

            // Focar no campo email ao carregar a página
            document.getElementById("email").focus();
        });


function mostrarFeedback(mensagem, tipo) {
            const feedbackDiv = document.getElementById("mensagem-feedback");
            feedbackDiv.textContent = mensagem;
            feedbackDiv.className = tipo;
            feedbackDiv.style.display = "block";

            // Remove a mensagem após 5 segundos
            setTimeout(() => {
                feedbackDiv.style.display = "none";
            }, 5000);
        }


        function criarLinhaTabela(mensagem, index) {
            const tr = document.createElement('tr');
            
            // Nome
            const tdNome = document.createElement('td');
            tdNome.className = 'nome-cell';
            tdNome.textContent = mensagem.nome || 'Nome não informado';
            tr.appendChild(tdNome);
            
            // Email
            const tdEmail = document.createElement('td');
            tdEmail.className = 'email-cell';
            tdEmail.textContent = mensagem.email || 'E-mail não informado';
            tr.appendChild(tdEmail);
            
            // Mensagem
            const tdMensagem = document.createElement('td');
            tdMensagem.className = 'mensagem-cell';
            tdMensagem.textContent = mensagem.mensagem || 'Mensagem não informada';
            tr.appendChild(tdMensagem);
            
            return tr;
        }

        function preencherTabela(mensagens) {
            const tbody = document.getElementById('tbody-mensagens');
            const tabela = document.getElementById('tabela-mensagens');
            const loadingContainer = document.getElementById('loading-container');
            const emptyContainer = document.getElementById('empty-container');
            const totalMensagens = document.getElementById('total-mensagens');
            
            // Limpar tbody
            tbody.innerHTML = '';
            
            // Esconder loading
            loadingContainer.style.display = 'none';
            
            // Atualizar estatísticas
            totalMensagens.textContent = mensagens.length;
            
            if (mensagens.length === 0) {
                // Mostrar estado vazio
                tabela.style.display = 'none';
                emptyContainer.style.display = 'block';
                return;
            }
            
            // Esconder estado vazio e mostrar tabela
            emptyContainer.style.display = 'none';
            tabela.style.display = 'table';
            
            // Preencher tabela com mensagens
            mensagens.forEach((mensagem, index) => {
                const linha = criarLinhaTabela(mensagem, index);
                tbody.appendChild(linha);
            });
        }

        function carregarMensagens() {
            const btnRefresh = document.getElementById('btn-refresh');
            const loadingContainer = document.getElementById('loading-container');
            const tabela = document.getElementById('tabela-mensagens');
            const emptyContainer = document.getElementById('empty-container');
            
            // Mostrar loading
            loadingContainer.style.display = 'block';
            tabela.style.display = 'none';
            emptyContainer.style.display = 'none';
            
            // Desabilitar botão
            btnRefresh.disabled = true;
            btnRefresh.innerHTML = 'Carregando...';
            
                try {
                    // Chamar função da API
                    const mensagens = obterMensagens();
                    
                    // Preencher tabela
                    preencherTabela(mensagens);
                    
                    // Mostrar feedback de sucesso
                    if (mensagens.length > 0) {
                        mostrarFeedback(`${mensagens.length} mensagem(ns) carregada(s) com sucesso!`, "sucesso");
                    } else {
                        mostrarFeedback("Nenhuma mensagem encontrada.", "info");
                    }
                    
                } catch (error) {
                    console.error("Erro ao carregar mensagens:", error);
                    mostrarFeedback("Erro ao carregar mensagens. Tente novamente.", "erro");
                    
                    // Mostrar estado vazio em caso de erro
                    document.getElementById('loading-container').style.display = 'none';
                    document.getElementById('empty-container').style.display = 'block';
                    document.getElementById('total-mensagens').textContent = '0';
                } finally {
                    // Reabilitar botão
                    btnRefresh.disabled = false;
                    btnRefresh.innerHTML = 'Atualizar';
                }
            
        }

        function realizarLogout() {
            if (confirm('Tem certeza que deseja sair da área administrativa?')) {
                window.location.href = 'admin.html';
            }
        }

        // Inicializar quando o DOM estiver carregado
        $(document).ready(function () {
            // Carregar mensagens automaticamente
            carregarMensagens();
        });