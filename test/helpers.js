import supertest from "supertest";
import chai from "chai";
import app from "../index.js";
import faker from 'faker/locale/pt_BR';

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.should = chai.should();
global.assert = chai.assert;
global.faker = faker;
global.seeInDatabase = (collectionName, query, cb) => {
    app.connection.db.collection(collectionName, (err, collection) => {
        collection
            .find(query)
            .toArray((err, result) => {

                cb(err, result);
            })
    });
};
