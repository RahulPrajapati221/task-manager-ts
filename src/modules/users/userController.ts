import {
  createUser,
  findUser,
  updateUserById,
  deleteUserById,
} from "./user-services";
import { validUpdate } from "../../utils/validateUpdate";
import { Request, Response } from "express";
import { successMess, errorMess, statusCodes, constants } from "../../constant";
import { successResp, errorResp } from "../../utils/apiResponses";
import { IUser, IUserModel } from "../../DocTypes";

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
    req.body.user.tokens = req.body.user.tokens.filter(
      (token: { token: string }) => {
        return token.token !== req.body.token;
      }
    );
    await req.body.user.save();
    return successResp(resp, statusCodes.successCode, {
      data: req.body.user,
      message: successMess.Logout,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMess.serverError);
  }
};

// logout user from all sessions
export const logOutAll = async (req: Request, resp: Response) => {
  try {
    req.body.user.tokens = [];
    await req.body.user.save();
    return successResp(resp, statusCodes.successCode, {
      data: req.body.user,
      message: successMess.Logout,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMess.serverError);
  }
};

// update user
export const updateUser = async (req: Request, resp: Response) => {
  const updates = Object.keys(req.body.update);
  const allowedUpdates = ["name", "email", "password", "age"];

  const isValidOperation = validUpdate(updates, allowedUpdates);
  if (!isValidOperation) {
    return resp
      .status(statusCodes.badRequestCode)
      .send({ message: errorMess.badRequest });
  }

  try {
    const user = req.body.user;
    if (!user) {
      return errorResp(
        resp,
        statusCodes.notFoundCode,
        errorMess.notFound(constants.user)
      );
    }
    const User = await updateUserById(user, req.body.update);
    return successResp(resp, statusCodes.createdCode, {
      data: User,
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
