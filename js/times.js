// Variável de logo padrão para times sem logo
const logoPadrao = 'https://via.placeholder.com/150?text=Falta+Logo';

document.addEventListener('DOMContentLoaded', () => {
  fetch('data/times.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('times-container');
      data.times.forEach(time => {
        // Se o campo 'logo' estiver vazio ou ausente, usa a variável padrão
        const logoUrl = (time.logo && time.logo.trim() !== '') ? time.logo : logoPadrao;

        const card = document.createElement('div');
        card.className = 'bg-[#2F2F2F] rounded-lg p-4 shadow-lg';

        const logo = document.createElement('img');
        logo.src = logoUrl;
        logo.alt = `${time.nome} Logo`;
        logo.className = 'w-24 h-24 mx-auto mb-4 rounded-full object-cover';

        const nome = document.createElement('h3');
        nome.textContent = time.nome;
        nome.className = 'text-xl font-semibold text-center mb-2';

        const capitao = document.createElement('p');
        capitao.innerHTML = `<strong>Capitão:</strong> ${time.capitao}`;
        capitao.className = 'mb-2';

        const jogadores = document.createElement('div');
        jogadores.innerHTML = '<strong>Jogadores:</strong>';
        const ul = document.createElement('ul');
        ul.className = 'list-disc list-inside ml-4';
        time.participantes.forEach(jogador => {
          const li = document.createElement('li');
          li.textContent = jogador;
          ul.appendChild(li);
        });
        jogadores.appendChild(ul);

        card.appendChild(logo);
        card.appendChild(nome);
        card.appendChild(capitao);
        card.appendChild(jogadores);

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar os times:', error);
    });
});