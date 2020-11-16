const express = require('express');
const path = require('path');
const { formatDate } = require('../helpers/date');
const CryptoJS = require('crypto-js/md5');
const { getData } = require('../comercio');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 8080;

app.use(express.static(publicPath));

app.post('/getnew', (req, res) => {
  const token = req.headers.authorization;

  const fecha = new Date();
  const fechaText = formatDate(fecha);
  if (CryptoJS(fechaText).toString() !== token) {
    return res.status(401).json({ ok: false });
  }
  const urlLink = req.body.url;
  getData(urlLink)
    .then((data) => {
      res.json({ ok: true, data });
    })
    .catch((error) => res.status(500).status({ ok: false, error }));
});

app.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${port}`);
});
