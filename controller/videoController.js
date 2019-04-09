const Video = require('../schema/videoSchema');
const { db } = require('../config/database');
const Sequelize = require('sequelize');

exports.post = (body, done) => {
    Video.create(body).then((newVideo) => {
        if (newVideo) {
            done(null, newVideo);
        }
    }).catch((err) => {
        done(err);
    });
}

exports.getByCourseId = (id, done) => {
    Video.findOne({ where: { courseId: id } }).then((getVideo) => {
        if (getVideo) {
            db.query("select id,name from videos where isDelete = 0 && courseId = " + id, { type: Sequelize.QueryTypes.SELECT })
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

exports.deleteVideo = (id, name, done) => {
    db.query("update videos set name = '" + name + "' where id = " + id, { type: Sequelize.QueryTypes.UPDATE })
        .then((updateVideo) => {
            done(null, updateVideo)
        }).catch((err) => {
            done(err)
        })
}

exports.getByVideoId = (id, done) => {
    Video.findOne({ where: { id: id, isDelete: 0 } }).then((getVideo) => {
        if (getVideo) {
            db.query("select name from videos where id = " + id, { type: Sequelize.QueryTypes.SELECT })
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