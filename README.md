# 📍 Busca de CEP com Mapa Interativo (Leaflet)

Um projeto simples e funcional que realiza a requisição de dados de localização a partir de um CEP digitado pelo usuário e exibe instantaneamente o local correspondente em um mapa interativo.

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estruturação da página e dos elementos de entrada.
- **JavaScript (ES6+)**: Lógica de consumo de API assíncrona (`fetch`) e manipulação do DOM.
- **API ViaCEP**: Serviço web gratuito para conversão de CEP em endereços completos e coordenadas.
- **Leaflet.js**: Biblioteca JavaScript open-source extremamente leve para criação de mapas interativos e renderização dos marcadores.

## 💡 Funcionalidades

- **Busca Dinâmica**: O usuário insere o CEP e o sistema busca o endereço completo.
- **Geolocalização no Mapa**: Integração com mapa para focar e centralizar visualmente a rua/bairro localizados.
- **Marcador Personalizado**: Adiciona um pin (marcador) no ponto exato retornado pelas coordenadas.

## 📁 Estrutura do Repositório

Para manter o foco no ambiente de produção e na entrega limpa do desafio, este repositório contém estritamente os arquivos essenciais para o funcionamento da aplicação:

- `index.html`: Estruturação da interface e importação do Leaflet via CDN.
- `main.js`: Lógica de requisição da API ViaCEP e inicialização/atualização do mapa Leaflet.
