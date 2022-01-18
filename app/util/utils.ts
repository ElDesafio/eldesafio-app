import { DateTime } from "luxon";
import { FieldErrors, Validator } from "remix-validated-form";
import { z } from "zod";
import { flatten, unflatten } from "flat";
import { useSearchParams } from "remix";

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

export function useSelectedYear() {
  let [searchParams] = useSearchParams();
  const selectedYear =
    searchParams.get("year") ?? DateTime.now().year.toString();
  return selectedYear;
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

export enum ProgramSexText {
  MALE = "varón",
  FEMALE = "mujer",
  ALL = "mixto",
}
