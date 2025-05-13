require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const patientRoutes = require('./src/routes/patientRoutes');

const app = express();
const port = process.env.PORT || 7154;

app.use(bodyParser.json());

app.use('/patients', patientRoutes);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
