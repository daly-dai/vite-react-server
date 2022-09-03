import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// jwt加密
const SECURITY = {
  secretOrKey: 'secret',
  expiresIn: 60 * 60 * 24 * 30
}

// 默认监听端口
const PORT = '5000'

// 日志输出位置
const LOGPATH = path.resolve(__dirname, '../logs/koa-template.log');
const LOGLEVEL = 'info'

export { SECURITY, PORT, LOGPATH, LOGLEVEL }
