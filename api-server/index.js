const express = require('express');
const {SERVER} = require('./src/configs/main.config');
const db = require('./src/configs/db.config');

const authRoute = require('./src/routes/authentication.route');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/ping', (req, res) => {
    res.json({'status': 'ok'});
});

app.use('/api', authRoute);

const port = SERVER.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`App is listening at http://localhost:${port}`)
});