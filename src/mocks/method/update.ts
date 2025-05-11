import fs from "fs/promises";
import path from "path";

import { DB } from "../types";

import { Update } from "./types";

export const update: Update = async ({ name, draft, query }) => {
  type Table = DB[typeof name];
  type Document = Table[number];
  type FieldName = keyof Document;

  const route = path.resolve(process.cwd(), `src/mocks/data/${name}.json`);
  const table: Table = JSON.parse(await fs.readFile(route, "utf8"));

  if (typeof draft === "object" && typeof query === "object") {
    const updatedTable = table.map((document) => {
      const isTarget = (() => {
        const target = Object.entries(query);
        if (target.length === 0) {
          return false;
        }
        return target.every(([fieldName, fieldValue]) => {
          return (document as Document)[fieldName as FieldName] === fieldValue;
        });
      })();

      if (isTarget) {
        return {
          ...document,
          ...draft,
          updatedAt: Date.now(),
        };
      }

      return document;
    });
    await fs.writeFile(
      route,
      JSON.stringify(updatedTable, null, "\t"),
      "utf-8",
    );
    return { result: "success" };
  } else {
    return { result: "fail" };
  }
};
