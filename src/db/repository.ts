import { camelCase } from "change-case";
import { QueryResult } from "./defs";

export const derp = "";

/**
 * Utility function to get the returned id from a sql statement using RETURNING id
 */
export const getIdFromRows = (rows: QueryResult): number => {
  // tslint:disable-next-line:no-any
  const { id } = (rows[0] as any) || null;
  return id;
};

/**
 * Utility function for parsing a query result into a typed array and camelCasing results
 */
export const parseRowsToType = <T>(rows: QueryResult): T[] => {
  // tslint:disable-next-line:no-any
  const raw = (rows[0] as any) || null;
  if (!raw || raw.length === 0) {
    return [];
  }
  const formatted = rows.map((row: object) => {
    const obj = {} as T;
    const keys = Object.keys(row);
    for (const key of keys) {
      const camelKey = camelCase(key);
      obj[camelKey] = raw[key];
    }
    return obj;
  });
  return formatted;
};
