import Router from 'koa-router'

const router = new Router();

import users from './user'
// const users = require("./users"); 


router.use("/api/users", users);

export default router