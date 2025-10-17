const logger = (req, res, next) => {
    // Log the HTTP method and URL of the incoming request original request
    console.log(`${req.method} ${req.url} ${req.headers.host}`);
    next();
}

module.exports = logger;