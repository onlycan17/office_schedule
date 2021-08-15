
import { async } from "regenerator-runtime";
import requestIp from "request-ip";
import ActionLog from "./src/schema/actionLog";

const isHeroku = process.env.NODE_ENV === "production";

export const publicOnlyMiddleware = (req,res,next) =>{
    if(!req.session.loggedIn) {
        return next();
    }else{
        req.flash("error","Not authorized");
        return res.redirect("/");
    }
}

export const localsMiddleware = async(req,res,next) => {
    //console.log(req);
    await ActionLog.create({
        url:req.url,
        params:JSON.stringify(req.params),
        body:JSON.stringify(req.body),
        ip:requestIp.getClientIp(req),
        bigo: JSON.stringify(req.__peername),
        header: JSON.stringify(req.rawHeaders),
    });
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "명작";
    res.locals.loggedInUser = req.session.user || {};
    res.locals.isHeroku = isHeroku;
    console.log(res.locals.loggedInUser);
    next();
};

export const protectorMiddleware = (req,res,next) => {
    if(req.session.loggedIn){
        return next();
    }else {
        req.flash("error","Log in first.");
        return res.redirect("/login");
    }
};