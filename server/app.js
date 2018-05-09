const Koa = require("koa2");
const serve = require("koa-static");

const app = new Koa();

app.use (serve(`${__dirname}./../www/`));

app.listen('10086');
