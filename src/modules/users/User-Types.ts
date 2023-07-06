import { Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  age: number;
  tokens: { token: string }[];
}

export interface IUserModel extends IUser, Document {}

export interface VerifyUserType {
  user: IUser;
  token: string;
}
