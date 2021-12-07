const express = require('express');
const mariadb = require('./database/connect/mariadb');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();


const app = express();
app.set('port', process.env.PORT || 3030);

// init test
app.get('/api', (req, res) => {
    res.send('Hello Express');
});

const jsonData = fs.readFileSync('./stock-list.json', 'utf-8');
app.get('/api/reading', (req, res) => {
    mariadb.query(`select * from ${process.env.DB_NAME}.leading`, (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
    // res.send(jsonData);
});

app.post('/api/reading', (req, res) => {
    console.log(req);
    res.send(JSON.stringify({isOK: true}));
});


app.use(cors({ origin: "http://localhost:3000" }));
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중...');
});