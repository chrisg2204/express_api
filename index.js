'use strict';

let appConfig = require('./config/app');
let log = require('loglevel');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var express = require('express');
var app = express();

/**
 * Agrega los middlewares a usar por defecto.
 * @method loadMiddDefault
 */
function loadMiddDefault() {
    let midd = require('./middlewares'),
        loadMidd = appConfig.MIDDLEWARES_AUTOLOAD,
        len = loadMidd.length;
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            app.use(midd[loadMidd[i]]);
        }
    }
}

/**
 * Inicializa el servicio.
 * @method initService
 */
function initService() {
    log.setLevel(appConfig.LOG_LEVEL);
    app.use(cors({
        origin: '*'
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(require('./routes')(express));

    loadMiddDefault();

    if (process.env.NODE_ENV == 'test') {
        log.setLevel('error');

        app.listen(appConfig.TEST_API_PORT, '0.0.0.0');
        log.info('App listening on port: ' + appConfig.API_PORT);
    } else {
        app.listen(appConfig.API_PORT, '0.0.0.0');
        log.info('App listening on port: ' + appConfig.API_PORT);
    }
}

initService();

module.exports = app; // for testing