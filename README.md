# 📅 Hoje na História

## Descrição
Este projeto é um WebApp de fatos históricos desenvolvido como atividade da disciplina de Desenvolvimento Web, do curso de Análise e Desenvolvimento de Sistemas. A aplicação permite buscar e exibir fatos históricos sobre qualquer data, utilizando a API pública da Wikipedia. Os usuários podem pesquisar eventos históricos por data específica, descobrir curiosidades sobre datas aleatórias e manter um histórico das buscas realizadas.

## Funcionalidades
- **Busca por Data**: Pesquise fatos históricos por data no formato DD/MM
- **Data Aleatória**: Descubra eventos interessantes sobre uma data surpresa
- **Histórico de Buscas**: Visualize suas últimas pesquisas realizadas
- **Design Responsivo**: Interface adaptada para dispositivos móveis e desktop
- **Armazenamento Local**: Seu histórico fica salvo no navegador
- **Animações Suaves**: Transições e efeitos visuais para melhor experiência

## Tecnologias Utilizadas
- **HTML5**: Estrutura da interface
- **CSS3**: Estilização, com uso de gradientes, animações e design responsivo
- **JavaScript (ES6)**: Lógica de interação e integração com a API
- **Wikipedia API**: Fonte de dados pública para fatos históricos
- **LocalStorage**: Armazenamento do histórico de buscas

## Estrutura do Projeto

`Hoje-na-Historia/`  
├── `index.html` - Estrutura principal da interface  
├── `style.css` - Estilização completa e responsiva  
├── `script.js` - Lógica de interação e integração com a API  
└── `README.md` - Documentação do projeto

## Deploy Online
https://claramelo72.github.io/hoje-na-historia/

## Como Executar Localmente
1. **Clone o repositório** ou faça o download dos arquivos
2. **Hospede localmente**:
   - Use um servidor local (ex.: Live Server no VS Code)
   - Ou execute: `python -m http.server 8000` (requer Python)
   - Alternativamente, abra o arquivo `index.html` diretamente no navegador
3. **Interaja com a aplicação**:
   - Digite uma data no formato DD/MM (ex: 07/09)
   - Clique em "Descobrir Curiosidade!" ou pressione Enter
   - Use "Me surpreenda!" para uma data aleatória
   - Visualize seu histórico de buscas na seção inferior

   ## API Utilizada
**Wikipedia On This Day API**:
https://api.wikimedia.org/feed/v1/wikipedia/pt/onthisday/events/{mês}/{dia}

## Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexão com a internet para acessar a Wikipedia API
