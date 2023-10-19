const express = require('express');
const bodyParser = require('body-parser');
const insuranceRoutes = require('./routes/insuranceRoutes');

const app = express();
app.use(bodyParser.json());

// Usando el router de seguros
app.use('/insurance', insuranceRoutes);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

module.exports = app;  // Exportando app para testing o uso en otros archivos
