import koaJwt from 'koa-jwt'
import jwt from 'jsonwebtoken'
import { SECURITY } from '@/config/config'

/**
* 获取用户token
* @param {string} data  加密信息
* @return {string} 返回生成的Token
*/
const signToken = (data, next) => {
  try {
    return jwt.sign({
      data: data,
    }, SECURITY.secretOrKey, { expiresIn: SECURITY.expiresIn })
  } catch (error) {
    console.log(error)
  }

  next()
}
/**
 * 验证用户token值
 * @static
 * @param {string} token 用户token
 * @return {*}  {Object}
 */
const verifyToken = async (ctx, next) => {
  try {
    ctx.jwtData = await jwt.verify(ctx.request.headers.authorization, SECURITY.secretOrKey)
    await next()
  } catch (err) {
    throw { code: 401, message: err.message }
  }

}

export { signToken, verifyToken }