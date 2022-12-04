/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/api/users', require('./users.js')(router));
    app.use('/api/group', require('./group.js')(router));
    app.use('/api/message', require('./message.js')(router));
};
