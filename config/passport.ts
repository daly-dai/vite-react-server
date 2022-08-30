import { Strategy, ExtractJwt } from "passport-jwt";

const opts: any = {};
const keys = require("../config/keys");

const mongoose = require("mongoose");
const User = mongoose.model("users");

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async function (jwt_payload, done) {
      const user = await User.findById(jwt_payload.id);

      return done(null, user || false);
    })
  );
};
