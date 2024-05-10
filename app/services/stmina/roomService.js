
const { roomModel, serviceModel, propertyModel
} = require(`../../models`);
const { Sequelize, Op } = require('sequelize');
const { TYPE, PACKAGE_TYPE, MESSAGES } = require('../../utils/constants');
const _ = require("lodash");
const { createErrorResponse } = require('../../helpers/stmina/common/resHelper');
const commonFunctions = require('../../utils/utils');

let roomService = {};

/**
 * function to create new room to the system.
 * @param {*} payload 
 * @returns 
 */
roomService.createRoom = async (payload) => {
    try {
        let room = await roomModel.create(payload);
        return room
    } catch (err) {
        throw err;
    }
};

/**
 * function to fetch room from the system.
 * @param {*} criteria 
 * @returns 
 */
roomService.getRoom = async (criteria) => {
    return await roomModel.findOne({ 
        where: criteria, 
        include: [
            {
                 model: serviceModel,
                 as: 'service'
            },
            {
                model: propertyModel,
                as: 'property'
            }
        ]})
};

/**
 * function to update room data in the database.
 */
roomService.updateRoom = async (criteria, payload) => {
    try {
        let room = await roomModel.update(payload, { where: criteria });
        return room;
    } catch (err) {
        throw err;
    }
};

/**
 * function to remove room from system.
 * @param {*} criteria 
 * @returns 
 */
roomService.removeRoom = async (criteria) => {
    return await roomModel.destroy({ where: criteria });
};

/**
 * function to get All room from system.
 * @param {*} criteria 
 * @returns 
 */
roomService.getRooms = async (payload) => {
    let query = {};
    let filter = {}
    /**
     * filter section start
     */
    if(payload?.title) {filter['title'] = payload?.title;}
    if(payload?.price) {filter['price'] = payload?.price;}
    if(payload?.bedType) {filter['bedType'] = payload?.bedType;}
    // if(payload?.service_id) {filter['service_id'] = payload?.service_id;}
    if (payload?.property_id) {filter['property_id'] = payload?.property_id;}
    if(filter) {
        query["where"] = filter;
    }
    /* filter section end */

    if(payload?.field && payload?.order){
        const orderBy = [
            [payload.field, payload.order]
        ]
        query['order'] = orderBy 
    }
    if(payload?.page && payload?.pageSize){
        const offset = payload.page == 1 ? (payload.page-1) : ((payload.page-1) * payload.pageSize);
        const limit = payload.pageSize;
        query['offset'] = offset;
        query['limit'] = limit
    }

    query['include'] = [
        {
            model: serviceModel,
            as: 'service'
       },
       {
           model: propertyModel,
           as: 'property'
       }
    ]

    query['raw'] = true;
    query['distinct']= true
    return await roomModel.findAndCountAll(query);
};


module.exports = roomService;
