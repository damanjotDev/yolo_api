'use strict';

const { Sequelize } = require('sequelize');

module.exports = function (connection) {
    let about = connection.define("abouts", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        
        images: {
            type: Sequelize.DataTypes.JSON,
            defaultValue: []
        },
        awards: {
            type: Sequelize.DataTypes.JSON,
            defaultValue: []
        },
    }, {
        timestamps: false
    });

    return about;
};