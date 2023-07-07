import { Document, Schema } from "mongoose";

export interface ITask {
  description: string;
  completed: boolean;
  ownerId: Schema.Types.ObjectId;
}

export interface ITaskModel extends ITask, Document {}

export interface TaskIdType {
  _id: string;
  ownerId: string;
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

