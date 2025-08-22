// AR.js já está carregado no HTML
// Este arquivo pode ser expandido com lógica de modelos 3D

// Ativar AR em tela cheia
function ativarAR() {
  document.getElementById('jogo').style.display = 'none';
  document.getElementById('ar-view').style.display = 'block';

  // Carrega o modelo 3D com base na etapa atual
  const modelo = `assets/models/ingrediente${etapaAtual}.glb`;
  const objeto = document.getElementById('objeto-ar');
  objeto.setAttribute('gltf-model', modelo);

  // Dica visual
  setTimeout(() => {
    alert(`Olhe para o chão ou uma superfície plana para ver o ingrediente mágico!`);
  }, 1000);
}

// Sair do AR e voltar ao jogo
function sairAR() {
  document.getElementById('ar-view').style.display = 'none';
  document.getElementById('jogo').style.display = 'block';

  // Reativa o botão de AR (pode ser usado de novo)
  document.getElementById('ativar-ar').style.display = 'block';
}
