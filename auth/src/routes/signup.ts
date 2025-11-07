import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {User} from "../models/user";
import {BadRequestError} from "../errors/bad-request-error";
import "express-async-errors";
import jwt from "jsonwebtoken";
import {validateRequest} from "../middlewares/validate-request";

const router = express.Router();

router.post('/api/users/signup', [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password").trim().isLength({
            min: 4,
            max: 20
        }).withMessage("Password must be at least 6 characters long and no more than 20")
    ],
    validateRequest
    , async (req: Request, res: Response) => {
        const {email, password} = req.body;

        const existingUser = await User.findOne({email});

        if (existingUser) {
            throw new BadRequestError("Email in use");
        }

        const user = User.build({email, password});
        await user.save();

        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_KEY!);

        req.session = {
            jwt: token,
        }

        res.status(201).send(user);
    });

export {router as signUpRouter}