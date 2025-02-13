import { Router } from "express";
import { register, login, searchUser } from "../controllers/user.controller";
import { isAuth } from "../middlewares/isAuth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/search", isAuth, searchUser);

export default router;
