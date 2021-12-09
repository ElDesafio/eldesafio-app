import { DateTime } from "luxon";
import { FieldErrors, Validator } from "remix-validated-form";
import { z } from "zod";

export function getAge(birthday: string): string {
  const age = Math.floor(
    DateTime.now().diff(DateTime.fromISO(birthday), ["years"]).years
  );
  return `${age} años`;
}

export function getFormattedDate(date: string): string {
  return DateTime.fromISO(date)
    .setLocale("es")
    .toLocaleString(DateTime.DATE_FULL);
}

export const schemaCheckbox = z.preprocess(
  (value) => value === "true",
  z.boolean()
);

const emptyStringToUndefined = z.literal("").transform(() => undefined);

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}

// https://github.com/colinhacks/zod/issues/372#issuecomment-826380330
const schemaForType = function <T>() {
  return function <S extends z.ZodType<T, any, any>>(arg: S) {
    return arg;
  };
};

const getIssuesForError = (err: z.ZodError<any>): z.ZodIssue[] => {
  return err.issues.flatMap((issue) => {
    if ("unionErrors" in issue) {
      return issue.unionErrors.flatMap((err) => getIssuesForError(err));
    } else {
      return [issue];
    }
  });
};

type generalObject = {
  [key: string]: any;
};

const isObject = (obj: unknown) => {
  return Object.prototype.toString.call(obj) === "[object Object]";
};

export function convertDefaultValuesForForm(
  data: generalObject
): generalObject {
  return {};
}

function convertDataToArray(data: unknown): unknown {
  if (!isObject(data)) return data;

  const newData: generalObject = {};

  for (const [key, value] of Object.entries(data as generalObject)) {
    const matches = key.match(
      /(?<mainKey>.*)\[(?<arrayIndex>[0-9]+)\]\[(?<subObjectKey>.*)\]/
    );
    if (!matches) {
      newData[key] = value;
      continue;
    }

    if (matches.groups) {
      const { mainKey, arrayIndex, subObjectKey } = matches.groups;
      const index = parseInt(arrayIndex);

      if (!newData.hasOwnProperty(mainKey)) {
        newData[mainKey] = [{}];
      }
      if (newData[mainKey][index] === undefined) {
        newData[mainKey][index] = {};
      }

      newData[mainKey][index][subObjectKey] = value;
    }
  }
  return newData;
}

export function withZodArray<T>(zodSchema: z.Schema<T>): Validator<T> {
  return {
    validate: (value: unknown) => {
      const result = zodSchema.safeParse(convertDataToArray(value));
      if (result.success) return { data: result.data, error: undefined };

      const fieldErrors: FieldErrors = {};
      getIssuesForError(result.error).forEach((issue) => {
        const path = issue.path.join(".");
        if (!fieldErrors[path]) fieldErrors[path] = issue.message;
      });
      return { error: fieldErrors, data: undefined };
    },
    validateField: (data, field) => {
      const result = zodSchema.safeParse(convertDataToArray(data));
      if (result.success) return { error: undefined };
      return {
        error: getIssuesForError(result.error).find((issue) => {
          if (typeof issue.path[1] === "number") {
            return (
              `${issue.path[0]}[${issue.path[1]}][${issue.path[2]}]` === field
            );
          }
          return issue.path.join(".") === field;
        })?.message,
      };
    },
  };
}
