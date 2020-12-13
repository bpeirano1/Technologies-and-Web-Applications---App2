const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const publications = require('./routes/publications');
const users = require('./routes/users');


const router = new KoaRouter();

router.use(async (ctx, next) => {
    Object.assign(ctx.state, {
        email: ctx.session.email,
        password: ctx.session.password,
        token: ctx.session.token,
        publicationsPath: ctx.router.url('publications.index'),
        signOutPath: ctx.router.url("users.session.destroy"),   
    });

    return next();
});

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/publications', publications.routes());
router.use('/users', users.routes());

module.exports = router;
