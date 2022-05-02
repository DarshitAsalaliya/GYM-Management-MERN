const multer = require('multer');
var path = require('path');

// Configure Image For Folder Storage 

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.url === '/api/Member/Registration')
            cb(null, './public/memberimages');
        else
            cb(null, './public/memberimages');
    },
    filename: function (req, file, cb) {
        //var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = upload;