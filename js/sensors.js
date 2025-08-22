function iniciarMinijogoEquilibrio() {
  alert("Equilibre o cálice mágico por 10 segundos!");
  const sucesso = () => {
    alert("Ingrediente coletado!");
    etapaAtual++;
    if (etapaAtual <= 10) {
      chamarMago();
      mostrarEnigma();
    } else {
      finalizarJogo();
    }
  };
  // Simples exemplo com acelerômetro
  window.addEventListener('devicemotion', function(e) {
    const x = e.acceleration.x;
    if (Math.abs(x) < 0.5) {
      setTimeout(sucesso, 10000);
      window.removeEventListener('devicemotion', arguments.callee);
    }
  }, { once: true });
}