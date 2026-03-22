# 🌍 Radar de Destino | Clima & CEP

Bem-vindo ao **Radar de Destino**, uma aplicação web interativa que permite aos usuários digitar um CEP brasileiro para descobrir instantaneamente a cidade, o estado e a condição climática atual do local.

🔗 **[Clique aqui para acessar o projeto online](https://gustavodod34-commits.github.io/radar-de-destino/)**

---

## 🎯 Objetivo do Projeto
Este projeto foi desenvolvido com o foco em aprimorar habilidades de **Front-End**, focando fortemente na manipulação do DOM, consumo de múltiplas APIs externas de forma sequencial e na melhoria contínua da Experiência do Usuário (UX).

---

## ✨ Funcionalidades

- **Busca de Endereço:** Retorna a Cidade e o Estado baseados no CEP digitado.
- **Clima em Tempo Real:** Retorna as condições climáticas atuais do destino pesquisado.
- **Máscara de Input (UX):** Formatação automática do CEP (`XXXXX-XXX`) enquanto o usuário digita.
- **Validação de Dados:** Impede a busca de CEPs vazios, incompletos ou com caracteres inválidos.
- **Feedback Visual (UX):** Botão de busca desabilitado durante o carregamento para evitar requisições duplicadas.
- **Tratamento de Erros:** Exibição de *Cards* de erro estilizados na tela (substituindo o `alert` padrão do navegador) em casos de CEP não encontrado ou falhas de rede.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica da aplicação.
- **CSS3:** Estilização responsiva, utilização de Flexbox e criação de UI fluida (sombras, transições e estados de botão).
- **JavaScript (Vanilla):** Lógica da aplicação.
  - Uso avançado de requisições assíncronas (`async` / `await`).
  - Manipulação de strings e Expressões Regulares (RegEx) para a máscara do CEP.
  - Estrutura `Try/Catch` para tratamento de exceções.

---

## 🔌 APIs Consumidas

1. **[ViaCEP](https://viacep.com.br/):** Utilizada para converter o número do CEP nos dados de localidade (Cidade e UF).
2. **[wttr.in](https://wttr.in/):** Utilizada para buscar o clima atual da cidade retornada pelo ViaCEP.
3. **[AllOrigins](https://allorigins.win/):** Proxy utilizado para contornar bloqueios de política de CORS durante a requisição do clima.
