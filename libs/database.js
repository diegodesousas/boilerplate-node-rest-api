import mongoose from 'mongoose';

module.exports = (app) => {

    mongoose.Promise = global.Promise;

    mongoose.connect(process.env.DB);

    mongoose.connection.on('connected', function() {
        console.info('Mongoose conectado em ' + process.env.DB);
    });

    mongoose.connection.on('disconnected', function() {
        console.info('Mongoose desconectado de ' + process.env.DB);
    });

    mongoose.connection.on('error', function(error) {
        console.info('Mongoose. Erro de conexão: ' + error);
    });

    if (process.env.NODE_ENV === 'test') {
        app.connection = mongoose.connection;
    }
};
