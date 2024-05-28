// middleware - function -- watchman --
import jwt from 'jsonwebtoken'
import { globalConfig } from '../config/global-config.js';
export async function authentication(req, res, next) {

    //validation code which will get executed before every request;

    let token = req.headers.token;
    try {
        jwt.verify(token, globalConfig.authKey);
        next();
    } catch (error) {
        res.json({message:"unauthorized"})
    }


}