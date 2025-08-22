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
/**
 * main.js
 * Com tratamento de erro para modelo .glb ausente
 */

let arSceneInitialized = false;

function iniciarAR() {
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('ar-container').style.display = 'block';

  if (!arSceneInitialized) {
    setTimeout(initARScene, 500);
    arSceneInitialized = true;
  }
}

function initARScene() {
  const scene = document.querySelector('a-scene');

  // Espera o A-Frame carregar
  if (scene.hasLoaded) {
    setupModelErrorHandling();
  } else {
    scene.addEventListener('loaded', () => {
      setupModelErrorHandling();
      showEnigma(); // Mostra enigma após carregar
    });
  }

  // Força resize para ativar câmera
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 1000);
}

function setupModelErrorHandling() {
  const modelEntity = document.getElementById('mago-model');
  const errorText = document.getElementById('erro-modelo');

  // Escuta se o modelo carregou
  modelEntity.addEventListener('model-loaded', () => {
    console.log('Modelo 3D carregado com sucesso!');
    errorText.setAttribute('visible', false);
  });

  // Escuta erro de carregamento
  modelEntity.addEventListener('model-error', () => {
    console.warn('⚠️ Modelo .glb não encontrado ou falhou ao carregar.');
    
    // Oculta o modelo (não faz nada, mas garantimos)
    modelEntity.setAttribute('visible', false);
    
    // Mostra mensagem opcional no AR
    errorText.setAttribute('visible', true);
  });
}

function showEnigma() {
  setTimeout(() => {
    const enigmaBox = document.getElementById('enigma-box');
    enigmaBox.style.display = 'block';
  }, 1000);
}

function fecharAR() {
  document.getElementById('ar-container').style.display = 'none';
  document.getElementById('inicio').style.display = 'flex';
  window.speechSynthesis.cancel();
}

function falarEnigma() {
  const texto = "Grande aprendiz... O que é frio como o inverno, doce como o amor e derrete no coração?";
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'pt-BR';
  utterance.rate = 0.9;
  utterance.pitch = 1.2;
  speechSynthesis.speak(utterance);

  const box = document.getElementById('enigma-box');
  box.textContent = "🎧 Falando...";
  setTimeout(() => {
    if (!speechSynthesis.speaking) {
      box.textContent = "Toque para ouvir o enigma...";
    }
  }, 3000);
}

// Libera áudio/vídeo no mobile
document.addEventListener('click', function unlockMedia() {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  context.resume().then(() => console.log('Áudio desbloqueado'));
  document.removeEventListener('click', unlockMedia);
}, { once: true });
