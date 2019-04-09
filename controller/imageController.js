const Image = require('../schema/imageSchema');
const { db } = require('../config/database');
const Sequelize = require('sequelize');

exports.post = (body, done) => {
    Image.create(body).then((newImage) => {
        if (newImage) {
            done(null, newImage);
        }
    }).catch((err) => {
        done(err);
    });
}

exports.getByCourseId = (id, done) => {
    Image.findOne({ where: { courseId: id } }).then((getImage) => {
        if (getImage) {
            db.query("select images.id,images.name from images where  images.courseId =  " + id, { type: Sequelize.QueryTypes.SELECT })
                .then((data) => {
                    done(null, data)
                }).catch((err) => {
                    done(err)
                })
        }
        else {
            done({ message: "Id not found!!" })
        }
    })
}