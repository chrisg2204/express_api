'use strict';

/**
 * Rutas disponibles juntos a sus
 * controladores.
 * @module src
 */

// Config
const appConfig = require('./config/app');
// Utils
const response = require('./utils/ResponseUtil');
// Controllers
const bikeController = require('./controllers/BikeController');

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
              response.sendResponse(res, 200, 'App listening on port: ' + appConfig.API_PORT, null);
       });

       router.post('/bike/add', (req, res) => {
        bikeController.add(req, res);
       });

       router.get('/bike/all', (req, res) => {
        bikeController.findAll(req, res);
       });

       router.delete('/bike/delete/:id', (req, res) => {
        bikeController.delete(req, res);
       });

       router.put('/bike/update/:id', (req, res) => {
        bikeController.update(req, res);
       })


       return router;
};