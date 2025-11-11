import express from "express";
import {json} from "body-parser";
import {currentUserRouter} from "./routes/current-user";
import {signInRouter} from "./routes/signin";
import {signOutRouter} from "./routes/signout";
import {signUpRouter} from "./routes/signup";
import {errorHandler, NotFoundError} from "@endritdobra/ticketing-common";
import "express-async-errors";
import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
}));

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", (req, res) => {
    throw new NotFoundError();
});

// @ts-ignore
app.use(errorHandler);

export {app};