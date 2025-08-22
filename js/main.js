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
  // Esconde a tela inicial com fade
  const inicio = document.getElementById('inicio');
  inicio.style.opacity = '0';
  setTimeout(() => {
    inicio.style.display = 'none';
  }, 500);

  // Mostra a tela AR
  document.getElementById('ar-container').style.display = 'block';

  // Garante que a cena AR será iniciada
  setTimeout(() => {
    const enigmaBox = document.getElementById('enigma-box');
    enigmaBox.style.display = 'block';
  }, 2000); // Mostra após o carregamento da cena
}

// Fecha o AR e volta para a tela inicial
function fecharAR() {
  document.getElementById('ar-container').style.display = 'none';
  const inicio = document.getElementById('inicio');
  inicio.style.display = 'flex';
  inicio.style.opacity = '1';
  window.speechSynthesis.cancel();
}

// Fala o enigma ao tocar na caixa
function falarEnigma() {
  const texto = "Grande aprendiz... O que é frio como o inverno, doce como o amor e derrete no coração?";
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'pt-BR';
  utterance.rate = 0.9;
  utterance.pitch = 1.2;
  utterance.volume = 1;
  speechSynthesis.speak(utterance);

  // Feedback visual
  const box = document.getElementById('enigma-box');
  box.textContent = "🎧 Enigma sendo falado...";
  setTimeout(() => {
    if (!window.speechSynthesis.speaking) {
      box.textContent = "Toque para ouvir o enigma...";
    }
  }, 3000);
}

// Opcional: tocar som mágico ao iniciar (se o usuário já interagiu)
document.addEventListener('click', function enableAudio() {
  // Isso libera o áudio no iOS/Android
  window.speechSynthesis.cancel();
  document.removeEventListener('click', enableAudio);
}, { once: true });
