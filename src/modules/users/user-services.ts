import User from "./user-model";
import { generateToken } from "../../utils/generateToken";
import { findByCredentials } from "../../utils/findByCredential";
import { UserDocument } from "../../UserTypes";


export const createUser = async (reqBody: UserDocument) => {
  const user = await User.create(reqBody);
  const token = await generateToken(user);
  return { user, token };
};

export const updateUserById = async (updates:string[], user, reqBody) => {
  updates.forEach((update) => (user[update] = reqBody[update]));
  await user.save();
  return user;
};

export const findUser = async (email:string, password:string) => {
  const user = await findByCredentials(email, password);
  const token = await generateToken(user);
  return { user, token };
};

export const deleteUserById = async (user_id:string) => {
  await User.findOneAndDelete({
    _id: user_id,
  });
};
