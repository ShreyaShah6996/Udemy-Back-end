const Sequelize = require('sequelize');
const { db } = require('../config/database');

const Course = require('./courseSchema');

const Image = db.define('image', {
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

Image.belongsTo(Course, { foreignKey: 'courseId' });

Image.sync({ force: false }).then((res) => {
    console.log('Image Table Created');
}).catch((err) => {
    console.log('Error While Creating Image Table');
})

module.exports = Image;