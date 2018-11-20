'use strict';

const dbConfig = require('../config/db');
const sequelize = require('sequelize');

/**
 * @class ModuleFactoryUtil
 * @module  utils
 */
class ModuleFactoryUtil {

	consturctor() {

	}

	/**
	 * Obtiene la instancia de SequelizeJS.
	 * @method getSequelizeInstance
	 * @return {Object} instancia de SequelizeJS
	 */
	getSequelizeInstance() {
		let self = this;

		if (!self._sequelize) {
			self._sequelize = new sequelize(
				dbConfig.DATABASE_CONFIG.NAME,
				dbConfig.DATABASE_CONFIG.USERNAME,
				dbConfig.DATABASE_CONFIG.PASSWORD, {
					logging: dbConfig.DATABASE_CONFIG.LOG_SEQUELIZE_TRANSACTIONS,
					host: dbConfig.DATABASE_CONFIG.HOST,
					dialect: dbConfig.DATABASE_CONFIG.DB_TYPE,
					pool: dbConfig.DATABASE_CONFIG.POOL,
					timezone: dbConfig.DATABASE_CONFIG.TIMEZONE,
					define: {
						freezeTableName: true,
						timestamps: false
					}
				}
			);
		}

		return self._sequelize;
	}
}

module.exports = new ModuleFactoryUtil();