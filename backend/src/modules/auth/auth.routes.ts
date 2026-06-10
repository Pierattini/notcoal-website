import { Router } from "express";
import {
  getCurrentUser,
  login,
  logout,
} from "./auth.controller";

const router = Router();

router.post("/login", login);
router.get("/me", getCurrentUser);
router.post("/logout", logout);

export default router;
