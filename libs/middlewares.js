import bodyParser from 'body-parser';
import ResponseHelper from '../helpers/ResponseHelper';

module.exports = app => {
    app.set("port", 3000);
    app.set("json spaces", 4);
    app.use(bodyParser.json());
    app.use(app.libs.auth.initialize());
    app.use((req, res, next) => {

        res.helper = new ResponseHelper(res);
        next();
    });
};
