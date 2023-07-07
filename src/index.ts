import express from "express";
import { connectDB } from "./db/database";
import userRouter from "./modules/users/users-route";
import taskRouter from "./modules/tasks/tasks-route";
const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.listen(port, (): void => {
  console.log(`server running on port ${port}`);
});
