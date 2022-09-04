import Router from "koa-router"; // 路由
import bcrypt from 'bcryptjs'
import validateRegisterInput from "@/utils/validation/user/registrer";
import db from "@/lowdb/server/db";
import { v1 as uuidV1 } from 'uuid';
const jwt = require("jsonwebtoken"); // 生成token


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
router.post("/register", async (ctx) => {
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
  const { error, isValid } = validateLoginInput(data);
  console.log(data, 67676767676);
  if (!isValid) {
    ctx.status = 404;
    ctx.body = error;

    ctx.throw(404, error);
  }

  //  查询登录的邮箱是否存在
  const findResult = await User.find({ email: data.email });

  if (!findResult.length) {
    ctx.status = 400;
    ctx.body = { email: "用户不存在" };

    ctx.throw(400, "用户不存在");
  }

  // 验证密码
  let result = await bcrypt.compareSync(data.password, findResult[0].password);

  // 验证通过
  if (!result) {
    ctx.status = 400;
    ctx.body = { email: "用户名或者密码错误" };
    ctx.throw(404, "用户名或者密码错误");
  }

  const payload = {
    id: findResult[0].id,
    name: findResult[0].name,
    email: findResult[0].email,
  };
  const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 * 7 });
  const refToken = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 * 6 });

  ctx.status = 200;
  const resData = {
    token: "Bearer " + token,
    refToken: "Bearer " + refToken,
    ...payload,
  };

  ctx.body = { success: true, mesg: "处理成功", code: "0000", data: resData };
});


export default router.routes()