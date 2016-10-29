export default class ResponseHelper {

    constructor(res) {
        this.res = res;
    }

    success(message, extra = {}) {
        this.res.status(200).json({
            message: message,
            extra: extra
        });
    }

    warning(err) {
        if (err.errors) {
            this.res.status(422).json({
                errors: err.errors
            });
        } else {
            console.log(err);
            this.res.status(500).json(err);
        }
    }

    notFound(message) {
        this.res.status(404).json({
            message: message,
            extra: {}
        });
    }

    unauthorized() {
        this.res.sendStatus(401)
    }
}
