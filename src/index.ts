import express from "express";
import { connectDB } from "./db/database";
import userRouter from "./routes/usersRoutes";
import taskRouter from "./routes/tasksRoutes";
const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
