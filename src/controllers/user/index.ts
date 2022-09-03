import Router from "koa-router"; // 路由
import bcrypt from 'bcryptjs'
import validateRegisterInput from "@/utils/validation/user/registrer";
import db from "@/lowdb/server/db";
import { v1 as uuidV1 } from 'uuid'

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
router.post("/register", async (ctx, next) => {
  const data = ctx.request.body;

  console.log(data, "data")

  const { error, isValid } = validateRegisterInput(data);

  if (!isValid) {
    throw { code: 401, message: error }
  }

  console.log(111111111)
  await db.read()
  console.log(db.data, "is read")

  const { User = [] } = db.data;
  const { email, name, password } = data

  console.log(User, 898989888)
  // const userList = User.find({ email })

  // if (!userList?.length) {
  //   throw { code: 401, message: "邮箱已存在" }
  // }


  // User.push({
  //   id: uuidV1(),
  //   name,
  //   password,
  //   date: new Date().getTime()
  // })
  // await db.write()

  // ctx.msg = "账号注册成功";

  // next()
})

export default router.routes()