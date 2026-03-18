import { Request, Response } from "express";
import { GetUserByIdService } from "../services/get-user-by-id.service";
import { UsersRepository } from "../repositories/users.repository";

type GetUserByIdParams = {
  id: string;
};

const usersRepository = new UsersRepository();
const getUserByIdService = new GetUserByIdService(usersRepository);

export async function getUserByIdController(
  request: Request<GetUserByIdParams>,
  response: Response
): Promise<Response> {
  const { id } = request.params;

  const user = await getUserByIdService.execute(id);

  return response.status(200).json(user);
}