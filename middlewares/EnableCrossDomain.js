'use strict';

/**
 * Middleware express para habilitar soporte de cross domain.
 * @class EnableCrossDomain
 * @module middlewares
 * @author Christian Giménez <chrisgabo15@gmail.com>
 */
module.exports = function(env) {
    /**
     * @param  {Request}  req  Objeto request de express.
     * @param  {Response} res  Objeto response de express.
     * @param  {Function} next Próximo middleware/callback en la ejecución Express.
     */
    return (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");

        if ("OPTIONS" == req.method) {
            res.status(200).send("Ok");
        } else {
            next();
        }
    };
};