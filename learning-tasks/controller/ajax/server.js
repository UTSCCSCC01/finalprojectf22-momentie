const express = require('express');

const app = express();

app.get('/json-server', (req, resp)=>{
    resp.setHeader('Access-Control-Allow-Origin','*');
    resp.send('HELLO AJAX!!');
});

app.listen(8000,()=>{
    console.log("8000 listening...");
});