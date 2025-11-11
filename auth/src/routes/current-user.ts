import express from 'express';
import {currentUser} from "@endritdobra/ticketing-common";

const router = express.Router();

// @ts-ignore
router.get('/api/users/currentuser', currentUser, async (req, res) => {
    return res.send({currentUser: req.currentUser || null});
});

export {router as currentUserRouter}