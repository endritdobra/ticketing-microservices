import "express-async-errors";
import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {validateRequest, BadRequestError} from "@endritdobra/ticketing-common";
import {User} from "../models/user";
import {PasswordService} from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/api/users/signin', [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password").trim().notEmpty().withMessage("Password must be provided")
    ],
    // @ts-ignore
    validateRequest
    , async (req: Request, res: Response) => {
        const {email, password} = req.body;

        const existingUser = await User.findOne({email});
        if (!existingUser) {
            throw new BadRequestError("Invalid email or password");
        }

        const passwordsMatch = await PasswordService.compare(password, existingUser.password);
        if(!passwordsMatch){
            throw new BadRequestError("Invalid email or password");
        }

        const token = jwt.sign({id: existingUser.id, email: existingUser.email}, process.env.JWT_KEY!);

        req.session = {
            jwt: token,
        }

        res.status(200).send(existingUser);
    });

export {router as signInRouter}