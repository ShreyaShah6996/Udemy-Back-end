const { Router } = require('express');
const router = Router();
const path = require('path');

const multer = require('multer');

const { post, getByCourseId, deleteVideo, getByVideoId } = require('../controller/videoController');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Videos')
    },
    filename: (req, file, cb) => {
        cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage }).array('name', 10);

router.post('/course/add/video', upload, (req, res, next) => {
    var videos = [];
    for (let video of req.files) {
        videos.push(video.filename);
    }
    req.body.name = JSON.stringify(videos);
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

router.get('/getVideoByCourse/:courseId', (req, res) => {
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

router.delete('/removeVideo/:vid/:videoname', (req, res) => {
    const videoName = req.params.videoname;
    const videoId = req.params.vid;
    getByVideoId(videoId, (err, result) => {
        if (err) {

        }
        else {
            var videoresult = JSON.parse(result[0].name);
            var filteredVideo = videoresult.filter(v => (v !== videoName));
            var name = JSON.stringify(filteredVideo);
            deleteVideo(videoId, name, (err, result) => {
                if (err) {
                    res.statusCode = 400;
                    res.json(err);
                }
                else {
                    res.statusCode = 200;
                    res.json(result);
                }
            })
        }
    })

});

module.exports = router;