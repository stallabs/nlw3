import { Request, Response } from 'express';
import { getRepository } from "typeorm";

import User from "../models/users";

export default {
  async store(req: Request, res: Response) {
    const usersRepository = getRepository(User);
    const { email, password } = req.body;

    const userExists = await usersRepository.findOne({ where: { email }});

    if (userExists) {
      return res.status(409).json({ message: "User exists"} );
    }

    const user = usersRepository.create({ email, password });
    await usersRepository.save(user)
  
    return res.status(201).json(user)
  }
}