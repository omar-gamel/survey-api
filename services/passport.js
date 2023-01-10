import jwt from 'passport-jwt';
import config from 'config';
import passport from 'passport';
import User from '../models/user.js';

const params = {
  secretOrKey: config.get('jwtSecret'),
  jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const strategy = new jwt.Strategy(params, async (jwt_payload, done) => {
  try {
    const user = await User.findById({
      _id: jwt_payload._id,
    });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});
passport.use(strategy);

export default {
  initialize: function () {
    return passport.initialize();
  },
  authenticate: function () {
    return passport.authenticate('jwt', { session: false });
  },
};
