const { response } = require('express');
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

app.all('/api/fileDownload', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    const body = request.body;
    if (body == null) {
        return response.end('No such file');
    }
    request.end(body);
});

app.listen(3000, () => {
    console.log('Listening 3000');
});
