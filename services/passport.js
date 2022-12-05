import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';

import User from '../models/user';
import config from 'config';

const params = {
  secretOrKey: config.get('jwtSecret'),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const strategy = new Strategy(params, async (jwt_payload, done) => {
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
