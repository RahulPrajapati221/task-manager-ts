import {
  createUser,
  findUser,
  updateUserById,
  deleteUserById,
} from "./user-service";
import { validUpdate } from "../../utils/validUpdateField";
import { Request, Response } from "express";
import { successMess, errorMess, statusCodes, constants } from "../../constant";
import { successResp, errorResp } from "../../utils/response";
import User from "./user-model";

//Register user
export const registerUser = async (req: Request, resp: Response) => {
  try {
    const user = await createUser(req.body);
    return successResp(resp, statusCodes.createdCode, {
      data: user,
      message: successMess.created,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMess.serverError);
  }
};

//User Login
export const loginUser = async (req: Request, resp: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await findUser(email, password);
    return successResp(resp, statusCodes.successCode, {
      data: { user, token },
      message: successMess.login,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.unauthorizedCode, errorMess.badRequest);
  }
};

//User profile
export const userProfile = async (req: Request, resp: Response) => {
  try {
    const user = req.body.user;
    return successResp(resp, statusCodes.successCode, {
      data: user,
      message: successMess.success,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMess.serverError);
  }
};

// logout user
export const logOutUser = async (req: Request, resp: Response) => {
  try {
    const user = req.body.user;
    user.tokens = user.tokens.filter((token: { token: string }) => {
      return token.token !== req.body.token;
    });
    await User.updateOne(user);
    return successResp(resp, statusCodes.successCode, {
      data: user,
      message: successMess.Logout,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMess.serverError);
  }
};

// logout user from all sessions
export const logOutAll = async (req: Request, resp: Response) => {
  try {
    const user = req.body.user;
    user.tokens = [];
    await user.updateOne(user);
    return successResp(resp, statusCodes.successCode, {
      data: user,
      message: successMess.Logout,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMess.serverError);
  }
};

// update user
export const updateUser = async (req: Request, resp: Response) => {
  const updates = req.body.update;
  const allowedUpdates = ["name", "email", "password", "age"];

  const invalidField = validUpdate(updates, allowedUpdates);
  try {
    const user = req.body.user;
    if (!user) {
      return errorResp(
        resp,
        statusCodes.notFoundCode,
        errorMess.notFound(constants.user)
      );
    }
    const User = await updateUserById(user, updates);
    return successResp(resp, statusCodes.createdCode, {
      data: { Alert: errorMess.invalidUpdate(invalidField), User },
      message: successMess.created,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMess.serverError);
  }
};

// delete user
export const deleteUser = async (req: Request, resp: Response) => {
  try {
    const deletedUser = await deleteUserById(req.body.user._id);
    return successResp(resp, statusCodes.successCode, {
      data: deletedUser,
      message: successMess.success,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMess.serverError);
  }
};
