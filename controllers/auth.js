import jwt from "jwt-simple";

module.exports = app => {

    const User = app.models.User;

    return {
        authorize: _authorize
    }

    /**
     * Realiza a autorização de um usuário
     */
    function _authorize(req, res) {

        if (req.body.email && req.body.password) {

            const email = req.body.email;
            const password = req.body.password;

            User.findOne({
                email: email
            }).then(user => {

                user.comparePassword(password, (err, isMatch) => {

                    if (isMatch) {
                        const payload = {
                            id: user.id
                        };

                        res.helper.success('Usuário autenticado com sucesso.', {
                            token: jwt.encode(payload, process.env.JwtSecret)
                        });

                    } else {

                        res.helper.unauthorized();
                    }
                });
            }).catch(error => res.helper.unauthorized());

        } else {

            res.helper.unauthorized();
        }
    };
};
