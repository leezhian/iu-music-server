/**
 * 全局异常处中间件
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
const {HttpException} = require('../core/http-exception');

const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // error 堆栈调用信息
    // 通常返回给客户端的信息有：
    // http status code
    // message 错误文本
    // error_code 比http status code更详细，是开发者自己定义的
    // request_url 当前请求的url
    const isHttpException = error instanceof HttpException;
    const isDev = global.config.mode === 'dev';

    if (isDev && !isHttpException) {
      throw error;
    }

    if (isHttpException) {
      ctx.body = {
        message: error.message,
        error_code: error.errorCode,
        requestUrl: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code;
    } else {
      ctx.body = {
        message: '未知错误',
        error_code: 9999,
        requestUrl: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500;
    }
  }
}

module.exports = catchError;