let mapaAdmin, pontosAdmin = [], raio = 500;

function initAdmin() {
  mapaAdmin = L.map('mapa-admin').setView([-23.5505, -46.6333], 12); // SP como padrão
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapaAdmin);

  document.getElementById('raio-slider').oninput = function() {
    raio = this.value;
    document.getElementById('raio-valor').textContent = `${raio}m`;
  };

  mapaAdmin.on('click', function(e) {
    if (pontosAdmin.length < 10) {
      const marker = L.marker([e.latlng.lat, e.latlng.lng])
        .addTo(mapaAdmin)
        .bindPopup(`Ponto ${pontosAdmin.length + 1}`).openPopup();
      pontosAdmin.push({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        nome: `Ponto Turístico ${pontosAdmin.length + 1}`
      });
    } else {
      alert("Você já definiu os 10 pontos!");
    }
  });
}

function salvarConfig() {
  const config = {
    centro: { lat: -23.5505, lng: -46.6333 },
    raio: raio,
    pontos: pontosAdmin
  };
  const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'config.json';
  a.click();
  document.getElementById('status').textContent = "Configuração salva!";
}

function limparConfig() {
  pontosAdmin = [];
  mapaAdmin.eachLayer(l => mapaAdmin.removeLayer(l));
  initAdmin();
}

window.onload = initAdmin;