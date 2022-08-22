<h1 align="center"> Calcular data de expiração do boleto </h1>

Uma biblioteca NPM para calcular o próximo dia útil a partir da data atual, pulando feriados e fins de semana.

 <p align="center">
<img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/>
</p>

## :hammer: Funcionalidades do projeto

Os testes a seguir foram feitos com o mês de abril de 2022, onde temos 2 feriados (Paixão de cristo 15/04 e Tiradentes 21/04).

  <p align="center">
<img src="https://i.pinimg.com/originals/c3/3c/bd/c33cbd7ea8a419f09c39d29fd68995b5.png" width="500" height="500"/>
</p>
<br>

- <b>`Fixando o dia 14/04/2022:`</b>
  <img src="./img/fixando-dia-util.png"/>
  <br>
- <b>`Exemplo 1`: Calcular 1 dia útil a partir de 14/04/2022, pulando os dias 15 (feriado), 16 e 17 (fim de semana) e trazendo o dia 18, a próxima segunda-feira.</b>
  <img src="./img/passando-1-dia-util.png"/>
  <img src="./img/conoslelog-result-1.png"/>
  <br>

- <b>`Exemplo 2`: Calcular 4 dias uteis a partir de 14/04/2022, pulando os dias 15 e 21 (feriado), 16 e 17 (finais de semana) e trazendo o dia 22, a próxima sexta-feira.</b>
  <img src="./img/passando-4-dia-util.png"/>
  <img src="./img/conoslelog-result-4.png"/>
  <br>

- <b>`Exemplo 3`: Calcular 7 dias uteis a partir de 14/04/2022, pulando os dias 15 e 21 (feriado), 16, 17, 23 e 24 (finais de semana) e trazendo o dia 22, a próxima sexta-feira.</b>
  <img src="./img/passando-7-dia-util.png"/>
  <img src="./img/conoslelog-result-7.png"/>
  <br>

- <b>`Como instalar:`</b>
  _npm i @maoxoo/calculate-billet-expiration_
  ou
  _yarn @maoxoo/calculate-billet-expiration_
  <br>

- <b>`Importando:`</b>
  **TypeScript:**
  _import { getExpirationDateByDaysSkippingWeekendsAndHolidays } from "@maoxoo/calculate-billet-expiration";_
  <br>

  **JavaScript:**
  _const expirationDate = require("@maoxoo/calculate-billet-expiration");_

## 📁 Acesso a biblioteca

**https://www.npmjs.com/package/@maoxoo/calculate-billet-expiration**

## ✔️ Técnicas e tecnologias utilizadas

- `TypeScript`
- `VS Code`
- `date-fns`
