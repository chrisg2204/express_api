'use strict';

/**
 * Rutas disponibles juntos a sus
 * controladores.
 * @module src
 */

// Config
const config = require('./config/app');
// Utils
const response = require('./utils/ResponseUtil');
// Controllers
const userController = require('./controllers/UserController');

module.exports = (express) => {

	let router = express.Router();

	/**
    * @apiDefine CustomContentType
    * @apiHeader {String="application/json"} Content-Type
    */

   /**
    * @apiDefine successResponse
    * @apiSuccess {Integer} code     Código HTTP.
    * @apiSuccess {Object=null} error     Objeto de errores.
    * @apiSuccess {Object} data     Data de respuesta.
    */

   /**
    * @apiDefine errorResponse
    * @apiError {Integer} code     Código HTTP.
    * @apiError {Object=null} data     Data de respuesta.
    * @apiError {Object} error     objeto de errores.
    */

   /**
    * @apiIgnore Not necesary
    * @api {GET} /
    * @apiVersion 0.0.1
    * @apiName TestRoute
    * @apiGroup Test
    */

	router.get('/', (req, res) => {
		response.sendResponse(res, 200, 'App listening on port: ' + config.API_PORT, null);
	});

	router.post('/user/add', (req, res) => {
		userController.add(req, res);
	});

	router.get('/user/all', (req, res) => {
		userController.findAll(req, res);
	});

	router.put('/user/update/:id', (req, res) => {
		userController.update(req, res);
	});

	router.delete('/user/delete/:id', (req, res) => {
		userController.delete(req, res);
	});

	return router;
};