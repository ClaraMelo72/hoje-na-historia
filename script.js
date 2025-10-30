const dateInput = document.getElementById('date-input');
const discoverBtn = document.getElementById('discover-btn');
const surpriseBtn = document.getElementById('surprise-btn');
const factDisplay = document.getElementById('fact-display');
const historyContainer = document.getElementById('history-container');

// Histórico de buscas
let searchHistory = JSON.parse(localStorage.getItem('history')) || [];

function updateHistoryDisplay() {
    if (searchHistory.length === 0) {
        historyContainer.innerHTML = '<p class="no-history">Nenhuma busca realizada ainda</p>';
        return;
    }
    
    const recentHistory = searchHistory.slice(-5).reverse();
    
    historyContainer.innerHTML = recentHistory.map(item => `
        <div class="history-item fade-in">
            <div class="history-date">${item.date}</div>
            <div class="history-fact">${item.fact}</div>
        </div>
    `).join('');
}

// Validar data
function isValidDate(dateString) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/;
    if (!regex.test(dateString)) return false;
    
    const [day, month] = dateString.split('/').map(Number);
    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    return day <= daysInMonth[month - 1];
}

// Buscar fato histórico na Wikipedia API
async function fetchHistoricalFact(date) {
    try {
        discoverBtn.innerHTML = '<span class="loading"></span> Buscando...';
        discoverBtn.disabled = true;
        
        const [day, month] = date.split('/').map(Number);
        
        // Usar Wikipedia API para buscar eventos do dia
        const response = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/pt/onthisday/events/${month}/${day}`);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }
        
        const data = await response.json();
        
        if (data.events && data.events.length > 0) {
            // Pegar um evento aleatório
            const randomEvent = data.events[Math.floor(Math.random() * data.events.length)];
            const year = randomEvent.year;
            const text = randomEvent.text;
            
            return `Em ${year}: ${text}`;
        } else {
            return getFallbackFact(date);
        }
    } catch (error) {
        console.error('Erro na API:', error);
        return getFallbackFact(date);
    } finally {
        discoverBtn.innerHTML = 'Descobrir Curiosidade!';
        discoverBtn.disabled = false;
    }
}

function getFallbackFact(date) {
    const [day, month] = date.split('/').map(Number);
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    const fallbackFacts = {
        '25/12': 'Em 25 de dezembro é celebrado o Natal, data do nascimento de Jesus Cristo segundo a tradição cristã.',
        '01/01': '1º de janeiro marca o início do ano novo no calendário gregoriano.',
        '07/09': 'Em 7 de setembro de 1822, o Brasil declarou sua independência de Portugal.',
        '21/04': 'Em 21 de abril de 1960, Brasília foi inaugurada como capital do Brasil.',
        '15/11': 'Em 15 de novembro de 1889, foi proclamada a República do Brasil.',
        '12/10': '12 de outubro é o dia de Nossa Senhora Aparecida, padroeira do Brasil.',
        '02/11': '2 de novembro é o Dia de Finados, data de homenagem aos falecidos.',
        '01/04': '1º de abril é conhecido como Dia da Mentira em muitos países.',
        '14/02': '14 de fevereiro é celebrado o Dia dos Namorados em muitos países.',
        '31/10': '31 de outubro é comemorado o Halloween em países de língua inglesa.'
    };
    
    if (fallbackFacts[date]) {
        return fallbackFacts[date];
    }
    
    const facts = [
        `No dia ${day} de ${monthNames[month-1]} ocorreram diversos eventos históricos ao longo dos séculos.`,
        `Muitos fatos importantes marcaram o dia ${day} de ${monthNames[month-1]} na história mundial.`,
        `O dia ${day} de ${monthNames[month-1]} testemunhou conquistas e descobertas significativas.`,
        `Vários eventos históricos transformaram o mundo no dia ${day} de ${monthNames[month-1]}.`
    ];
    
    return facts[Math.floor(Math.random() * facts.length)];
}

// Gerar data aleatória
function getRandomDate() {
    const day = Math.floor(Math.random() * 28) + 1;
    const month = Math.floor(Math.random() * 12) + 1;
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
}

// Exibir fato na tela
function displayFact(fact, date) {
    factDisplay.innerHTML = `<p>${fact}</p>`;
    factDisplay.classList.add('fade-in');
    
    const historyItem = {
        date: date,
        fact: fact
    };
    
    searchHistory.push(historyItem);
    
    if (searchHistory.length > 10) {
        searchHistory = searchHistory.slice(-10);
    }
    
    localStorage.setItem('history', JSON.stringify(searchHistory));
    updateHistoryDisplay();
    
    setTimeout(() => {
        factDisplay.classList.remove('fade-in');
    }, 500);
}

// Event Listeners
discoverBtn.addEventListener('click', async () => {
    const date = dateInput.value.trim();
    
    if (!date) {
        factDisplay.innerHTML = '<p>Por favor, digite uma data no formato DD/MM</p>';
        return;
    }
    
    if (!isValidDate(date)) {
        factDisplay.innerHTML = '<p>Data inválida. Use o formato DD/MM (ex.: 25/12)</p>';
        return;
    }
    
    const fact = await fetchHistoricalFact(date);
    displayFact(fact, date);
});

surpriseBtn.addEventListener('click', async () => {
    const randomDate = getRandomDate();
    dateInput.value = randomDate;
    
    const fact = await fetchHistoricalFact(randomDate);
    displayFact(fact, randomDate);
});

dateInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        discoverBtn.click();
    }
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    updateHistoryDisplay();
    
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    dateInput.placeholder = `${day}/${month}`;
});
