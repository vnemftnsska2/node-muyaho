const express = require('express');
const app = express();
app.set('port', process.env.PORT || 5000);

// init test
app.get('/', (req, res) => {
    res.send('Hello Express');
});

app.get('/reading', (req, res) => {
    res.json([{id: 1, name: '삼성전자'}, {id: 2, name: '카카오뱅크'}]);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중...'); 
});