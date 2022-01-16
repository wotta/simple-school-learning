'use strict';

/**
 * use service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::use.use');
