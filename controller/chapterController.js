const Chapter = require('../schema/chapterSchema');
// const { db } = require('../config/database');
// const Sequelize = require('sequelize');

exports.post = (body, done) => {
    Chapter.create(body).then((newChapter) => {
        if (newChapter) {
            done(null, newChapter);
        }
    }).catch((err) => {
        done(err);
    });
}

exports.getByCourseId = (id, done) => {
    Chapter.findAll({ where: { courseId: id, isDelete: 0 } })
        .then((getChapter) => {
            if (getChapter) {
                done(null, getChapter)
            }
            else {
                done({ message: "Id not found!!" })
            }
        })
}