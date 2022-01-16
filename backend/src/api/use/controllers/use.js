'use strict';

/**
 *  use controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::use.use');
