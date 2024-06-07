import express from "express";
import { receiveMessage, sendMessage } from "../Controllers/messageController.js";
import authentication from "../Middleware/authentication.js";
const router=express.Router();
router.route("/send/:id").post(authentication,sendMessage);
router.route("/:id").get(authentication,receiveMessage);
export default router;