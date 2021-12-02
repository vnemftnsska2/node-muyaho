const express = require('express');
const cors = require('cors');
const fs = require('fs');


const app = express();
app.set('port', process.env.PORT || 3030);

// init test
app.get('/api', (req, res) => {
    res.send('Hello Express');
});

const jsonData = fs.readFileSync('./stock-list.json', 'utf-8');
app.get('/api/reading', (req, res) => {
    res.send(jsonData);
});


app.use(cors({ origin: "http://localhost:3000" }));
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중...');
});