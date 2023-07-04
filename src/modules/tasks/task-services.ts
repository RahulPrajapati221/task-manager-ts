import Task from "./task-model";
import { ITask, ITaskModel } from "./task-model";
import { findTaskByIdType, reqQueryType } from "../../utils/DocTypes";

export const createTask = async (taskBody: ITask): Promise<ITaskModel> => {
  const task = await Task.create(taskBody);
  return task;
};

export const findTaskById = async (
  taskBody: findTaskByIdType
): Promise<ITaskModel | null> => {
  const task = await Task.findOne({
    _id: taskBody._id,
    owner_id: taskBody.owner_id,
  });
  return task;
};

interface Match {
  completed: boolean;
}

export const getTask = (reqQuery: reqQueryType) => {
  const sort: Record<string, any> = {};
  const match = {} as Match;
  if (reqQuery.completed) {
    match.completed = reqQuery.completed == "true";
  }

  if (reqQuery.sortBy) {
    const parts = reqQuery.sortBy.split(":");
    console.log(parts);
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  const limit = parseInt(reqQuery.limit!);
  const skip = parseInt(reqQuery.skip!);
  return { match, sort, limit, skip };
};

export const updateTaskDetails = async (
  verifyId: findTaskByIdType,
  reqBody: Record<string, string>
): Promise<ITaskModel | null> => {
  await Task.findByIdAndUpdate(verifyId, reqBody);
  const updatedTask = await findTaskById(verifyId);
  return updatedTask;
};

export const deleteTaskById = async (
  taskId: string,
  ownerId: string
): Promise<ITaskModel | null> => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    owner_id: ownerId,
  });
  return task;
};
