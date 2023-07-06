import { Request, Response } from "express";
import {
  createTask,
  getTask,
  findTaskById,
  deleteTaskById,
  updateTaskDetails,
} from "./task-services";
import { successMess, statusCodes, errorMess, constants } from "../../constant";
import { validUpdate } from "../../utils/validUpdateField";
import { successResp, errorResp } from "../../utils/response";

export const getTasks = async (req: Request, resp: Response) => {
  const user = req.body.user;
  try {
    const userTasks = await getTask(user, req.query);
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
      ownerId: req.body.user._id,
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
    const taskId = {
      _id: req.params.id,
      ownerId: req.body.user._id,
    };
    const Task = await findTaskById(taskId);
    if (!Task) {
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
  const updates = req.body.update;
  const allowedUpdates = ["description", "completed"];

  const invalidField = validUpdate(updates, allowedUpdates);
  try {
    const verifyId = {
      _id: req.params.id,
      ownerId: req.body.user._id,
    };
    let task = await findTaskById(verifyId);
    if (!task) {
      return errorResp(
        resp,
        statusCodes.notFoundCode,
        errorMess.notFound(constants.task)
      );
    }
    const Task = await updateTaskDetails(verifyId, updates);
    return successResp(resp, statusCodes.successCode, {
      data: { Alert: errorMess.invalidUpdate(invalidField), Task },
      message: successMess.success,
    });
  } catch (e) {
    return errorResp(resp, statusCodes.badRequestCode, errorMess.badRequest);
  }
};

// Delete Task
export const deleteTask = async (req: Request, resp: Response) => {
  try {
    const taskId = {
      _id: req.params.id,
      ownerId: req.body.user._id,
    };
    const deletedTask = await deleteTaskById(taskId);
    return successResp(resp, statusCodes.createdCode, {
      data: deletedTask,
      message: successMess.success,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMess.serverError);
  }
};
