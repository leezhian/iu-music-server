/**
 * 错误编写
 */
// 服务器错误
class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 40001, code = 500) {
    super();
    this.errorCode = errorCode;
    this.code = code;
    this.message = msg;
  }
}

// 参数类型的错误
class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.message = msg || '参数错误';
    this.errorCode = errorCode || 10001;
  }
}

// 资源类型的错误
class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 404;
    this.message = msg || '资源未找到';
    this.errorCode = errorCode || 50001;
  }
}

// 登录类型错误
class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 401;
    this.message = msg || '授权失败';
    this.errorCode = errorCode || 20006;
  }
}

// token及权限类型的错误
class Forbiden extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 403;
    this.message = msg || '禁止访问';
    this.errorCode = errorCode || 70001;
  }
}

// 接口错误
class ApiError extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 500;
    this.message = msg || '服务器内部接口调用异常';
    this.errorCode = errorCode || 60001;
  }
}

// 查找数据错误
class FindDataError extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 500;
    this.message = msg || '数据错误';
    this.errorCode = errorCode || 50002;
  }
}

module.exports = {
  HttpException,
  ParameterException,
  NotFound,
  AuthFailed,
  Forbiden,
  ApiError,
  FindDataError
};