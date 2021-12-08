const express = require('express');
const mariadb = require('./database/connect/mariadb');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// env
require('dotenv').config();

// FILE
const storage = multer.diskStorage({
    destination: './upload_files/',
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploader = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
});

// APP
const app = express();
app.set('port', process.env.PORT || 3030);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// init test
app.get('/api', (req, res) => {
    res.send('Hello Express');
});

const jsonData = fs.readFileSync('./stock-list.json', 'utf-8');
app.get('/api/leading', (req, res) => {
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

app.post('/api/leading', (req, res) => {
    console.log('ADD LEADING');
    console.log(req.body);
    // uploader.single('upload');
    res.send(JSON.stringify({isOK: true}));
});


app.use(cors({ origin: "http://localhost:5000" }));
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중...');
});