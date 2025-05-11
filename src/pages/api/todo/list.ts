import type { NextApiRequest, NextApiResponse } from "next";

import { find } from "@/mocks/method/find";
import { DB } from "@/mocks/types";

export type TodosRes = {
  todos: DB["todos"];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodosRes>,
) {
  if (req.method === "GET") {
    const todos = await find({ name: "todos" });
    res.status(200).json({ todos });
  }
}
