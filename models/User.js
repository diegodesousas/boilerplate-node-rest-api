import mongoose, {
    Schema
} from 'mongoose';

import bcrypt from 'bcrypt-nodejs';
import beautifyUnique from 'mongoose-beautiful-unique-validation';

module.exports = () => {

    var schema = Schema({
        name: {
            type: String,
            required: [true, 'O campo nome é obrigatório.']
        },
        email: {
            type: String,
            required: [true, 'O campo email é obrigatório.'],
            unique: 'Já existe um usuário com o email informado.'
        },
        password: {
            type: String,
            required: [true, 'O campo senha é obrigatório.'],
        }
    }, {
        timestamps: true
    });

    schema.plugin(beautifyUnique);

    schema.pre('save', function(next) {

        const user = this;

        if (!user.password) {
            return next();
        }

        bcrypt.genSalt(10, (err, salt) => {

            if (err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, null, (err, hash) => {

                if (err) {
                    return next(err);
                }

                user.password = hash;

                next();
            });
        });
    });

    schema.methods.comparePassword = function(password, callback) {

        bcrypt.compare(password, this.password, (err, isMatch) => {

            callback(err, isMatch);
        });
    };

    return mongoose.model('User', schema);
};
