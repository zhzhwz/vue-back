const path = require('path');

const srcRoot = __dirname;
const uploadPath = path.join(srcRoot, '../', 'upload/');

module.exports = {
    srcRoot,
    uploadPath
}