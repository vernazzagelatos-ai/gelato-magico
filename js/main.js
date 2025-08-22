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
 * Lógica do jogo: AR, enigmas, navegação
 */

// Inicia o modo AR
function iniciarAR() {
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('ar-container').style.display = 'block';

  // Mostra o enigma após o mago aparecer
  setTimeout(() => {
    const enigmaBox = document.getElementById('enigma-box');
    enigmaBox.style.display = 'block';
    falarEnigma();
  }, 3000);
}

// Fecha o AR e volta para a tela inicial
function fecharAR() {
  document.getElementById('ar-container').style.display = 'none';
  document.getElementById('inicio').style.display = 'flex';
  document.getElementById('enigma-box').style.display = 'none';

  // Interrompe fala se estiver falando
  window.speechSynthesis.cancel();
}

// Fala o enigma usando voz sintetizada
function falarEnigma() {
  const texto = "O que é frio como o inverno, doce como o amor e derrete no coração?";
  const utterance = new SpeechSynthesisUtterance(texto);

  utterance.lang = 'pt-BR';   // Português do Brasil
  utterance.rate = 0.9;       // Velocidade
  utterance.pitch = 1.2;      // Tom mais mágico
  utterance.volume = 1;

  // Evento opcional: destacar caixa ao falar
  utterance.onstart = () => {
    const box = document.getElementById('enigma-box');
    box.style.transform = 'translateX(-50%) scale(1.05)';
    setTimeout(() => {
      if (window.speechSynthesis.speaking) {
        box.style.transform = 'translateX(-50%) scale(1)';
      }
    }, 500);
  };

  speechSynthesis.speak(utterance);
}

// Opcional: tocar som mágico ao iniciar AR
function tocarEfeitoMagico() {
  // const audio = new Audio('assets/sounds/magic-spell.mp3');
  // audio.play().catch(e => console.log("Áudio bloqueado (toque necessário)"));
}

// Pode-se expandir depois com:
// - Localização
// - Enigmas sequenciais
// - Animações do mago
// - Salvar progresso
