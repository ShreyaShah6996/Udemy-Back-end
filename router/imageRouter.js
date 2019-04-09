const { Router } = require('express');
const router = Router();
const path = require('path');

const multer = require('multer');
const Jimp = require('jimp');


const { post, getByCourseId } = require('../controller/imageController');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Images')
    },
    filename: (req, file, cb) => {

        cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    },
    size: {
        width: 100,
        height: 100
    }
});

var upload = multer({ storage: storage }).array('name', 10);

router.post('/addImage', upload, (req, res, next) => {
    var images = [];
    for (let image of req.files) {
        images.push(image.filename);
        let imagePath = path.join(__dirname, '../Images/' + image.filename);
        let thumbnailImagePath = path.join(__dirname, '../Images/thumbnailImage/' + image.filename);
        Jimp.read(imagePath)
            .then(result => {
                return result
                    .resize(100, 100) // resize
                    .quality(100) // set JPEG quality
                    .write(thumbnailImagePath); // save
            })
            .catch(err => {
                console.error(err);
            });
    }

    req.body.name = JSON.stringify(images);
    post(req.body, (err, result) => {
        if (err) {
            res.statusCode = 400;
            res.json(err);
        }
        else {
            res.statusCode = 200;
            res.json(result);
        }
    })
});

router.get('/getImageByCourse/:courseId', (req, res) => {
    const id = req.params.courseId;
    getByCourseId(id, (err, result) => {
        if (err) {
            res.statusCode = 400;
            res.json(err);
        }
        else {
            res.statusCode = 200;
            res.json(result);
        }
    })
});

module.exports = router;