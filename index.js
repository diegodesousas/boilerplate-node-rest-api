/**
 * Inicia a aplicação
 */
import express from 'express';
import consign from 'consign';
import dotenv from 'dotenv';

const app = express();

/**
 * Get type config
 * @type {[type]}
 */
const env = process.env.NODE_ENV || 'develop';

/**
 * Set config in process.env.{Name in .env}
 */
dotenv.config({
    path: `envvars/.env.${env}`
});

consign({
        verbose: false
    })
    .include('models')
    .then('libs/auth.js')
    .then('libs/middlewares.js')
    .then('controllers')
    .then('routes')
    .then('libs/database.js')
    .then('libs/boot.js')
    .into(app);

module.exports = app;
global.app = app;