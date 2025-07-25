document.addEventListener('DOMContentLoaded', () => {
  let campeonatos = [];
  let modos = [];

  const modoSelect = document.getElementById('modoSelect');
  const campeonatoSelect = document.getElementById('campeonatoSelect');
  const detalhesContainer = document.getElementById('detalhes-container');

  // Carregar JSON com campeonatos
  fetch('data/campeonatos.json')
    .then(res => res.json())
    .then(data => {
      campeonatos = data.campeonatos;
      modos = data.modos;

      preencherOpcoesModo();
      preencherOpcoesCampeonato();

      modoSelect.addEventListener('change', atualizarFiltros);
      campeonatoSelect.addEventListener('change', exibirDetalhes);
    })
    .catch(error => {
      console.error('Erro ao carregar os campeonatos:', error);
    });

  function preencherOpcoesModo() {
    modos.forEach(modo => {
      const option = document.createElement('option');
      option.value = modo;
      option.textContent = modo;
      modoSelect.appendChild(option);
    });
  }

  function atualizarFiltros() {
    const modoSelecionado = modoSelect.value;
    const filtrados = modoSelecionado
      ? campeonatos.filter(c => c.modo === modoSelecionado)
      : campeonatos;

    // Limpa e preenche
    campeonatoSelect.innerHTML = '<option value="">Selecione</option>';
    filtrados.forEach(camp => {
      const option = document.createElement('option');
      option.value = camp.id;
      option.textContent = camp.nome;
      campeonatoSelect.appendChild(option);
    });

    // Limpa detalhes
    detalhesContainer.innerHTML = '<p>Selecione um campeonato para ver detalhes.</p>';
  }

  function exibirDetalhes() {
    const selectedId = campeonatoSelect.value;
    const campeonato = campeonatos.find(c => c.id === selectedId);
    if (campeonato) {
      detalhesContainer.innerHTML = `
        <h3 class="text-xl font-semibold mb-2">${campeonato.nome}</h3>
        <p><strong>Modo:</strong> ${campeonato.modo}</p>
        <p><strong>Data:</strong> ${campeonato.data}</p>
        <p><strong>Horário:</strong> ${campeonato.horario}</p>
        <p><strong>Tabela:</strong> ${campeonato.tabela}</p>
        <p class="mt-2">${campeonato.detalhes}</p>
      `;
    } else {
      detalhesContainer.innerHTML = '<p>Selecione um campeonato para ver detalhes.</p>';
    }
  }

  // Animação ao rolar
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        element.classList.add('animate__fadeInUp');
      }
    });
  };
  window.addEventListener('scroll', animateOnScroll);
});