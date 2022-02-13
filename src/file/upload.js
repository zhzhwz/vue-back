const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { uploadPath } = require('../const.js');

const router = express.Router();
const upload = multer({ dest: uploadPath });

routerFileUpload = router.post('/upload', upload.single('inputFile'),function(req,res,next){
    const oldPath = req.file.path;
    const newFileName = req.file.originalname;
    const extFileName = path.extname(newFileName);
    const baseFileName = path.basename(newFileName, extFileName);
    let newPath = path.join(uploadPath, baseFileName + extFileName);
    for (let i = 1; ; ++i) {
        let fd = null;
        try {
            fd = fs.openSync(newPath, 'wx');
        }
        catch (error) {
            newPath = path.join(uploadPath, baseFileName + '-' + i + extFileName);
            continue;
        }
        finally {
            if (fd !== null) {
                fs.closeSync(fd);
            }
        }
        break;
    }
    fs.renameSync(oldPath, newPath);
    res.send({ success: true });
});

module.exports = routerFileUpload;