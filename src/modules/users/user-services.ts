import User from "./user-model";
import { generateToken } from "../../utils/generateToken";
import { findByCredentials } from "../../utils/findByCredential";
import { IUser, IUserModel } from "./user-model";
import { userAndTokenType } from "../../utils/DocTypes";

export const createUser = async (reqBody: IUser): Promise<userAndTokenType> => {
  const user = await User.create(reqBody);
  const token = await generateToken(user);
  return { user, token };
};

export const updateUserById = async (
  user: IUserModel,
  reqBody: IUser
): Promise<IUserModel | null> => {
  await User.findByIdAndUpdate(user, reqBody);
  const updatedUser = User.findById(user);
  return updatedUser;
};

export const findUser = async (
  email: string,
  password: string
): Promise<userAndTokenType> => {
  const user = await findByCredentials(email, password);
  const token = await generateToken(user);
  return { user, token };
};

export const deleteUserById = async (
  user_id: string
): Promise<IUserModel | null> => {
  const deletedUser = await User.findOneAndDelete({
    _id: user_id,
  });
  return deletedUser;
};
