import { Text } from '@chakra-ui/react';
import { BloodType, FormAnswerOptions } from '@prisma/client';
import { DateTime } from 'luxon';
import type React from 'react';
import { useSearchParams } from 'remix';
import { z } from 'zod';

export function getAge<T extends boolean>(
  birthday: string,
  asNumber?: T,
): T extends true ? number : string;
export function getAge(
  birthday: string,
  asNumber: boolean = false,
): number | string {
  const age = Math.floor(
    DateTime.now().diff(DateTime.fromISO(birthday), ['years']).years,
  );
  return asNumber ? (age as number) : (`${age} años` as string);
}

export function getFormattedDate(date: string): string {
  return DateTime.fromISO(date)
    .setLocale('es')
    .toLocaleString(DateTime.DATE_FULL);
}

export function useSelectedYear() {
  let [searchParams] = useSearchParams();
  return searchParams.get('year') ?? DateTime.now().year.toString();
}

export const schemaCheckbox = z.preprocess(
  (value) => value === 'true',
  z.boolean(),
);

const emptyStringToUndefined = z.literal('').transform(() => undefined);

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}

export enum ProgramSexText {
  MALE = 'varón',
  FEMALE = 'mujer',
  ALL = 'mixto',
}

export function getBloodTypeName(bloodType: BloodType) {
  switch (bloodType) {
    case BloodType.AB_NEGATIVE:
      return 'AB-';
    case BloodType.AB_POSITIVE:
      return 'AB+';
    case BloodType.A_NEGATIVE:
      return 'A-';
    case BloodType.A_POSITIVE:
      return 'A+';
    case BloodType.B_NEGATIVE:
      return 'B-';
    case BloodType.B_POSITIVE:
      return 'B+';
    case BloodType.ZERO_NEGATIVE:
      return '0-';
    case BloodType.ZERO_POSITIVE:
      return '0+';
    default:
      throw new Error('Unknown blood type');
  }
}

export function getFormAnswerOptionName(
  answer: FormAnswerOptions,
  isRed?: boolean,
): React.ReactNode {
  switch (answer) {
    case FormAnswerOptions.YES: {
      return (
        <Text as="span" color={isRed ? 'red' : undefined}>
          Sí
        </Text>
      );
    }
    case FormAnswerOptions.NO:
      return (
        <Text as="span" color={isRed ? 'red' : undefined}>
          No
        </Text>
      );
    case FormAnswerOptions.DKNA:
      return (
        <Text as="span" color={isRed ? 'red' : undefined}>
          Ns/Nc
        </Text>
      );
    default:
      throw new Error('Unknown form answer option');
  }
}

export function convertStringToNumberForZod(value: unknown) {
  return typeof value === 'string' && value.length > 0
    ? parseInt(value)
    : undefined;
}
