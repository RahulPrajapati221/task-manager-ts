import express from "express";
import {
  getTasks,
  createTasks,
  findTask,
  updateTask,
  deleteTask,
} from "./task-controller";
import { auth } from "../../middleware/auth";
const router = express.Router();

router.get("/myTasks", auth, getTasks);

router.post("/new", auth, createTasks);

router
  .route("/:id")
  .get(auth, findTask)
  .patch(auth, updateTask)
  .delete(auth, deleteTask);

export default router;
