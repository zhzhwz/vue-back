const express = require('express');

const app = express();

const users = [
    {id: 1, name: 'zhzhwz'},
    {id: 2, name: 'pipiwu'},
    {id: 3, name: 'SmallY'},
    {id: 4, name: 'Once'},
];
app.all('/api/users', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    if (request.url == '/api/users') {
        response.end(JSON.stringify(users));
    }
    else {
        response.end('Not Found');
    }
});

app.listen(3000, () => {
    console.log('Listening 3000');
});
