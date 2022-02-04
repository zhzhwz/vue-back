const express = require('express');
const fs = require('fs')
const path = require('path');
const bodyParser = require('body-parser');

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            // callback(filePath, stat);
            callback(name, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    ];
    walkSync('./files', function (filePath, stat) {
        files.push({filename: filePath});
    });
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.end(JSON.stringify(files));
})

app.all('/api/fileDownload', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    const body = request.body;
    if (!body) {
        return response.end('No such file');
    }
    const fileName = body.filename
    const filePath = './files/' + fileName
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
