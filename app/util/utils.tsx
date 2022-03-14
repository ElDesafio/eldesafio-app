import { Text } from '@chakra-ui/react';
import type { User, UserRoles, UserStatus, Weekdays } from '@prisma/client';
import {
  BloodType,
  ClassAttendanceStatus,
  FormAnswerOptions,
  Roles,
} from '@prisma/client';
import type Highcharts from 'highcharts';
import { numberFormat } from 'highcharts';
import { DateTime, Info } from 'luxon';
import type React from 'react';
import { useSearchParams } from 'remix';
import { z } from 'zod';

import type { GetProgramClasses } from '~/services/classes.service';

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
  let backgroundColorHex: string;
  let textColor: string;
  let textColorHex: string;
  let text: string;
  let shortText: string;

  switch (attendance) {
    case ClassAttendanceStatus.PRESENT: {
      backgroundColor = 'green.500';
      backgroundColorHex = '#38A169';
      textColor = 'white';
      textColorHex = '#FFFFFF';
      text = 'Presente';
      shortText = 'P';
      break;
    }
    case ClassAttendanceStatus.ABSENT: {
      backgroundColor = 'red.500';
      backgroundColorHex = '#E53E3E';
      textColor = 'white';
      textColorHex = '#FFFFFF';
      text = 'Ausente';
      shortText = 'A';
      break;
    }
    case ClassAttendanceStatus.LATE: {
      backgroundColor = 'green.100';
      backgroundColorHex = '#FED7D7';
      backgroundColorHex = '#C6F6D5';
      textColor = 'gray.600';
      textColorHex = '#4A5568';
      text = 'Tardanza';
      shortText = 'T';
      break;
    }
    case ClassAttendanceStatus.EXCUSED: {
      backgroundColor = 'red.100';
      backgroundColorHex = '#FED7D7';
      textColor = 'gray.600';
      textColorHex = '#4A5568';
      text = 'Justificada';
      shortText = 'J';
      break;
    }
    default:
      throw new Error('Attendance not supported');
  }

  return {
    backgroundColor,
    textColor,
    text,
    shortText,
    backgroundColorHex,
    textColorHex,
  };
}

export function formatAttendanceChartData(classes: GetProgramClasses) {
  // Helper to collect data by month
  const helper: Record<
    string,
    {
      present: number;
      absent: number;
      late: number;
      excused: number;
      rainyDays: number;
      totalClasses: 0;
    }
  > = {};

  classes.forEach((classItem) => {
    //! There is an issue in Prisma. It's returning it as ISO instead of Date object
    const month = DateTime.fromISO(classItem.date as unknown as string, {
      zone: 'utc',
    })
      .setLocale('en-EN')
      .month.toString();

    if (!helper[month]) {
      helper[month] = {
        present: 0,
        absent: 0,
        late: 0,
        excused: 0,
        rainyDays: 0,
        totalClasses: 0,
      };
    }

    helper[month].totalClasses++;

    if (classItem.isRainyDay) {
      helper[month].rainyDays++;
    }

    classItem.participants.forEach((participant) => {
      if (participant.status === ClassAttendanceStatus.PRESENT) {
        helper[month].present++;
      }
      if (participant.status === ClassAttendanceStatus.ABSENT) {
        helper[month].absent++;
      }
      if (participant.status === ClassAttendanceStatus.LATE) {
        helper[month].late++;
      }
      if (participant.status === ClassAttendanceStatus.EXCUSED) {
        helper[month].excused++;
      }
    });
  });

  const presentByMonth: number[] = [];
  const absentByMonth: number[] = [];
  const lateByMonth: number[] = [];
  const excusedByMonth: number[] = [];
  const rainyDaysByMonth: number[] = [];
  const presentTotal: number[] = [];
  const monthsKeys: string[] = [];

  Object.keys(helper)
    .sort((a, b) => (Number(a) > Number(b) ? 1 : -1))
    .forEach((month, index) => {
      const { present, absent, late, excused, rainyDays, totalClasses } =
        helper[month];

      const totalStimulus = present + absent + late + excused;

      const presentPercentage = (present / totalStimulus) * 100;
      const absentPercentage = (absent / totalStimulus) * 100;
      const latePercentage = (late / totalStimulus) * 100;
      const excusedPercentage = (excused / totalStimulus) * 100;
      const rainyDaysPercentage = (rainyDays / totalClasses) * 100;
      const presentTotalPercentage = presentPercentage + latePercentage;

      presentByMonth.push(Math.ceil(presentPercentage));
      absentByMonth.push(Math.ceil(absentPercentage));
      lateByMonth.push(Math.ceil(latePercentage));
      excusedByMonth.push(Math.ceil(excusedPercentage));
      rainyDaysByMonth.push(Math.ceil(rainyDaysPercentage));
      presentTotal.push(Math.ceil(presentTotalPercentage));

      monthsKeys.push(Info.months('long', { locale: 'es-Es' })[+month]);
    });

  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    xAxis: {
      categories: monthsKeys,
      title: {
        text: '',
      },
    },
    yAxis: {
      title: {
        text: '',
      },
    },

    tooltip: {
      formatter: function () {
        return (
          '<span style="color:' +
          this.point.color +
          '">\u25CF</span> ' +
          this.series.name +
          ': <b>' +
          this.point?.y?.toFixed(0) +
          '%</b><br/>'
        );
      },
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      },
    },

    series: [
      {
        type: 'column',
        name: 'Presente',
        color: getAttendanceProps('PRESENT').backgroundColorHex,
        data: presentByMonth,
        stack: 'present',
      },
      {
        type: 'column',
        name: 'Tardanza',
        color: getAttendanceProps('LATE').backgroundColorHex,
        data: lateByMonth,
        stack: 'present',
      },
      {
        type: 'column',
        name: 'Ausente',
        color: getAttendanceProps('ABSENT').backgroundColorHex,
        data: absentByMonth,
        stack: 'absent',
      },
      {
        type: 'column',
        name: 'Justificada',
        color: getAttendanceProps('EXCUSED').backgroundColorHex,
        data: excusedByMonth,
        stack: 'absent',
      },
      {
        type: 'spline',
        name: 'Presente Total',
        data: presentTotal,
        marker: {
          lineWidth: 2,
          lineColor: getAttendanceProps('PRESENT').backgroundColorHex,
          fillColor: getAttendanceProps('PRESENT').backgroundColorHex,
          color: getAttendanceProps('PRESENT').backgroundColorHex,
        },
        dataLabels: {
          enabled: true,
          formatter: function () {
            let pcnt = this.y;
            return numberFormat(pcnt as number, 0) + '%';
          },
          y: -10,
        },
      },
      {
        type: 'spline',
        name: 'Días de lluvia',
        data: rainyDaysByMonth,
        visible: false,
        marker: {
          lineWidth: 2,
          lineColor: '#95a5a6',
          fillColor: '#95a5a6',
          color: '#95a5a6',
        },
        color: '#95a5a6',
        dataLabels: {
          enabled: true,
          color: '#95a5a6',
          style: {
            textShadow: false,
          },
          formatter: function () {
            let pcnt = this.y;
            return numberFormat(pcnt as number, 0) + '%';
          },
          y: -10,
        },
      },
    ],
  };
  return options;
}
