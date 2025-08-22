// AR.js já está carregado no HTML
// Este arquivo pode ser expandido com lógica de modelos 3D
function carregarModeloAR(modeloURL) {
  const objeto = document.getElementById('objeto-ar');
  objeto.setAttribute('gltf-model', modeloURL);
}