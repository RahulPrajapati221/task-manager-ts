import mongoose, { Document } from "mongoose";

export interface ITask {
  description: string;
  completed: boolean;
}

export interface ITaskModel extends ITask, Document {}

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model<ITaskModel>("Task", taskSchema);

export default Task;
