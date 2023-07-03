import Task from "./task-model";

interface taskType {
  description: string;
  completed: boolean;
}

export const createTask = async (taskBody: taskType) => {
  const task = await Task.create(taskBody);
  return task;
};

export const findTaskById = async (taskBody: {
  _id: string;
  owner_id: string;
}) => {
  const task = await Task.findOne({
    _id: taskBody._id,
    owner_id: taskBody.owner_id,
  });
  return task;
};

interface reqQueryType {
  match: any;
  sort: {};
  limit: number;
  skip: number;
}

export const getTask = (reqQuery) => {
  const sort = {};
  const match: any = {};
  if (reqQuery.completed) {
    match.completed = reqQuery.completed === "true";
  }

  if (reqQuery.sortBy) {
    const parts = reqQuery.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  const limit = parseInt(reqQuery.limit);
  const skip = parseInt(reqQuery.skip);
  return { match, sort, limit, skip };
};

export const updateTaskDetails = async (task, updates, reqBody) => {
  updates.forEach((update) => {
    task[update] = reqBody[update];
  });
  await task.save();
  return task;
};

export const deleteTaskById = async (taskId: string, ownerId: string) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    owner_id: ownerId,
  });
  return task;
};
