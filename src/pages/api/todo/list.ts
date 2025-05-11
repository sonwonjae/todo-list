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
    await new Promise((res) => {
      setTimeout(() => {
        res(null);
      }, 1000);
    });

    const todos = await find({
      name: "todos",
      options: {
        page: Number(req.query.page) || 0,
        limit: Number(req.query.limit) || 10,
      },
    });
    res.status(200).json({ todos });
  }
}
