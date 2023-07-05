import { Request, Response } from "express";
import {
  createTask,
  getTask,
  findTaskById,
  updateTaskDetails,
  deleteTaskById,
} from "./task-services";
import { successMess, statusCodes, errorMess, constants } from "../../constant";
import { validUpdate } from "../../utils/validateUpdate";
import { successResp, errorResp } from "../../utils/apiResponses";
import { TaskIdType } from "../../DocTypes";

export const getTasks = async (req: Request, resp: Response) => {
  const taskFilter = getTask(req.query);
  const { match, limit, skip, sort } = taskFilter;
  const user = req.body.user;
  try {
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
    return successResp(resp, statusCodes.successCode, {
      data: userTasks,
      message: successMess.success,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.badRequestCode, errorMess.badRequest);
  }
};

//Create new Task
export const createTasks = async (req: Request, resp: Response) => {
  try {
    const task = {
      ...req.body,
      owner_id: req.body.user._id,
    };
    const newTask = await createTask(task);
    return successResp(resp, statusCodes.createdCode, {
      data: newTask,
      message: successMess.created,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.badRequestCode, errorMess.badRequest);
  }
};

//find Task using id
export const findTask = async (req: Request, resp: Response) => {
  try {
    const task = {
      _id: req.params.id,
      owner_id: req.body.user._id,
    };
    const Task = await findTaskById(task);
    if (!task) {
      return errorResp(
        resp,
        statusCodes.notFoundCode,
        errorMess.notFound(constants.task)
      );
    }
    return successResp(resp, statusCodes.successCode, {
      data: Task,
      message: successMess.success,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMess.serverError);
  }
};

//Update Task
export const updateTask = async (req: Request, resp: Response) => {
  const updates = Object.keys(req.body.update);
  const allowedUpdates = ["description", "completed"];

  const isValidOperation = validUpdate(updates, allowedUpdates);
  if (!isValidOperation) {
    return errorResp(resp, statusCodes.badRequestCode, errorMess.badRequest);
  }
  try {
    const verifyId = {
      _id: req.params.id,
      owner_id: req.body.user._id,
    };
    let task = await findTaskById(verifyId);
    if (!task) {
      return errorResp(
        resp,
        statusCodes.notFoundCode,
        errorMess.notFound(constants.task)
      );
    }
    const Task = await updateTaskDetails(verifyId, req.body.update);
    return successResp(resp, statusCodes.successCode, {
      data: Task,
      message: successMess.success,
    });
  } catch (e) {
    return errorResp(resp, statusCodes.badRequestCode, errorMess.badRequest);
  }
};

// Delete Task
export const deleteTask = async (req: Request, resp: Response) => {
  try {
    const verifyId = {
      _id: req.params.id,
      owner_id: req.body.user._id,
    };
    let task = await findTaskById(verifyId);
    if (!task) {
      return errorResp(
        resp,
        statusCodes.notFoundCode,
        errorMess.notFound(constants.task)
      );
    }
    const deletedTask = await deleteTaskById(verifyId);
    return successResp(resp, statusCodes.createdCode, {
      data: deletedTask,
      message: successMess.success,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMess.serverError);
  }
};
