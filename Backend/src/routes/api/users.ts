import { Router } from "express";
import { check } from "express-validator";
import { getUsers, register } from "../../controller";

const router = Router();

router.get("/", getUsers);

router.post(
  "/register",
  [
    check("username", "username is required").not().isEmpty(),
    check("email", "email is required").not().isEmpty(),
    check("phonenumber", "Phone Number is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
  ],
  register
);

module.exports = router;
