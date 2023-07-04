import { IUserModel } from "../modules/users/user-model";
export interface findTaskByIdType {
  _id: string;
  owner_id: string;
}

export interface userAndTokenType {
  user: IUserModel;
  token: string;
}

export interface reqQueryType {
  completed?: string;
  sortBy?: string;
  skip?: string;
  limit?: string;
}
