'use strict';

/********************************
 ********* All routes ***********
 ********************************/
let v1Routes = [
    ...require('./fileUploadRoutes'),
    ...require('./adminRoutes'),
    ...require('./userRoutes'),
]

module.exports = v1Routes;