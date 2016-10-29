import UserManager from "../manager/UserManager";

module.exports = (app) => {

    var controller = {
        create: _create,
        get: _get,
        update: _update,
    };

    return controller;

    /**
     * Cria um usuario  do tipo user
     * @method _create
     * @param  object req Requisição
     * @param  object res Resposta
     */
    function _create(req, res) {

        let user = req.body.user || {};

        UserManager
            .create(user)
            .then(result => res.helper.success(result.message, {
                user: result.model
            }))
            .catch(err => res.helper.warning(err));
    };

    /**
     * Lista os usuários cadastrados
     * @method _create
     * @param  object req Requisição
     * @param  object res Resposta
     */
    function _get(req, res) {

        UserManager
            .all()
            .then(result => res.helper.success(result.message, {
                users: result.models
            }))
            .catch(err => res.helper.warning(err));
    };

    /**
     * Atualiza os dados de um usuário
     * @method _create
     * @param  object req Requisição
     * @param  object res Resposta
     */
    function _update(req, res) {

        let data = req.body.user || {};

        UserManager
            .update(req.user.id, data)
            .then(message => res.helper.success(message))
            .catch(err => res.helper.warning(err));
    }
};
