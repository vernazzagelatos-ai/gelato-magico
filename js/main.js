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

function iniciarJogo() {
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('jogo').style.display = 'block';
  mostrarEnigma();
  iniciarMapa();
}

function mostrarEnigma() {
  const box = document.getElementById('texto-enigma');
  box.textContent = enigmas[etapaAtual - 1];
  falar(enigmas[etapaAtual - 1]);
}

function chamarMago() {
  mostrarEnigma();
}

function ativarAR() {
  document.getElementById('jogo').style.display = 'none';
  document.getElementById('ar-view').style.display = 'block';
  // Aqui você carrega o modelo 3D com base na etapa
  const modelo = `assets/models/ingrediente${etapaAtual}.glb`;
  const objeto = document.getElementById('objeto-ar');
  objeto.setAttribute('gltf-model', modelo);
}