import { Router, Request, Response } from "express";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();

router.get("/", (request: Request, response: Response) => response.render("index"));
router.get("/add", (request: Request, response: Response) => response.render("add"));

router.get("/user-table", userController.listUsers);
router.get("/search", userController.searchUser);
router.get("/edit", userController.getUserData);

router.post("/edit-user", userController.updateUser);
router.post("/add-user", userController.createUser);
router.post("/delete-user", userController.deleteUser);

export { router };
