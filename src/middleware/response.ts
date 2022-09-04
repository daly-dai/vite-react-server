/**
 * 正常响应
 * 回传的格式遵循这样的格式：{ code: 0, msg: any data: any }
 * @param {*} ctx
 */
const success = async (ctx, next) => {
  if (ctx.result !== undefined) {
    ctx.type = 'json'
    ctx.body = {
      code: 200,
      msg: ctx.msg || '',
      data: ctx.result
    }
  }
  await next()
}

/**
 * @desc
 * @param option 
 * @returns 
 */
export function routerResponse(option: any = {}) {
  return async function (ctx, next) {
    ctx.success = function (data) {
      ctx.type = option.type || "json";
      ctx.body = {
        code: option?.successCode || 200,
        msg: option.successMsg || "success",
        data: data,
      };

      ctx.response.status = 200;
    };

    await next();
  };
}

/**
 *
 * 统一异常处理
 * @param {*} ctx
 * @param {*} next
 * @return {*} { code: '错误代码', msg: '错误信息' }
 */
const error = async (ctx, next) => {
  await next().catch(err => {
    ctx.body = {
      code: err.code || -1,
      data: null,
      msg: err.message
    }

    ctx.status = 200 // 前端根据code判断异常
    return Promise.resolve()
  })
}

export {
  success,
  error
}
