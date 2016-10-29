import seeder from "./../scenarios/default-users";
import jwt from "jwt-simple";

describe('Testes de usuário', () => {

    let token;

    beforeEach(done => {
        seeder.run(dbData => {

            token = jwt.encode({
                id: dbData.users.test.id
            }, process.env.JwtSecret);

            done();
        });
    });

    it('Deve criar um usuário', (done) => {

        let user = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: '123456'
        };

        request
            .post("/user")
            .send({
                user: user
            })
            .expect(200)
            .end((err, res) => {

                should.not.exist(err);
                expect(res.body).to.have.property('message', 'Usuário registrado com sucesso.');
                expect(res.body).to.have.property('extra');
                expect(res.body).to.have.deep.property('extra.user.name');
                expect(res.body).to.have.deep.property('extra.user.email');
                expect(res.body).to.have.deep.property('extra.user.password');
                expect(res.body).to.have.deep.property('extra.user.createdAt');
                expect(res.body).to.have.deep.property('extra.user.updatedAt');

                assert.notEqual(res.body.extra.user.password, '123456');

                done(err);
            });
    });

    it('Deve recuperar todos os usuários', (done) => {

        request
            .get("/user")
            .set("Authorization", `JWT ${token}`)
            .expect(200)
            .end((err, res) => {

                expect(res.body).to.have.property('message', 'Usuários registrados');
                expect(res.body).to.have.property('extra');
                expect(res.body).to.have.deep.property('extra.users');
                assert.isArray(res.body.extra.users);
                assert.equal(2, res.body.extra.users.length);
                done(err);
            });
    });

    it('Deve atualizar o usuário autenticado', done => {

        let params = {
            user: {
                name: 'Alan Bida',
                email: 'alanbida@ondecortar.com.br'
            }
        };

        request
            .put("/user")
            .set("Authorization", `JWT ${token}`)
            .send(params)
            .expect(200)
            .end((err, res) => {

                expect(res.body).to.have.property('message', 'Usuário atualizado com sucesso.');
                expect(res.body).to.have.property('extra');

                seeInDatabase('users', params.user, (err, result) => {

                    expect(result).to.have.lengthOf(1);
                    done(err);
                });
            });
    });

    it('Não deve criar o usuário se os dados forem inválidos', done => {

        request
            .post("/user")
            .expect(422)
            .end((err, res) => {

                should.not.exist(err);
                expect(res.body).to.have.deep.property('errors.name.message', 'O campo nome é obrigatório.');
                expect(res.body).to.have.deep.property('errors.password.message', 'O campo senha é obrigatório.');
                expect(res.body).to.have.deep.property('errors.email.message', 'O campo email é obrigatório.');

                done(err);
            });
    });

    it('Não deve criar umm usuário com email repetido', done => {

        request
            .post("/user")
            .send({
                user: {
                    email: 'user@test.com',
                    name: 'User Test 2',
                    password: '123456'
                }
            })
            .expect(422)
            .end((err, res) => {

                should.not.exist(err);
                expect(res.body).to.have.deep.property('errors.email.message', 'Já existe um usuário com o email informado.');

                done(err);
            });
    });
});
