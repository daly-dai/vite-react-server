import koa from "koa";
import cors from "koa2-cors";
import koaBody from "koa-bodyparser";
import passport from "koa-passport";
import router from './controllers/index'
import { error, success } from '@/middleware/response'
import corsConfig from "@/middleware/cors";
import helmet from 'koa-helmet'
import { logInfo } from "@/middleware/logger";
import passwortFun from '@/middleware/passport'
// 实例化koa
const app = new koa();


app.use(logInfo)  // 日志管理

// 设置跨域
app.use(cors(corsConfig));

app.use(error)  // 统一异常处理管理
app.use(koaBody());
app.use(helmet())  // 网络安全中间件

app.use(success)

// app.use(passport.initialize());
// app.use(passport.session());


// passwortFun(passport)
// 配置路由
app.use(router.routes()).use(router.allowedMethods());

// 配置跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Headers", "authorization");
  await next();
});


// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`selever started on ${port}`);
// });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`selever started on ${port}`);
});


// export default app;
