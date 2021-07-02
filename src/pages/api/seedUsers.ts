import { auth } from "@local/utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import usersJson from "users.json";

type User = {
  readonly email: string;
  readonly password: string;
};

const users: User[] = [...usersJson];

export default function handler(
  _req: NextApiRequest,
  _res: NextApiResponse<User[]>
) {
  const createdUsers: User[] = users.map((user) => {
    createUserWithEmailAndPassword(auth, user.email, user.password);
    return user;
  });
  _res.status(200).json(createdUsers);
}
