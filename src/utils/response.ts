import { Response } from "express";

export const successResp = (
  resp: Response,
  statusCode: number,
  {data, message}:{data:any, message:string}
) => {
  return resp
    .status(statusCode)
    .send({ data, message });
};

export const errorResp = (
  resp: Response,
  statusCode: number,
  message: string
) => {
  return resp.status(statusCode).send({ message });
};
