describe("Testes default", function() {

    it("Help da Api", done => {

        request.get("/help")
            .expect(200)
            .end((err, res) => {
                const expected = {
                    status: "Boilerplate Rest API"
                };
                expect(res.body).to.eql(expected);
                done(err);
            });
    });

    it("Recurso não encontrado", done => {

        request.get("/nunca-vai-existir")
            .expect(404);

        done();
    });
});
