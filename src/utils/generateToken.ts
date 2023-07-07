import jwt from "jsonwebtoken";

export const generateToken = async (user: any): Promise<string> => {
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET as string
  );

  user.tokens = user.tokens.concat({ token });
  await user.updateOne(user);

  return token;
};
