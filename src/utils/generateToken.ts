import jwt from "jsonwebtoken";
import { IUserModel } from "../modules/users/user-model";

export const generateToken = async (user:IUserModel) => {
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET as string
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};
