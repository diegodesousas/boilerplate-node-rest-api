import seeder from "mongoose-seeder";

module.exports = {
    run: (cb) => {

        let data = {
            "users": {
                "_model": "User",
                "test": {
                    "name": "User Test",
                    "email": "user@test.com",
                    "password": '123456',
                },
                "other": {
                    "name": "Other User Test",
                    "email": "otheruser@test.com",
                    "password": '123456',
                }
            }
        };

        let config = {
            clearCollections: true
        };

        seeder.seed(data, config).then(function(dbData) {
            cb(dbData);
        }).catch(function(err) {
            console.info(err);
        });
    }
}
