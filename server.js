const http = require('http');
const users = [
    {id: 1, name: 'zhzhwz'},
    {id: 2, name: 'pipiwu'},
    {id: 3, name: 'SmallY'},
    {id: 4, name: 'Once'},
]
const server = http.createServer(function(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    if (request.url == '/api/users') {
        response.end(JSON.stringify(users));
    }
    else {
        response.end('Not Found');
    }
});
server.listen(3000, () => {
    console.log('Listening 3000');
});