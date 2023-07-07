import Task from "./task-model";
import {
  ITask,
  ITaskModel,
  TaskIdType,
  ReqQueryType,
  MatchType,
} from "./task-type";

export const createTask = async (taskBody: ITask): Promise<ITaskModel> => {
  const task = await Task.create(taskBody);
  return task;
};

export const findTaskById = async (
  taskId: TaskIdType
): Promise<ITask | null> => {
  const { _id, ownerId } = taskId;
  const task = await Task.findOne({ _id, ownerId });
  return task;
};

export const getTask = async (user: any, reqQuery: ReqQueryType) => {
  const sort: Record<string, any> = {};
  const match = {} as MatchType;
  if (reqQuery.completed) {
    match.completed = reqQuery.completed == "true";
  }

  if (reqQuery.sortBy) {
    const parts = reqQuery.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  const limit = parseInt(reqQuery.limit!);
  const skip = parseInt(reqQuery.skip!);
  await user.populate({
    path: "tasks",
    match,
    options: {
      limit,
      skip,
      sort,
    },
  });
  const userTasks = user.tasks;
  return userTasks;
};

export const updateTaskDetails = async (
  verifyId: TaskIdType,
  reqBody: Record<string, string>
): Promise<ITask | null> => {
  const updatedTask = await Task.findByIdAndUpdate(verifyId, reqBody, {
    new: true,
  });
  return updatedTask;
};

export const deleteTaskById = async (
  TaskId: TaskIdType
): Promise<ITask | null> => {
  const { _id, ownerId } = TaskId;
  const task = await Task.findOneAndDelete({ _id, ownerId });
  return task;
};
