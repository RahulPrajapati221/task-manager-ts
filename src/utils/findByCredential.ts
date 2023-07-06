import User from "../modules/users/user-model";
import bcrypt from "bcryptjs";
import { errorMess, constants } from "../constant";
import { IUserModel } from "../DocTypes";

export const findByCredentials = async (
  email: string,
  password: string
): Promise<IUserModel> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error(errorMess.notFound(constants.user));
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error(errorMess.loginError);
  }
  return user;
};
