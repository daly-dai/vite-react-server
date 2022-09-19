import Router from "koa-router"; // 路由
import bcrypt from 'bcryptjs'
import { validateRegisterInput, validateLoginInput } from "@/utils/validation/user";
import db from "@/lowdb/server/db";
import { v1 as uuidV1 } from 'uuid';
import jwt from "jsonwebtoken"; // 生成token
import { SECURITY } from '@/config/config'
import passport from 'koa-passport'
import * as lodash from 'lodash'

const router = new Router(); // 路由对象


/**
 * @route GET api/users/text
 * @description 测试接口地址
 * @access 公开的接口
 */
router.get("/test", async (ctx) => {
  ctx.status = 200;
  // ctx.success("users test");
  ctx.body = { msg: "users test" };
});

/**
 * @route POST api/users/register
 * @description 注册接口地址
 * @access 公开的接口
 */
router.post("/register", async (ctx: any) => {
  const data = ctx.request.body;

  console.log(data, "data")

  const { error, isValid } = validateRegisterInput(data);

  if (!isValid) {
    throw { code: 401, message: error }
  }

  await db.read()

  const { email, name, password } = data
  const registeredUser = db.data.User.find(item => item.email === email)

  if (registeredUser?.id) {
    throw { code: 401, message: "邮箱已存在" }
  }

  db.data.User.push({
    id: uuidV1(),
    name,
    email,
    password,
    date: new Date().getTime()
  })

  await db.write()

  ctx.status = 200;
  ctx.success("用户注册成功");
})


/**
 * @route post api/users/login
 * @description 登录接口 返回token
 * @public 公开的接口
 */
router.post("/login", async (ctx) => {
  const data = ctx.request.body;

  const { name, password } = data
  const { error, isValid } = validateLoginInput(data);
  console.log(data, 67676767676);
  if (!isValid) {
    throw { code: 404, message: error }
  }


  await db.read()

  const { User } = db.data;
  console.log(db.data)


  //  查询登录的邮箱是否存在
  const findResult = User.find(item => item.name === name);

  if (!findResult?.id) {
    throw { code: 404, message: "用户不存在" }
  }

  // // 验证密码
  let result = password === findResult.password;

  // // 验证通过
  if (!result) {
    throw { code: 404, message: "用户名或者密码错误" }
  }

  const payload = {
    id: findResult.id,
    name: findResult.name,
    email: findResult.email,
  };
  const token = jwt.sign(payload, SECURITY.secretOrKey, { expiresIn: 3600 * 7 });
  const refToken = jwt.sign(payload, SECURITY.secretOrKey, { expiresIn: 3600 * 6 });


  // ctx.status = 200;
  ctx.success({
    token: "Bearer " + token,
    refToken: "Bearer " + refToken,
    ...payload,
  });
});


router.post(
  "/deleteUserById",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const { id } = ctx.request.body;

    if (!id) {
      throw { code: 400, message: "缺少必要参数" }
    }

    await db.read();


  })


export default router.routes()