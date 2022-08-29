import Router from "koa-router"; // 路由
const router = new Router(); // 路由对象


/**
 * @route GET api/users/text
 * @description 测试接口地址
 * @access 公开的接口
 */
router.get("/test", async (ctx) => {
  ctx.status = 200;
  ctx.body = { msg: "users test" };
});


export default router.routes()