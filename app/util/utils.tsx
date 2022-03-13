import { Text } from '@chakra-ui/react';
import type { User, UserRoles, UserStatus, Weekdays } from '@prisma/client';
import {
  BloodType,
  ClassAttendanceStatus,
  FormAnswerOptions,
  Roles,
} from '@prisma/client';
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
  MALE = 'varones',
  FEMALE = 'mujeres',
  ALL = 'mixto',
}

export function getDayByName(name: Weekdays) {
  switch (name) {
    case 'MONDAY':
      return 'Lunes';
    case 'TUESDAY':
      return 'Martes';
    case 'WEDNESDAY':
      return 'Miércoles';
    case 'THURSDAY':
      return 'Jueves';
    case 'FRIDAY':
      return 'Viernes';
    case 'SATURDAY':
      return 'Sábado';
    case 'SUNDAY':
      return 'Domingo';
    default:
      throw new Error('Unknown day');
  }
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

export function getUserStatusName(status: UserStatus) {
  switch (status) {
    case 'ACTIVE':
      return 'Activo';
    case 'INACTIVE':
      return 'Inactivo';
    case 'INVITED':
      return 'Invitado';

    default:
      throw new Error('Unknown status');
  }
}

export function getUserRoleName(role: Roles, short: boolean = false) {
  if (short) {
    switch (role) {
      case Roles.ADMIN:
        return 'Admin';
      case Roles.FACILITATOR:
        return 'Facilitador';
      case Roles.FACILITATOR_VOLUNTEER:
        return 'Voluntario';
      case Roles.MENTOR:
        return 'Mentor';
      default:
        throw new Error('Unknown role');
    }
  }
  switch (role) {
    case Roles.ADMIN:
      return 'Administrador';
    case Roles.FACILITATOR:
      return 'Facilitador';
    case Roles.FACILITATOR_VOLUNTEER:
      return 'Facilitador Voluntario';
    case Roles.MENTOR:
      return 'Mentor';
    default:
      throw new Error('Unknown role');
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

type UserForRoleCheck = Partial<User> & { roles: UserRoles[] };

function checkUserAndRolesExist(user: UserForRoleCheck) {
  if (!user) {
    throw new Error('User is undefined. Did you forget to pass it?');
  }
  if (!user.roles) {
    throw new Error("User doesn't have any roles");
  }
}

export function isAdmin(user: UserForRoleCheck) {
  checkUserAndRolesExist(user);
  return user?.roles?.some((role) => role.role === Roles.ADMIN);
}
export function isFacilitator(user: UserForRoleCheck) {
  checkUserAndRolesExist(user);
  return user?.roles?.some((role) => role.role === Roles.FACILITATOR);
}
export function isFacilitatorVolunteer(user: UserForRoleCheck) {
  checkUserAndRolesExist(user);
  return user?.roles?.some((role) => role.role === Roles.FACILITATOR_VOLUNTEER);
}
export function isMentor(user: UserForRoleCheck) {
  checkUserAndRolesExist(user);
  return user?.roles?.some((role) => role.role === Roles.MENTOR);
}

export function getAttendanceProps(attendance: ClassAttendanceStatus) {
  let backgroundColor: string;
  let textColor: string;
  let text: string;
  let shortText: string;

  switch (attendance) {
    case ClassAttendanceStatus.PRESENT: {
      backgroundColor = 'green.500';
      textColor = 'white';
      text = 'Presente';
      shortText = 'P';
      break;
    }
    case ClassAttendanceStatus.ABSENT: {
      backgroundColor = 'red.500';
      textColor = 'white';
      text = 'Ausente';
      shortText = 'A';
      break;
    }
    case ClassAttendanceStatus.LATE: {
      backgroundColor = 'green.100';
      textColor = 'gray.600';
      text = 'Tardanza';
      shortText = 'T';
      break;
    }
    case ClassAttendanceStatus.EXCUSED: {
      backgroundColor = 'red.100';
      textColor = 'gray.600';
      text = 'Justificada';
      shortText = 'J';
      break;
    }
    default:
      throw new Error('Attendance not supported');
  }

  return { backgroundColor, textColor, text, shortText };
}
