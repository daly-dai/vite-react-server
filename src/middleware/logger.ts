import fs from 'fs'
import path from 'path'
import log4js from 'log4js'
import { LOGPATH, LOGLEVEL } from '../config/config'


const logsDir = path.parse(LOGPATH).dir
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

log4js.configure({
  appenders: {
    console: { type: 'console' },
    dateFile: { type: 'dateFile', filename: LOGPATH, pattern: '-yyyy-MM-dd' },
  },
  categories: {
    default: {
      appenders: ['console', 'dateFile'],
      level: 'info'
    }
  },
  pm2: true
})

const logger = log4js.getLogger('[Default]')
logger.level = LOGLEVEL;

const logInfo = async (ctx, next) => {
  const start = new Date().getTime()
  await next()
  const ms = (new Date().getTime()) - start
  const remoteAddress = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips ||
    (ctx.socket && (ctx.socket.remoteAddress || (ctx.socket.socket && ctx.socket.socket.remoteAddress)))
  const logText = `${ctx.method} ${ctx.status} ${ctx.url} 请求参数： ${JSON.stringify(ctx.request.body)} 响应参数： ${JSON.stringify(ctx.body)} - ${remoteAddress} - ${ms}ms`
  logger.info(logText)
}


export {
  logInfo,
  logger
}