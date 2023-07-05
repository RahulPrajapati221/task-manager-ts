import { Document, Schema } from "mongoose";


export interface IUser {
  name: string;
  email: string;
  password: string;
  age: number;
  tokens: { token: string }[];
}

export interface IUserModel extends IUser, Document{}


export interface VerifyUserType {
  user: IUser;
  token: string;
}

export interface ITask {
  description: string;
  completed: boolean;
  owner_id:Schema.Types.ObjectId
}

export interface ITaskModel extends ITask, Document {}

export interface TaskIdType {
  _id: string;
  owner_id: string;
}

export interface MatchType {
  completed: boolean;
}

export interface ReqQueryType {
  completed?: string;
  sortBy?: string;
  skip?: string;
  limit?: string;
}


