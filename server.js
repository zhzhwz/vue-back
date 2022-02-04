const { response } = require('express');
const express = require('express');

const app = express();

app.all('/api/users', (request, response) => {
    const users = [
        { id: 1, name: 'zhzhwz' },
        { id: 2, name: 'pipiwu' },
        { id: 3, name: 'SmallY' },
        { id: 4, name: 'Once' },
    ];
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.end(JSON.stringify(users));
});

app.all('/api/fileName', (request, response) => {
    const files = [
        {filename: 'file1'},
        {filename: 'file2'},
        {filename: 'file3'},
    ]
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.end(JSON.stringify(files));
})

app.all('/api/fileDownload', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    const body = request.body;
    if (body == null) {
        return response.end('No such file');
    }
    response.end(body);
});

app.listen(3000, () => {
    console.log('Listening 3000');
});
