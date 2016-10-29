import seeder from "./../scenarios/default-users"

describe("Testes de autenticação", function() {

    beforeEach(done => {

        seeder.run(dbData => {

            done();
        })
    });

    it("Não deve autenticar se o usuário não existir", done => {

        request
            .post("/token")
            .expect(401)
            .end((err, res) => {

                done();
            });
    });

    it("Não deve autenticar se a senha for inválida", done => {

        request
            .post("/token")
            .send({
                email: 'user@test.com',
                password: '654321'
            })
            .expect(401)
            .end((err, res) => {

                done();
            });
    });

    it("Deve autenticar se o email e a senha são compatíveis", done => {

        request
            .post("/token")
            .send({
                email: 'user@test.com',
                password: '123456'
            })
            .expect(200)
            .end((err, res) => {

                expect(res.body).to.have.property('message', 'Usuário autenticado com sucesso.');
                expect(res.body).to.have.deep.property('extra.token');
                done(err);
            });
    });
});
