'use strict';

/**
 * Clase Utilitaria ResponseUtil
 * @class ResponseUtil
 * @module utils
 * @author Christian Giménez <chrisgabo15@gmail.com>
 */

class ResponseUtil {

    constructor() {}

    /**
     * Centraliza el manejo de respuestas en el api.
     * @method sendResponse
     * @param res {Object}
     * @param status {integer}
     * @param data {Object}
     * @param error {Object}
     */
    sendResponse(res, status, data, error) {
        res.status(status).send({
            code: status,
            data: typeof data != 'undefined' ? data : null,
            error: typeof error != 'undefined' ? error : null
        });
    }

}

module.exports = new ResponseUtil();