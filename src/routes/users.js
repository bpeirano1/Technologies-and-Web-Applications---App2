const KoaRouter = require("koa-router");
const router = new KoaRouter();
const axios = require("axios");


router.get("users.session.new", "/signin", (ctx) => {
    
    return ctx.render("users/signin", {
        //user,
        createSessionPath: ctx.router.url("users.session.create"),
        //usersPath: ctx.router.url("users.index"),
        //userPath: (user) => ctx.router.url("users.show", {id: user.id})
    });
});

router.put("users.session.create", "/", async (ctx) => {
    const { email, password } = ctx.request.body;
    console.log(email,password)
    const session_url = 'https://cheffer-3mosqueteros.herokuapp.com/api/auth'
    
    const params = JSON.stringify({
        "email": email,
        "password": password,
        
        });
    try {
        const auth= await axios.post(session_url, params,{
            "headers": {
                "content-type": "application/json",
                },
            })

        ctx.session.email = email;
        ctx.session.password = password;
        ctx.session.token = auth.data.token;

        return ctx.redirect(ctx.router.url("users.show", {}));
        
    } catch (error) {
        console.log(error)
        ctx.session.email = '';
        ctx.session.password = '';
        ctx.session.token = '';
        return ctx.render("users/signin", {
            createSessionPath: ctx.router.url("users.session.create"),
            errors: "A",
            });
        
    }
        
});


//cerrar sesión
router.del("users.session.destroy", "/", (ctx) => {
    ctx.session.email = '';
    ctx.session.password = '';
    ctx.session.token = '';
    ctx.redirect(ctx.router.url("users.session.new"));
}); 


router.get("users.show", "/show", async (ctx) => {
    const {publicationsPath} = ctx.state;
    
    await ctx.render("users/show", {
        signOutPath: ctx.router.url("users.session.destroy"),
        publicationsPath,
        
    });
    }); 


        



module.exports = router