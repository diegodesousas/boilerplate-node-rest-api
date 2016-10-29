module.exports = app => {

    app.post('/token', app.controllers.auth.authorize);
};
