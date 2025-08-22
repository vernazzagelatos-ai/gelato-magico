let mapaAdmin;
let raio = 500;
let centro = null;
let circulo = null;
let marcadorCentro = null;
let pontosAdmin = [];
let geocoder = L.Control.Geocoder.nominatim();

// Inicializa ao carregar
window.onload = function () {
  iniciarMapa();
  obterLocalizacaoAtual();
};

// 1. Obter localização atual
function obterLocalizacaoAtual() {
  const status = document.getElementById("local-atual");

  if ("geolocation" in navigator) {
    status.textContent = "Obtendo sua localização...";
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        centro = { lat, lng };
        status.innerHTML = `🟢 Latitude: ${lat.toFixed(6)}<br>Longitude: ${lng.toFixed(6)}`;
        centralizarMapa(lat, lng);
        adicionarMarcadorCentro(lat, lng);
        desenharCirculo(lat, lng, raio);
      },
      (erro) => {
        status.textContent = "❌ Falha ao obter localização. Use o campo abaixo.";
        console.error("Erro de geolocalização:", erro);
      }
    );
  } else {
    status.textContent = "❌ Seu navegador não suporta geolocalização.";
  }
}

// 2. Buscar endereço digitado
function buscarEndereco() {
  const input = document.getElementById("input-endereco");
  const endereco = input.value.trim();
  const status = document.getElementById("status");

  if (!endereco) {
    status.textContent = "⚠️ Digite um endereço válido.";
    return;
  }

  status.textContent = "🔎 Buscando endereço...";

  geocoder.geocode(endereco, (resultados) => {
    if (resultados.length > 0) {
      const { center } = resultados[0];
      centro = { lat: center.lat, lng: center.lng };
      document.getElementById("local-atual").innerHTML =
        `📍 Endereço encontrado:<br>${center.lat.toFixed(6)}, ${center.lng.toFixed(6)}`;
      centralizarMapa(center.lat, center.lng);
      adicionarMarcadorCentro(center.lat, center.lng);
      desenharCirculo(center.lat, center.lng, raio);
      status.textContent = "✅ Clique no mapa para definir os pontos.";
    } else {
      status.textContent = "❌ Endereço não encontrado.";
    }
  });
}

// 3. Iniciar mapa
function iniciarMapa() {
  mapaAdmin = L.map("mapa-admin").setView([-23.5505, -46.6333], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(mapaAdmin);

  // Clique no mapa para adicionar pontos
  mapaAdmin.on("click", adicionarPontoTuristico);
}

// 4. Centralizar mapa
function centralizarMapa(lat, lng) {
  mapaAdmin.setView([lat, lng], 16);
}

// 5. Adicionar marcador do centro
function adicionarMarcadorCentro(lat, lng) {
  if (marcadorCentro) marcadorCentro.remove();
  marcadorCentro = L.marker([lat, lng], {
    draggable: true,
  })
    .addTo(mapaAdmin)
    .bindPopup("Centro do Jogo")
    .openPopup();

  // Atualiza centro se arrastar
  marcadorCentro.on("dragend", function (e) {
    const pos = e.target.getLatLng();
    centro = { lat: pos.lat, lng: pos.lng };
    desenharCirculo(pos.lat, pos.lng, raio);
  });
}

// 6. Desenhar círculo de raio
function desenharCirculo(lat, lng, raio) {
  if (circulo) circulo.remove();
  circulo = L.circle([lat, lng], {
    radius: raio,
    color: "#d4144d",
    fillColor: "#d4144d",
    fillOpacity: 0.2,
    weight: 2,
  }).addTo(mapaAdmin);
  mapaAdmin.fitBounds(circulo.getBounds());
}

// 7. Atualizar raio em tempo real
function atualizarRaio() {
  raio = document.getElementById("raio-slider").value;
  document.getElementById("raio-display").textContent = `${raio}m`;
  if (centro) {
    desenharCirculo(centro.lat, centro.lng, raio);
  }
}

// 8. Adicionar ponto turístico (apenas dentro do raio)
function adicionarPontoTuristico(e) {
  const { lat, lng } = e.latlng;

  // Verifica se está dentro do raio
  if (!centro) {
    alert("Defina o centro do jogo primeiro!");
    return;
  }

  const distancia = calcularDistancia(lat, lng, centro.lat, centro.lng);
  if (distancia > raio) {
    alert(`❌ Esse ponto está fora do raio de ${raio}m. Escolha um local mais próximo.`);
    return;
  }

  if (pontosAdmin.length >= 10) {
    alert("✅ Você já definiu os 10 pontos turísticos!");
    return;
  }

  const marker = L.marker([lat, lng]).addTo(mapaAdmin);
  marker.bindPopup(`Ponto ${pontosAdmin.length + 1}`).openPopup();

  pontosAdmin.push({
    nome: `Ponto Turístico ${pontosAdmin.length + 1}`,
    lat,
    lng,
  });

  document.getElementById("status").textContent = `✅ ${pontosAdmin.length}/10 pontos definidos`;
}

// 9. Calcular distância entre dois pontos
function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // em metros
}

// 10. Salvar configuração
function salvarConfig() {
  if (!centro) {
    alert("❌ Defina o centro do jogo antes de salvar.");
    return;
  }

  const config = {
    centro,
    raio,
    pontos: pontosAdmin,
  };

  const blob = new Blob([JSON.stringify(config, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "config.json";
  a.click();

  alert(`✅ Configuração salva!\n${pontosAdmin.length} pontos dentro de ${raio}m.`);
}

// 11. Limpar tudo
function limparConfig() {
  if (confirm("Tem certeza que deseja limpar tudo?")) {
    pontosAdmin = [];
    if (circulo) circulo.remove();
    if (marcadorCentro) marcadorCentro.remove();
    mapaAdmin.eachLayer((layer) => {
      if (layer.options.draggable !== true && !layer._container) {
        mapaAdmin.removeLayer(layer);
      }
    });
    document.getElementById("status").textContent = "🎯 Clique no mapa para definir os 10 pontos turísticos";
  }
}
