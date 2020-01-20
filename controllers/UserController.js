'use strict'

// Config
const config = require('../config/app');
// Libs
const chalk = require('chalk');
const log = require('loglevel');
const Joi = require('joi');
// Utils
const response = require('../utils/ResponseUtil');
// Models
const models = require('../models/index');

class UserController {

	constructor() {}

	async add(req, res)  {
		let body = req.body;

		const schema = Joi.object().keys({
			username: Joi.string().required(),
			firstname: Joi.string().regex(/^[A-Za-z ]+$/).required(),
			lastname: Joi.string().regex(/^[A-Za-z ]+$/).required(),
			dni: Joi.string().required(),
			phone: Joi.optional(),
			dir: Joi.optional()
		});

		try {

			const objValid = await Joi.validate(body, schema);

			let Users = models.users;

			let findUsername = await Users.findOneUser({where:{ username: objValid.username }});
			if (findUsername == null) {
				let userSaved = await Users.addUser(objValid);

				if (userSaved) {
					response.sendResponse(res, 200, 'Usuario creado satisfactoriamente.', false);
					log.debug(`${chalk.bgGreen('Success')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/user/add - UserController?create')}`);
				}
			} else {
				response.sendResponse(res, 400, 'Usuario '+'"'+findUsername.username+'"'+' ya existe.', true);
			}
		} catch(err) {
			response.sendResponse(res, 500, err, true);
			log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/user/add - UserController?create')}`);
			log.error(err);
		}
	}

	async findAll(req, res) {
		let pageSize = 50;
		let page =  0;
		let limit = pageSize;
		let offset = (page * pageSize);
		let condition = {};

		try {

			let Users = models.users;

			let allUsers = await Users.findAllUser(condition, limit, offset);

			response.sendResponse(res, 200, allUsers.rows, false);
			log.debug(`${chalk.bgGreen('Success')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/user/all - UserController?findAll')}`);

		} catch(err) {
			response.sendResponse(res, 500, err, true);
			log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/user/all - UserController?findAll')}`);
			log.error(err);
		}
	}

	async update(req, res) {
		let userId = req.params.id;
		let body = req.body;
		let condition = {where:{ id: userId }};

		const schema = Joi.object().keys({
			firstname: Joi.string().regex(/^[A-Za-z ]+$/).required(),
			lastname: Joi.string().regex(/^[A-Za-z ]+$/).required(),
			dni: Joi.string().required(),
			phone: Joi.optional(),
			dir: Joi.optional()
		});

		try {

			const objValid = await Joi.validate(body, schema);

			let Users = models.users;

			let findUserId = await Users.findOneUser({where:{ id: userId }});
			if (findUserId) {
				let updateUser = await Users.updateUser(objValid, condition)
				if (updateUser) {
					response.sendResponse(res, 200, 'User updated successful.', false);
					log.debug(`${chalk.bgGreen('Success')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/user/update/:id - UserController?update')}`)
				}
			} else {
				response.sendResponse(res, 404, 'User '+'"'+userId+'"'+'not found', true);
				log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/user/update/:id - UserController?update')}`);
			}
		} catch(err) {
			response.sendResponse(res, 500, err, true);
			log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/user/update/:id - UserController?update')}`);
			log.error(err);
		}
	}

	async delete(req, res) {
		let userId = req.params.id;
		let condition = {where:{ id: parseInt(userId) }};

		try {

			let Users = models.users;

			let findUserId = await Users.findOneUser(condition);
			if (findUserId) {
				let deleteUser = await Users.deleteUser(condition);
				if (deleteUser) {
					response.sendResponse(res, 200, 'User deleted successful.', false);
					log.debug(`${chalk.bgGreen('Success')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/user/delete/:id - UserController?delete')}`);
				}
			} else {
				response.sendResponse(res, 404, 'User '+'"'+userId+'"'+'not found', true);
				log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/user/delete/:id - UserController?delete')}`);
			}
		} catch (err) {
			response.sendResponse(res, 500, err, true);
			log.debug(`${chalk.bgRed('Error')} ${chalk.bgMagenta('Exec')} ${chalk.bgCyan(req.method)} ${chalk.bgYellow('/user/delete/:id - UserController?delete')}`);
			log.error(err);
		}
	}
}

module.exports = new UserController();