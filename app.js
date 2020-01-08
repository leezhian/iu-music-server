const Koa = require('koa');
const parser = require('koa-bodyparser');
// 自动挂载接口
const InitManager = require('./core/init');
// 捕获全局异常
const catchError = require('./middlewares/exception');

const app = new Koa();

app.use(parser());
app.use(catchError);
InitManager.initCore(app);
// 端口号
app.listen(3001);