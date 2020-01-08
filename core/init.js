/**
 * 自动挂载api
 * @type {module:koa-router|Router}
 */
const Router = require('koa-router');
const requireDirectory = require('require-directory');

class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.app = app;
    InitManager.loadConfig();
    InitManager.initLoadRouters();
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js';
    const config = require(configPath);
    global.config = config;
  }

  static initLoadRouters() {
    // 第一个参数一般是module表示加载的是一个模块
    // 第二个参数是要加载的目录
    // 第三个参数的visit表示每加载到一个模块的时候，会执行一次这个函数，并且把这个模块传进去
    const apiDir = `${process.cwd()}/app/api`;
    requireDirectory(module, apiDir, {visit: whenLoadModule});

    // 自动注册路由
    function whenLoadModule(obj) {
      // 判断是否是一个路由
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }
}

module.exports = InitManager;