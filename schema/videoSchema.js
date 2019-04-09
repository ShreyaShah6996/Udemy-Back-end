const Sequelize = require('sequelize');
const { db } = require('../config/database');

const Course = require('./courseSchema');

const Video = db.define('video', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    courseId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isDelete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

Video.belongsTo(Course, { foreignKey: 'courseId' });

Video.sync({ force: false }).then((res) => {
    console.log('Video Table Created');
}).catch((err) => {
    console.log('Error While Creating Video Table');
})

module.exports = Video;