import passport from "passport";
import {
    Strategy as JwtStrategy,
    ExtractJwt
} from "passport-jwt";

module.exports = app => {

    const User = app.models.User;

    const params = {
        secretOrKey: process.env.JwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    };

    const jwtStrategy = new JwtStrategy(params, (payload, done) => {
        User.findById(payload.id).then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        }).catch(error => done(error, null));
    });

    passport.use(jwtStrategy);

    return {
        initialize: () => {
            return passport.initialize();
        },

        authenticate: () => {
            return passport.authenticate("jwt", {
                session: false
            });
        }
    };
};
