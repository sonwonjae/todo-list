import fs from "fs/promises";
import path from "path";

import { DB } from "../types";

import { Find } from "./types";

export const find: Find = async ({ name, query, options }) => {
  type Table = DB[typeof name];
  type Document = Table[number];
  type FieldName = keyof Document;

  const route = path.resolve(process.cwd(), `src/mocks/data/${name}.json`);
  let table: Table = JSON.parse(await fs.readFile(route, "utf8"));

  if (typeof query === "object") {
    table = table.filter((document) => {
      const isTarget = (() => {
        const target = Object.entries(query);
        if (target.length === 0) {
          return true;
        }
        return target.every(([fieldName, fieldValue]) => {
          return (document as Document)[fieldName as FieldName] === fieldValue;
        });
      })();

      return !isTarget;
    });
  }

  if (typeof options === "object") {
    if (typeof options.page === "number") {
      if (typeof options.limit === "number") {
        table = table.slice(options.page * options.limit);
      } else {
        table = table.slice(options.page);
      }
    }
    if (typeof options.limit === "number") {
      table = table.slice(0, options.limit);
    }
  }

  return table;
};
