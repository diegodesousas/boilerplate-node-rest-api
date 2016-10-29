export default class BaseManager {

    static model() {
        throw "O método model deve retornar a classe do modelo atual";
    }

    static defaultCreateMessage() {
        throw "O método defaultCreateMessage deve retornar a classe do modelo atual";
    };

    static defaultUpdateMessage() {
        throw "O método defaultUpdateMessage deve retornar a classe do modelo atual";
    };

    static create(data) {
        return new Promise((resolve, reject) => {

            this
                .model()
                .create(data)
                .then(model => {

                    resolve({
                        message: this.defaultCreateMessage(),
                        model: model
                    });
                })
                .catch(err => reject(err));
        });
    };

    static update(id, data) {
        return new Promise((resolve, reject) => {

            let query = {
                _id: id
            };

            let opts = {
                runValidators: true
            };

            this
                .model()
                .update(query, data, opts)
                .then(result => resolve(this.defaultUpdateMessage()))
                .catch(err => reject(err));
        });
    };

    static all() {
        return new Promise((resolve, reject) => {

            this
                .model()
                .find()
                .then(models => {
                    resolve({
                        message: this.defaultListMessage(),
                        models: models
                    });
                })
                .catch(err => reject(err));
        });
    };
}
