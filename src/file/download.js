const fs = require('fs');
const path = require('path');
const express = require('express');
const { uploadPath } = require('../const.js');

const router = express.Router();

routerFileDownload = router.post('/download', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const body = req.body;
    if (!body) {
        res.send({ success: false, message: 'No post body received' });
        return ;
    }
    const fileName = body.filename;
    const filePath = path.join(uploadPath, fileName);
    if(!fs.existsSync(filePath)){
        res.send({ success: false, message:"File not exists" });
        return ;
    }
    res.status(200).download(filePath, fileName, (err)=>{
        if(err){
            res.send({ success: false, message:"Server err" });
        }
    });
});

module.exports = routerFileDownload;