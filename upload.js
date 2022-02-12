const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const util = require('util');

const router = express.Router();
const upload = multer({ dest: 'upload/'});

routerUpload = router.post('/upload', upload.single('inputFile'),function(req,res,next){
    const oldPath = req.file.path;
    const newFileName = req.file.originalname;
    const extFileName = path.extname(newFileName);
    const baseFileName = path.basename(newFileName, extFileName);
    let newPath = path.join('upload/', baseFileName + extFileName);
    for (let i = 1; ; ++i) {
        try {
            const fd = fs.openSync(newPath, 'wx');
            fs.closeSync(fd);
        }
        catch (error) {
            console.log(error);
            newPath = path.join('upload/', baseFileName + '-' + String(i) + extFileName);
            continue;
        }
        break;
    }
    fs.renameSync(oldPath, newPath);
    res.send({ success: true });
});

module.exports = routerUpload;