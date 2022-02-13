const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.urlencoded({ extended: false }));

const routerFileUpload = require('./file/upload.js');
app.use('/api/file', routerFileUpload);

const routerFileName = require('./file/name.js');
app.use('/api/file', routerFileName);

const routerFileDownload = require('./file/download.js');
app.use('/api/file', routerFileDownload);

app.listen(3000, () => {
    console.log('Listening 3000');
});
