const axios = require("axios");

const KoaRouter = require("koa-router");

const router = new KoaRouter();

router.get("publications.index","/", async (ctx) => {
    const {signOutPath,token} = ctx.state
    const auth = token
    if (!auth) {
        return ctx.render("users/signin", {
            createSessionPath: ctx.router.url("users.session.create"),
            errors: "A",
            });

    }

    //const session_url = 'https://cheffer-3mosqueteros.herokuapp.com/api/auth'
    
    //const params = JSON.stringify({
    //    "email": "bpeirano1@uc.cl",
    //    "password": "1234",
        
    //    });

        try {
            //const auth= await axios.post(session_url, params,{
            //    "headers": {
            //        "content-type": "application/json",
            //        },
            //    })
            

            const publications_url = 'https://cheffer-3mosqueteros.herokuapp.com/api/publications'
            const pub_request = await axios.get(publications_url , { "headers": {"Authorization" : "Bearer "+auth} })
            console.log(pub_request)

            console.log("Aquì van las publicacionessssssssssssssssssssssssssssss")
            for (const i of pub_request.data) {
                console.log(i)

             publications = pub_request.data;
                
            }
            
        } catch (error) {
            console.log(error);
        }

    
    await ctx.render("publications/index", {
        publications,
        publicationPath: (publication) => ctx.router.url("publications.show", {id: publication.id}),
        signOutPath,
                
    })
        
});

router.get("comments.show","/comment/:id", async (ctx) => {
    const {signOutPath,token} = ctx.state
    const auth = token

    if (!auth) {
        return ctx.render("users/signin", {
            createSessionPath: ctx.router.url("users.session.create"),
            errors: "A",
            });

    }
    
    //const session_url = 'https://cheffer-3mosqueteros.herokuapp.com/api/auth'
    
    //const params = JSON.stringify({
    //    "email": "bpeirano1@uc.cl",
    //    "password": "1234",
        
    //    });

        try {
            //const auth= await axios.post(session_url, params,{
            //    "headers": {
            //        "content-type": "application/json",
            //        },
            //    })
            //console.log(auth.data)

            const id = ctx.params.id
            const comments_url = 'https://cheffer-3mosqueteros.herokuapp.com/api/publications/comments/'+id
            const comment_request = await axios.get(comments_url , { "headers": {"Authorization" : "Bearer "+auth} })
            console.log(comment_request)
            comment = comment_request.data;


                
            
        } catch (error) {
            console.log(error);
        }

    
    await ctx.render("publications/commentshow", {
        backPath: ctx.router.url("publications.index", {}),
        comment,
        
                
    })
        
});

router.get("publications.show","/:id", async (ctx) => {
    const {signOutPath,token} = ctx.state
    const auth = token
    //const session_url = 'https://cheffer-3mosqueteros.herokuapp.com/api/auth'
    
    //const params = JSON.stringify({
    //    "email": "bpeirano1@uc.cl",
    //    "password": "1234",
        
    //    });

    if (!auth) {
        return ctx.render("users/signin", {
            createSessionPath: ctx.router.url("users.session.create"),
            errors: "A",
            });

    }

        try {
            //const auth= await axios.post(session_url, params,{
            //    "headers": {
            //        "content-type": "application/json",
            //        },
            //    })
            

            const id = ctx.params.id
            const publications_url = 'https://cheffer-3mosqueteros.herokuapp.com/api/publications/'+id
            const pub_request = await axios.get(publications_url , { "headers": {"Authorization" : "Bearer "+auth} })
            console.log(pub_request)
            publication = pub_request.data;

            const comments_url = 'https://cheffer-3mosqueteros.herokuapp.com/api/publications/'+id+'/comments'
            const comment_request = await axios.get(comments_url , { "headers": {"Authorization" : "Bearer "+auth} })
            console.log(comment_request)
            comments = comment_request.data;


                
            
        } catch (error) {
            console.log(error);
        }

    
    await ctx.render("publications/show", {
        publication,
        backPath: ctx.router.url("publications.index", {}),
        comments,
        commentPath: (comment) => ctx.router.url("comments.show", {id: comment.id}),
        signOutPath
        
                
    })
        
});







module.exports = router