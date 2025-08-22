let mapa, marcadorJogador, pontosTuristicos = [];

function iniciarMapa() {
  fetch('/config.json').then(r => r.json()).then(config => {
    const { centro, raio } = config;
    mapa = L.map('mapa-container').setView([centro.lat, centro.lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapa);

    pontosTuristicos = config.pontos;
    pontosTuristicos.forEach((ponto, i) => {
      const ativo = i + 1 === etapaAtual;
      L.marker([ponto.lat, ponto.lng])
        .addTo(mapa)
        .bindPopup(`<b>${ponto.nome}</b><br>${ativo ? '🟢 Ativo' : '🔒 Bloqueado'}`);
    });

    marcadorJogador = L.circleMarker([0, 0], { color: '#14a8d4', radius: 10 }).addTo(mapa);

    navigator.geolocation.watchPosition(pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      marcadorJogador.setLatLng([lat, lng]);
      mapa.panTo([lat, lng]);

      verificarProximidade(lat, lng);
    });
  });
}

function verificarProximidade(lat, lng) {
  const ponto = pontosTuristicos[etapaAtual - 1];
  const dist = calcularDistancia(lat, lng, ponto.lat, ponto.lng);
  if (dist < 50) { // 50 metros
    alert(`Você chegou ao ${ponto.nome}! Prepare-se para o desafio!`);
    document.getElementById('ativar-ar').style.display = 'block';
  }
}

function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}