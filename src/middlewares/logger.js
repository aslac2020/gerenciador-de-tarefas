module.exports = (req, res, next) => {

    //gera o traceId
    const traceId = Math.ceil(Math.random() * 9999999999);
    const logger = {
        error: (message, ...params) => {
            console.error(`[ERROR] traceId=${traceId}, msg=${message}`, ...params);
        },
        debug: (message, ...params) => {
            console.log(`[DEBUG] traceId=${traceId}, msg=${message}`, ...params);
        },
        info: (message, ...params) => {
            console.info(`[INFO] traceId=${traceId}, msg=${message}`, ...params);
        }
    }

    logger.info('requisição recebida', `url=${req.url}`, `metodo_http=${req.method}`);
    req.logger = logger;
    next();
}