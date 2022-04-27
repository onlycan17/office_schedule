
export const home = (req,res) => {
    console.log(req.session.loggedIn);
    console.log(res.locals.loggedIn);
    return res.render("home",{pageTitle:"Home"});
}