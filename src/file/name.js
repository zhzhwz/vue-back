const fs = require('fs');
const path = require('path');
const express = require('express');
const { uploadPath } = require('../const.js');

const router = express.Router();

function getFileName(currentDirPath) {
    const fileNames = [];
    fs.readdirSync(currentDirPath).forEach((name) => {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            fileNames.push(name);
        }
    });
    return fileNames;
}

routerFileName = router.get('/name', (req, res, next) => {
    const fileNames = getFileName(uploadPath);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({ fileNames }));
});

module.exports = routerFileName;