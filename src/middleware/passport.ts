import { Strategy as JwtStrategy } from "passport-jwt"
import { ExtractJwt } from "passport-jwt";
import db from "@/lowdb/server/db";
import { SECURITY } from '@/config/config'

const opts: any = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECURITY.secretOrKey;

const passwortFun = (passport) => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {

      await db.read()

      const { User } = db.data;

      const user = await User.find({ id: jwt_payload.id })

      return done(null, user || false);
    })
  );
};


export default passwortFun