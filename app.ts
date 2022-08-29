import koa from "koa";
import cors from "koa2-cors";
import mongoose from "mongoose";
import koaBody from "koa-body";
import path from "path";
import passport from "koa-passport";
import routerResponse from "./src/middleware/routerResponse";
import errorHandler from "./src/middleware/errorHandler";
import router from './src/service/index'
// 实例化koa
const app = new koa();

app.use(
  koaBody({
    multipart: true, // 支持文件上传
  })
);

// 设置跨域
app.use(cors());


// 统一的错误处理
errorHandler(app);

// 统一封装返回数据
app.use(routerResponse());

// app.use(passport.initialize());
// app.use(passport.session());

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

// 配置跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Headers", "authorization");
  await next();
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`selever started on ${port}`);
});
