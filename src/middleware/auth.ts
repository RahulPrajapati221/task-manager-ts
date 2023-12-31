import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../modules/users/user-model";
import { errorMess, constants } from "../constant";
import { Request, Response, NextFunction } from "express";

export const auth = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const token: string = req.header("Authorization")?.replace("Bearer ", "")!;
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error(errorMess.notFound(constants.user));
    }
    req.body.token = token;
    req.body.user = user;
    next();
  } catch (e) {
    resp.status(401).send({ error: errorMess.unauthorized });
  }
};
