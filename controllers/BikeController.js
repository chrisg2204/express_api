'use strict'

// Config
const configApp = require('../config/app');
// Libs
const chalk = require('chalk');
const log = require('loglevel');
// Utils
const response = require('../utils/ResponseUtil');
const validate = require('../utils/ValidateUtil');
// Models
const models = require('../models/index');

class BikeController {

	constructor() {}

	add(req, res)  {
		let body = req.body;

		if ('nombre' in body && 'modelo' in body && 'color' in body && 'rodado' in body && 'precio' in body) {
			const Joi = require('joi');

			const schema = Joi.object().keys({
				nombre: Joi.string().regex(/^[A-Za-z ]+$/).required(),
				modelo: Joi.string().required(),
				color: Joi.string().required(),
				rodado: Joi.string().required(),
				precio: Joi.number().required().integer() 
			});

			Joi.validate(body, schema, (err, value) => {
				if (err) {

					response.sendResponse(res, 422, err.details, false);
				} else {
					let Storage = models.storage;

					Storage.addBike(body)
						.then(bikeSaved => {
							if (bikeSaved) {
								log.debug(`${chalk.bgGreen('Success')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/add - BikeController?add')}`);
								response.sendResponse(res, 200, 'Bike save successful.', false);
							}
						})
						.catch(err => {
							log.error(err);
							log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/add - BikeController?add')}`);
						});
				}
			});

		} else {
			log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/add - BikeController?add')}`);
			response.sendResponse(res, 404, "Faltan parametros del servicio", false);
		}
	}

	findAll(req, res) {
		let pageSize = 50;
        let page =  0;
        let limit = pageSize;
        let offset = (page * pageSize);
        let condition = {};

		let Storage = models.storage;

		Storage.findAllBikes(condition, limit, offset)
			.then(allBikes => {
				if (allBikes.count != 0) {
					log.debug(`${chalk.bgGreen('Success')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/all - BikeController?findAll')}`);
					response.sendResponse(res, 200, allBikes.rows, false);
				} else {
					response.sendResponse(res, 404, null, false);
				}
		})
		.catch(err => {
			log.error(err);
			log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/all - BikeController?findAll')}`);
		});
	}

	update(req, res) {
		let bikeId = req.params.id;
		let body = req.body;
		let condition = {
			where: {
				id: bikeId
			}
		};

		if ('nombre' in body && 'modelo' in body && 'color' in body && 'rodado' in body && 'precio' in body) {
			const Joi = require('joi');

			const schema = Joi.object().keys({
				nombre: Joi.string().regex(/^[A-Za-z ]+$/).required(),
				modelo: Joi.string().required(),
				color: Joi.string().required(),
				rodado: Joi.string().required(),
				precio: Joi.number().required().integer() 
			});

			Joi.validate(body, schema, (err, value) => {
				if (err) {

					response.sendResponse(res, 422, err.details, false);
				} else {
					let Storage = models.storage;

					Storage.findOneBike(condition)
						.then(bikeFinded => {
							if (bikeFinded) {
								Storage.updateBike(body, condition)
								.then(bikeUpdated => {
									if (bikeUpdated) {
										log.debug(`${chalk.bgGreen('Success')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/update- BikeController?delete')}`);
										response.sendResponse(res, 200, 'Bike updated successful.', false);	
									}
								})
								.catch(err => {
									log.error(err);
									log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/update - BikeController?update')}`);
								})
							} else {
								response.sendResponse(res, 404, null, false);
							}
						})
						.catch(err => {
							log.error(err);
							log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/update - BikeController?update')}`);
						});
				}
			});

		} else {
			log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/add - BikeController?add')}`);
			response.sendResponse(res, 404, "Faltan parametros del servicio", false);
		}
	}

	delete(req, res) {
		let bikeId = req.params.id;
		let condition = {
			where: {
				id: bikeId
			}
		};

		let Storage = models.storage;

		Storage.findOneBike(condition)
		.then(bikeFinded => {
			if (bikeFinded) {
				Storage.destroyBike({id: bikeFinded.dataValues.id})
				.then(bikeDeleted => {
					if (bikeDeleted) {
						log.debug(`${chalk.bgGreen('Success')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/delete - BikeController?delete')}`);
						response.sendResponse(res, 200, 'Bike deleted successful.', false);
					}
				})
				.catch(err => {
					log.error(err);
					log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/delete - BikeController?delete')}`);
				});
			} else {
				response.sendResponse(res, 404, null, false);
			}
		})
		.catch(err => {
			log.error(err);
			log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/bike/delete - BikeController?delete')}`);
		});
	}

}

module.exports = new BikeController();