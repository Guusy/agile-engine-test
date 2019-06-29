const express = require('express');

const app = express();
const transactions = require('./routes/transactions');

app.use(express.static('dist'));
app.get('/api/ping', (req, res) => res.send({ message: 'pong' }));


app.use('/api/transactions', transactions);

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
}

module.exports = app;
