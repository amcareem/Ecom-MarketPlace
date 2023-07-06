import express from "express";
import { register } from "../controllers/auth.js";
import { login } from "../controllers/auth.js";
import { isAuthorized } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/isUserAuth",verifyToken,isAuthorized);


export default router;