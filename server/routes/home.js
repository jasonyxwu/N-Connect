var secrets = require('../config/secrets');
var server = require('../server.js');
module.exports = function (router) {

    var homeRoute = router.route('/');

    homeRoute.get(function (req, res) {
        var connectionString = secrets.token;
        res.json({ message: 'My connection string is ' + port });
    });

    return router;
}
