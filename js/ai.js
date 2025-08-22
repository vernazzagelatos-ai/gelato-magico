async function gerarFraseIA(prompt) {
  const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
    method: "POST",
    headers: { "Authorization": "Bearer SEU_TOKEN_AQUI" },
    body: JSON.stringify({ inputs: prompt }),
  });
  const data = await response.json();
  return data[0].generated_text;
}