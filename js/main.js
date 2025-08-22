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



// js/main.js

console.log("✅ main.js carregado!");

// Função chamada ao clicar em "Aceitar Missão"
function iniciarJogo() {
  console.log("🚀 Missão iniciada!");
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('jogo').style.display = 'block';
  
  // Inicia o mapa e mostra o enigma
  if (typeof iniciarMapa === 'function') {
    iniciarMapa();
  }
  if (typeof mostrarEnigma === 'function') {
    mostrarEnigma();
  }
}

// Função para chamar o Mago
function chamarMago() {
  if (typeof mostrarEnigma === 'function') {
    mostrarEnigma();
  }
  if (typeof falar === 'function') {
    falar("Sua jornada continua, Aprendiz!");
  }
}

// Função para ativar AR (opcional por enquanto)
/*
function ativarAR() {
  document.getElementById('jogo').style.display = 'none';
  document.getElementById('ar-view').style.display = 'block';
  console.log("👁️ AR ativado");
}
*/
// Função para sair do AR
function sairAR() {
  document.getElementById('ar-view').style.display = 'none';
  document.getElementById('jogo').style.display = 'block';
}

// Função de enigma (exemplo)
function mostrarEnigma() {
  const enigmas = [
    "Sou de pedra, redonda e antiga. Já vi gladiadores, leões e imperadores. Guardo um leite que nunca esfria. Onde estou?",
    "Sou cinco terras coloridas, grudadas na montanha, com cheiro de limão e mar. Onde o sol beija as pedras, e o gelato ganha cor?"
  ];
  const texto = document.getElementById('texto-enigma');
  if (texto) {
    texto.textContent = enigmas[0];
  }
}

// Função de voz (opcional)
function falar(texto) {
  if ('speechSynthesis' in window) {
    const utt = new SpeechSynthesisUtterance(texto);
    utt.lang = 'pt-BR';
    speechSynthesis.speak(utt);
  }
}
