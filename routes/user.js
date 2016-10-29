module.exports = (app) => {

    app
        .route('/user')
        .post(app.controllers.user.create)
        .all(app.libs.auth.authenticate())
        .get(app.controllers.user.get)
        .put(app.controllers.user.update);
};
