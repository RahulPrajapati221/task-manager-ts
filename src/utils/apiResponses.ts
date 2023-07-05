import { Response } from "express";

export const successResp = (
  resp: Response,
  statusCode: number,
  result: any
) => {
  return resp
    .status(statusCode)
    .send({ data: result.data, message: result.message });
};

export const errorResp = (
  resp: Response,
  statusCode: number,
  message: string
) => {
  return resp.status(statusCode).send({ message: message });
};
