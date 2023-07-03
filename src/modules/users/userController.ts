import {
  createUser,
  findUser,
  updateUserById,
  deleteUserById,
} from "./user-services";
import { validUpdate } from "../../utils/validateUpdate";
import { Request, Response } from "express";
import { successMess, errorMess, statusCodes, constants } from "../../constant";

//Register user
export const registerUser = async (req: Request, resp: Response) => {
  try {
    const user = await createUser(req.body);
    resp
      .status(statusCodes.createdCode)
      .send({ data: user, message: successMess.created });
  } catch (err) {
    resp.status(statusCodes.serverErrorCode).send(errorMess.serverError);
  }
};

//User Login
export const loginUser = async (req: Request, resp: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await findUser(email, password);
    resp
      .status(statusCodes.successCode)
      .send({ data: user, token, message: successMess.login });
  } catch (err) {
    resp.status(statusCodes.unauthorizedCode).send(errorMess.badRequest);
  }
};

//User profile
export const userProfile = async (req: Request, resp: Response) => {
  try {
    const user = req.body.user;
    resp.status(statusCodes.successCode).send({ data: user });
  } catch (err) {
    resp.status(statusCodes.serverErrorCode).send(errorMess.serverError);
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
    resp.status(statusCodes.successCode).send({ message: successMess.success });
  } catch (err) {
    resp.status(statusCodes.serverErrorCode).send(errorMess.serverError);
  }
};

// logout user from all sessions
export const logOutAll = async (req: Request, resp: Response) => {
  try {
    req.body.user.tokens = [];
    await req.body.user.save();
    resp.status(statusCodes.successCode).send({ message: successMess.Logout });
  } catch (err) {
    resp.status(statusCodes.serverErrorCode).send(errorMess.serverError);
  }
};

// update user
export const updateUser = async (req: Request, resp: Response) => {
  const updates = Object.keys(req.body);
  console.log(updates);
  const allowedUpdates = ["name", "email", "password", "age"];

  const isValidOperation = validUpdate(updates, allowedUpdates);
  // if (!isValidOperation) {
  //   return resp
  //     .status(statusCodes.badRequestCode)
  //     .send({ message: errorMess.badRequest });
  // }

  try {
    const user = req.body.user;
    if (!user) {
      return resp
        .status(statusCodes.notFoundCode)
        .send(errorMess.notFound(constants.user));
    }
    const User = await updateUserById(updates, user, req.body);
    resp
      .status(statusCodes.createdCode)
      .send({ data: User, message: successMess.created });
  } catch (err) {
    resp.status(statusCodes.serverErrorCode).send(errorMess.serverError);
  }
};

// delete user
export const deleteUser = async (req: Request, resp: Response) => {
  try {
    deleteUserById(req.body.user._id);
    resp
      .status(statusCodes.successCode)
      .send({ data: req.body.user, message: successMess.success });
  } catch (err) {
    resp.status(statusCodes.serverErrorCode).send(errorMess.serverError);
  }
};