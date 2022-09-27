import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';

function authorize(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization

    if(!authorizationHeader) return res.status(401).json({error: 'No token provided.'})

    const [, token] = req.headers.authorization?.split(" ")!

    try {
        const validToken = verify(token, process.env.TOKEN_SECRET || '')

        req.body.userId = Object(validToken).id

        next()
    } catch (error) {
        return res.status(401).json({error: 'Invalid Token.'})
    }   
}

export default authorize