import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/users";

export default {
  async authenticate(req: Request, res: Response) {
    const usersRepository = getRepository(User);
    const { email, password } = req.body;

    const user = await usersRepository.findOne({ where: { email }});

    if (!user) {
      return res.send(401);
    }

    const isPassValid = await bcrypt.compare(password, user.password)

    if (!isPassValid) {
      return res.status(401);
    }

    const token = jwt.sign({ id: user.id }, 'cyber', { expiresIn: '7d' }); // TODO: access hash through environment variables

    return res.json({ "token": token })
  }
}