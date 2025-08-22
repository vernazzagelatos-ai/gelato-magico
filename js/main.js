let etapaAtual = 1;
const enigmas = [
  "Sou de pedra, redonda e antiga. Já vi gladiadores, leões e imperadores. Guardo um leite que nunca esfria. Onde estou?",
  "Sou cinco terras coloridas, grudadas na montanha, com cheiro de limão e mar. Onde o sol beija as pedras, e o gelato ganha cor?",
  "Sou uma ponte onde amores suspiram. À noite, a lua doura as águas, e o mel flui entre os canais. Onde estou?",
  "Sou uma montanha adormecida, que um dia cuspiu fogo. Sob minhas cinzas, nasce um cacau que queima de sabor. Onde estou?",
  "Sou uma torre que desafia a gravidade, inclinada mas de pé. Só quem equilibra a mente pode colher minha noz. Onde estou?",
  "Sou uma cúpula gigante, obra de um gênio renascentista. Quem a construiu usou matemática e loucura. Onde estou?",
  "Sou uma ilha de fogo, onde os deuses forjaram o mundo. Meu nome é um vulcão, e minha canela brilha como estrelas caídas. Onde estou?",
  "Sou um vale gelado entre montanhas. Aqui, os romanos construíram estradas, e ninfas dançam sob as estrelas. Onde estou?",
  "Sou uma gruta azul onde o mar canta. Dizem que sereias choram sal que brilha ao luar. Onde estou?",
  "Sou uma fonte onde moedas voam. Quem joga uma, sonha com estrelas. Mas o verdadeiro segredo está na inscrição esquecida: 'Trevi' vem de 'trivium'. O que isso significa?"
];


let etapaAtual = 1;

// ✅ 1. Iniciar Jogo: Mostra o jogo principal
function iniciarJogo() {
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('jogo').style.display = 'block';
  mostrarEnigma();
  iniciarMapa();
}

// ✅ 2. Ativar AR: SÓ AQUI carrega o AR.js e a câmera
function ativarAR() {
  // Mostra a tela de AR
  document.getElementById('jogo').style.display = 'none';
  document.getElementById('ar-view').style.display = 'block';

  // Carrega AR.js + A-Frame dinamicamente (só agora!)
  if (!window.ARLoaded) {
    const script1 = document.createElement('script');
    script1.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
      script2.onload = () => {
        window.ARLoaded = true;
        carregar CenaAR();
      };
      document.head.appendChild(script2);
    };
    document.head.appendChild(script1);
  } else {
    carregarCenaAR();
  }
}

// ✅ 3. Criar a cena AR dinamicamente
function carregarCenaAR() {
  const arView = document.getElementById('ar-view');
  arView.innerHTML = `
    <a-scene embedded arjs="trackingMethod: best; debugUIEnabled: false;" style="width: 100%; height: 100%;">
      <a-marker type="pattern" url="data/pattern-marker.patt">
        <a-entity
          id="objeto-ar"
          gltf-model="assets/models/mago.gltf"
          scale="0.8 0.8 0.8"
          position="0 0.5 0">
        </a-entity>
        <a-text value="Ingrediente Mágico!" color="#ffcc00" align="center" position="0 1.2 0" width="4"></a-text>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>

    <button onclick="sairAR()" style="position: absolute; top: 10px; right: 10px; background: red; color: white; border: none; padding: 10px; border-radius: 5px;">
      ✕ Sair
    </button>
  `;
}

// ✅ 4. Sair do AR
function sairAR() {
  document.getElementById('ar-view').innerHTML = ''; // Limpa a cena
  document.getElementById('ar-view').style.display = 'none';
  document.getElementById('jogo').style.display = 'block';
}

// Funções de enigma e mapa (como antes)
function mostrarEnigma() {
  const enigmas = [
    "Sou de pedra, redonda e antiga. Já vi gladiadores, leões e imperadores. Guardo um leite que nunca esfria. Onde estou?",
    // ... outros enigmas
  ];
  document.getElementById('texto-enigma').textContent = enigmas[etapaAtual - 1];
  falar(enigmas[etapaAtual - 1]);
}

function chamarMago() {
  mostrarEnigma();
}
