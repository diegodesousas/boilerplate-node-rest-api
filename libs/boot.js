module.exports = app => {
    app.listen(app.get('port'), () => console.log(`Boilerplate Rest API listen port ${app.get('port')}`));
};
