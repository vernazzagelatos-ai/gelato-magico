function falar(texto) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    speechSynthesis.speak(utterance);
  } else {
    console.log("Síntese de voz não suportada");
  }
}