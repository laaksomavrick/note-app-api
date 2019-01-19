import { camelCase } from "change-case";
import { QueryResult } from "./defs";

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
      obj[camelKey] = row[key];
    }
    return obj;
  });
  return formatted;
};

/**
 * Utility function for creating the template string and arguments for an update
 * where one or many rows are optional.
 */
export const updateTemplateStringAndArgs = (
  tableName: string,
  id: number,
  input: object,
  // tslint:disable-next-line:no-any
): { template: string; args: any[] } => {
  let setters = "";
  const args = [];
  const keys = Object.keys(input).sort();
  for (const [index, key] of keys.entries()) {
    const sqlIndex = index + 1;
    args.push(input[key]);
    if (index === 0) {
      setters = `${setters}${key} = $${sqlIndex}`;
    } else {
      setters = `${setters}, ${key} = $${sqlIndex}`;
    }
  }
  args.push(id);
  const idParamIndex = args.length;
  // tslint:disable-next-line:max-line-length
  const template = `UPDATE ${tableName} SET ${setters} WHERE id = $${idParamIndex} RETURNING id`;
  return {
    template,
    args,
  };
};
