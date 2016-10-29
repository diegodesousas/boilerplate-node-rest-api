module.exports = app => {

    app.get('/help', (req, res) => {
        res.json({
            status: "Boilerplate Rest API"
        });
    });
};
