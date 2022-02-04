const express = require('express');
const fs = require('fs')

const app = express();

app.use(express.urlencoded({extended: false}));

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
        {filename: 'server.js'},
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
    const fileName = body.filename
    const filePath = './' + fileName
    if(!fs.existsSync(filePath)){
        return response.send({code:"1",message:"file is not exist"})
    }
    response.status(200).download(filePath,fileName,(err)=>{
        if(err){
            response.send({code:"1",message:"server err"})
        }
    })
    // response.end(query);
});

app.listen(3000, () => {
    console.log('Listening 3000');
});
