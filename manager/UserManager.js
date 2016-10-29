import BaseManager from "./BaseManager";

export default class UserManager extends BaseManager {

    static model() {
        return app.models.User;
    }

    static defaultCreateMessage() {
        return "Usuário registrado com sucesso.";
    };

    static defaultUpdateMessage() {
        return "Usuário atualizado com sucesso.";
    };

    static defaultListMessage() {
        return "Usuários registrados";
    };
}
