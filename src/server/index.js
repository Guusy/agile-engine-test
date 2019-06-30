const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const errorsHandler = require('./errors/errorsHandler')
const transactions = require('./routes/transactions');
const balance = require('./routes/balance');

app.use(bodyParser.json());

app.use(express.static('dist'));
app.use('/api', balance);
app.use('/api/transactions', transactions);
app.get('/api/ping', (req, res) => res.send({ message: 'pong' }));


app.use(errorsHandler);


if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
}

module.exports = app;
