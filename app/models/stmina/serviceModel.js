'use strict';

const { Sequelize } = require('sequelize');
const { ROOM_BED_TYPE } = require('../../utils/constants');

module.exports = function (connection) {
    let services = connection.define("services", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: null
        },
        iconUrl: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: null
        },
        description: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    });

    return services;
};