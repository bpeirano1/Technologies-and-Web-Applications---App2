const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  ctx.redirect(ctx.router.url("users.session.new", {}));
  
  await ctx.render('index', {
  });
});


//router.post("session.create",'/', async (ctx) => {
//  console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
//  const { email, password } = ctx.request.body
//  console.log(email)
//  console.log(password)


//  await ctx.render('index', {});
//});

module.exports = router;
