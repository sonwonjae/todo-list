import fs from "fs/promises";
import path from "path";

import { nanoid } from "nanoid";

import { DB } from "../types";

import { Insert } from "./types";

export const insert: Insert = async ({ name, draft }) => {
  type Table = DB[typeof name];

  const route = path.resolve(process.cwd(), `src/mocks/data/${name}.json`);
  const table: Table = JSON.parse(await fs.readFile(route, "utf8"));

  const createdAt = Date.now();

  if (typeof draft === "object") {
    table.unshift({
      ...draft,
      id: nanoid(),
      createdAt,
      updatedAt: createdAt,
    });
    await fs.writeFile(route, JSON.stringify(table, null, '\t'), "utf-8");
    return { result: "success" };
  } else {
    return { result: "fail" };
  }
};
