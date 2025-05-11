import fs from "fs/promises";
import path from "path";

import { DB } from "../types";

import { Delete } from "./types";

export const del: Delete = async ({ name, query }) => {
  type Table = DB[typeof name];
  type Document = Table[number];
  type FieldName = keyof Document;

  const route = path.resolve(process.cwd(), `src/mocks/data/${name}.json`);
  const table: Table = JSON.parse(await fs.readFile(route, "utf8"));

  if (typeof query === "object") {
    const deletedTable = table.filter((document) => {
      const isTarget = (() => {
        const target = Object.entries(query);
        if (target.length === 0) {
          return false;
        }
        return target.every(([fieldName, fieldValue]) => {
          return (document as Document)[fieldName as FieldName] === fieldValue;
        });
      })();

      return !isTarget;
    });

    await fs.writeFile(
      route,
      JSON.stringify(deletedTable, null, "\t"),
      "utf-8",
    );
    return { result: "success" };
  } else {
    return { result: "fail" };
  }
};
