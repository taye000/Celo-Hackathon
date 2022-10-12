import { Router } from "express";
import { check } from "express-validator";
import { validateToken } from "../../middleware";
import { login, getCurrentUser } from "../../controller";

const router = Router();

router.get("/", validateToken, getCurrentUser);

router.post(
  "/login",
  [check("phonenumber", "please provide phone number").not().trim().isEmpty().isLength({min:10, max:13})],
  [check("password", "please provide password").not().isEmpty().trim().isLength({min:4, max:20})],
  login
);

module.exports = router;
