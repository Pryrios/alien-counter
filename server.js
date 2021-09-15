import Koa from 'koa'
import Router from '@koa/router'
import cors from '@koa/cors'
import ratelimit from 'koa-ratelimit'
import checkMoobotHeaders from './headers.js'

const db = new Map();

const app = new Koa();
const router = new Router();
let counter = 0;

router.get("/count/total", async (ctx, next) => {
  ctx.status = 200;
  ctx.body = '<script>setTimeout(function(){location.reload()},1000);</script>' + counter;
})

router.post("/count", async (ctx, next)  => {
  counter ++;
  ctx.status = 200;
  ctx.body = { count: counter }
})

app
  .use(cors())
  .use(ratelimit({
    driver: 'memory',
    db: db,
    duration: 60000,
    errorMessage: "Keep calm and wait a little bit, please",
    id: (ctx) => ctx.ip,
    headers: {
      remmaining: 'Rate-Limit-Remainig',
      reset: 'Rate-Limit-Reset',
      total: 'Rate-limit-Total'
    },
    max: 100,
    disableHeader: false
  }))
  .use(checkMoobotHeaders)
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3024, () => console.log("Listening on port 3024"));