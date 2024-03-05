const jwt = require('jsonwebtoken')
const { verifyToken } = require("../utils/jwtUtils");
const jwtKey = process.env.JWT_SECRET;

const isAuth = (req, res, next) => {
    let token = req.headers['authorization'];
    
    try {
        if(!token) {
            return res.status(401)
                        .json({
                            message: 'Permission denied!',
                            status: 401,
                        });
        }

        jwt.verify(token, jwtKey, (err, data) => {
            if(err) {
                return res.status(401)
                            .json({
                                message: 'Permission denied!',
                                status: 401,
                            });
            }

            req.user = data;
            next();
        });

    } catch (err) {
        return res.status(401)
                    .json({
                        message: 'Permission denied!',
                        status: 401,
                    })
    }
}

module.exports = {
    isAuth
}