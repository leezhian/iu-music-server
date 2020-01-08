/**
 * 错误编写
 */
// 服务器错误
class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 40001, code = 500) {
    super();
    this.errorCode = errorCode;
    this.code = code;
    this.msg = msg;
  }
}

// 参数类型的错误
class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || '参数错误';
    this.errorCode = errorCode || 10001;
  }
}

// 资源类型的错误
class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 404;
    this.msg = msg || '资源未找到';
    this.errorCode = errorCode || 50001;
  }
}

// 登录类型错误
class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 401;
    this.msg = msg || '授权失败';
    this.errorCode = errorCode || 20006;
  }
}

// token及权限类型的错误
class Forbiden extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 403;
    this.msg = msg || '禁止访问';
    this.errorCode = errorCode || 70001;
  }
}

module.exports = {
  HttpException,
  ParameterException,
  NotFound,
  AuthFailed,
  Forbiden
};