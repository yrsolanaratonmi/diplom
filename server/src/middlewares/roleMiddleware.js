const jwt = require('jsonwebtoken')

module.exports = function (userRoles) {
    return function (req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) return res.status(403).send({ message: "user is not autorised" });

            const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
            let hasAcsess = false

            userRoles.forEach(role => {
                if (decodedData.roles.includes(role)) hasAcsess = true
            });

            if (!hasAcsess) {
                return res.status(403).send({ message: "u have no acsess" })
            }
            next()
        } catch (e) {
            return res.status(403).send({ message: "user is not autorised" });
        }

    }
}