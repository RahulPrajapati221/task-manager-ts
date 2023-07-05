import User from "./user-model";
import { generateToken } from "../../utils/generateToken";
import { findByCredentials } from "../../utils/findByCredential";
import { ITask, ITaskModel, IUser } from "../../DocTypes";
import { VerifyUserType } from "../../DocTypes";
import Task from "../tasks/task-model";

export const createUser = async (reqBody: IUser): Promise<VerifyUserType> => {
  const user = await User.create(reqBody);
  const token = await generateToken(user);
  return { user, token };
};

export const updateUserById = async (
  user: IUser,
  reqBody: IUser
): Promise<IUser | null> => {
  const updatedUser = await User.findByIdAndUpdate(user, reqBody, {
    new: true,
  });
  return updatedUser;
};

export const findUser = async (
  email: string,
  password: string
): Promise<VerifyUserType> => {
  const user = await findByCredentials(email, password);
  const token = await generateToken(user);
  return { user, token };
};

export const deleteUserById = async (user_id: string) => {
  const deletedUser = await User.findOneAndDelete({
    _id: user_id,
  });
  await Task.deleteMany({ owner_id: user_id });
  return deletedUser;
};
