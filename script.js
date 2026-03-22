// 1. Pegando os elementos do HTML x
let inputCep = document.getElementById("inputCep");
let btnBuscar = document.getElementById("btnBuscar");
let divResultado = document.getElementById("resultado");
let msgErro = document.getElementById("msgErro");

// Nova função: formatação do CEP
inputCep.addEventListener("input", function() {
    // 1. Pega o valor que o usuário digitou e remove tudo que não for número
    let valor = inputCep.value.replace(/\D/g, "");
    // 2. Se já tem mais de 5 digitos, coloca o tracinho no meio
    if (valor.length > 5) {
        valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    // 3. Devolve pro input o valor já formatado
    inputCep.value = valor;
});

// Centraliza o botão para não repetir o código 
function alternarBotao(estaCarregando) {
    if (estaCarregando) {
        btnBuscar.innerText = "Buscando..."
        btnBuscar.disabled = true // Impede duplo click acidental
    } else {
        btnBuscar.innerHTML = "Buscar";
        btnBuscar.disabled = false; // Libera o click
    }
}

//  Joga o erro na tela invés de usar o alert
function mostrarErro(mensagem) {
    msgErro.innerText = mensagem;
    msgErro.classList.remove("escondido");
    divResultado.classList.add("escondido"); // Esconde a caixa do resultado
}

// 2. Criando a função que vai ser disparada 
async function buscarInformacoes() {
    //  Esconde qualquer erro  que tenha ficado na busca anterior
    msgErro.classList.add("escondido");

    // Tira o tracionho antes de mandar para o viaCep
    let cepLimpo = inputCep.value.replace("-", "");

    // Validação
    if (cepLimpo === "") {
        mostrarErro("Por favor, digite um CEP.");
        return
    } 
    
    if (cepLimpo.length !== 8) {
        mostrarErro("O CEP deve ter exatamente 8 números.");
        return;
    }

    // Passou  nas validações, pode prosseguir
    let urlViaCep = `https://viacep.com.br/ws/${cepLimpo}/json/`;

    try {
        alternarBotao(true) // Trava o botão e avisa que tá buscando
        divResultado.classList.add("escondido");

        // Motoboy 1: o CEP
        let respostaCep = await fetch(urlViaCep);
        let dadosDoCep = await respostaCep.json();

        if(dadosDoCep.erro) {
            mostrarErro("CEP não encontrado. Digíte um CEP válido!");
            alternarBotao(false);
            return
        }

        let nomeCidade = dadosDoCep.localidade;
        let estado = dadosDoCep.uf;

        divResultado.innerHTML = `📍 Destino: <strong>${nomeCidade} - ${estado}</strong><br>⏳ Buscando o clima lá fora...`;
        divResultado.classList.remove("escondido");

        // Motoboy 2: O clima
        let linkDoClima = `https://wttr.in/${nomeCidade}?format=3`;
        let urlClima = `https://api.allorigins.win/raw?url=${encodeURIComponent(linkDoClima)}`;

        let respostaClima = await fetch(urlClima);
        let textoClima = await respostaClima.text();

        divResultado.innerHTML = `📍 Destino: <strong>${nomeCidade} - ${estado}</strong><br> ☁️ Clima atual: <strong> ${textoClima}</strong>`;

        alternarBotao(false); // Tudo certo, destrava o botão
    }catch (erro){
        console.error("O MOTIVO DO ERRO FOI: ", erro);
        // O catch captura erros graves como queda de internet ou site viaCep fora do ar
        mostrarErro("Ops! Deu um erro na busca. Tente novamente mais tarde.");
        alternarBotao(false); // Destrava o botão mesmo se der erro
    }
}

// 3. Colocando um "ouvinte de eventos" no botão
btnBuscar.addEventListener("click", buscarInformacoes);
