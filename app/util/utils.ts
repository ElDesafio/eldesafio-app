import { DateTime } from "luxon";
import { FieldErrors, Validator } from "remix-validated-form";
import { z } from "zod";
import { flatten, unflatten } from "flat";

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
