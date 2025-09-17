```js
const express = require("express");
const mercadopago = require("mercadopago");
require("dotenv").config();

const app = express();
app.use(express.json());

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

app.post("/criar-pagamento", async (req, res) => {
  try {
    const { title, quantity, unit_price } = req.body;

    const preference = {
      items: [
[17/9 15:42] Chat GPT: {
          title,
          quantity,
          currency_id: "BRL",
          unit_price
        }
      ],
      back_urls: {
        success: "https://seusite.com/sucesso",
        failure: "https://seusite.com/falha",
        pending: "https://seusite.com/pendente"
      },
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```
