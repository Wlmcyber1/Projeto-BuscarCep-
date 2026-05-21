//inicializando mapa com um setView 
const map = L.map("map").setView([-14.235, -51.9253], 4);

//carregando visualiamente as imagens no browser
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// inicializando o marcador com nulo
let marker = null;

const btnPesquisa = document.querySelector(".pesquisa");
const cepInput = document.querySelector(".cepInput");
const solicitacao = document.querySelector(".solicitacao");
//Evento ao clicar o botão
btnPesquisa.addEventListener("click", () => {
  //adicionando tela de carregamento ao clicar no botão 
  const loadingDiv = document.createElement("div");
  loadingDiv.textContent = "Carregando...";
  loadingDiv.classList.add("loading"); 
  solicitacao.appendChild(loadingDiv);
  setTimeout(() => {
    loadingDiv.remove();
  }, 2000);

  const cep = document.querySelector(".cepInput").value.replace(/\D/g, "");
  if (cep.length !== 8) {
    alert("Por favor, escreva o cep completo");
  } else {
    buscarCep(cep);
  }
});
cepInput.addEventListener("input", () => mascaraCep(cepInput)); //chamando a funcao mascara
//MASCARA DO CEP
function mascaraCep(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.length > 5) {
    const parte1 = value.substring(0, 5);
    const parte2 = value.substring(5, 8);
    value = `${parte1}-${parte2}`;
  }

  input.value = value;
}
//Função para buscar o cep
async function buscarCep(cep) {
  const url = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const response = await url.json();

  if (response.erro) {
    alert("Cep nao encontrado no banco de dados");
    return;
  }

  const queryEndereco = `${cep},${response.logradouro},${response.localidade} - Brasil`;

  const urlMap = `https://nominatim.openstreetmap.org/search?format=json&street=${encodeURIComponent(response.logradouro)}&city=${encodeURIComponent(response.localidade)}&state=${encodeURIComponent(response.uf)}&country=Brazil&limit=1`; // erro aqui
  const respostaOsm = await fetch(urlMap);
  const dadosOsm = await respostaOsm.json();

  if (dadosOsm.length > 0) {
    const lat = dadosOsm[0].lat;
    const lon = dadosOsm[0].lon;

    atualizarMap(lat, lon, queryEndereco);
  } else {
    alert("Endereço nao encontrado");
  }
}
//atualizaco visual do mapa
async function atualizarMap(lat, lon, textoBalao) {
  if (marker) {
    map.removeLayer(marker);
  }
  //criando uma nova marcação
  map.setView([lat, lon], 15);
  marker = L.marker([lat, lon]).addTo(map).bindPopup(textoBalao).openPopup();
}
