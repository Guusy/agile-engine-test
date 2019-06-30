const isBusinessError = (error) => error.isBusinessError;
module.exports = (err, req, res, next) => {
    if (isBusinessError(err)) {
        return res.status(err.status).json({ message: err.message })
    }
    console.log("fatal error", err)
    return res.status(500).json(err);
};