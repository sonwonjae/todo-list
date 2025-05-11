// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { del } from "@/mocks/method/del";
import { insert } from "@/mocks/method/insert";
import { MutateResult } from "@/mocks/method/types";
import { update } from "@/mocks/method/update";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MutateResult>,
) {
  const { id, todo } = req.body as {
    id?: string;
    todo?: Parameters<typeof insert>[0]["draft"];
  };

  if (req.method === "POST" && typeof todo === "object") {
    const result = await insert({ name: "todos", draft: todo });
    res.status(200).json(result);
  }

  if (
    req.method === "PATCH" &&
    typeof id === "string" &&
    typeof todo === "object"
  ) {
    const result = await update({ name: "todos", draft: todo, query: { id } });
    res.status(200).json(result);
  }

  if (req.method === "DELETE" && typeof id === "string") {
    const result = await del({ name: "todos", query: { id } });
    res.status(200).json(result);
  }
}
