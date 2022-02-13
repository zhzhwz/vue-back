const fs = require('fs');
const path = require('path');
const express = require('express');
const { uploadPath } = require('../const.js');

const router = express.Router();

function getFileName(currentDirPath) {
    const files = [];
    fs.readdirSync(currentDirPath).forEach((fileName) => {
        const filePath = path.join(currentDirPath, fileName);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            const fileSize = stat.size;
            files.push({ fileName, fileSize });
        }
    });
    return files;
}

routerFileName = router.get('/name', (req, res, next) => {
    const files = getFileName(uploadPath);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({ files }));
});

module.exports = routerFileName;