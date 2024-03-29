import { Text } from '@chakra-ui/react';
import type {
  Neighborhood,
  PhoneBelongsTo,
  User,
  UserRoles,
  UserStatus,
  Weekdays,
} from '@prisma/client';
import {
  BloodType,
  ClassAttendanceStatus,
  FormAnswerOptions,
  ParticipantDiaryType,
  Roles,
  UserDiaryType,
} from '@prisma/client';
import { useSearchParams } from '@remix-run/react';
import type Highcharts from 'highcharts';
import { numberFormat } from 'highcharts';
import { DateTime, Info } from 'luxon';
import type React from 'react';
import { z } from 'zod';

import type { GetProgramClasses } from '~/services/classes.service';

function getAge<T extends boolean>(
  birthday: string,
  asNumber?: T,
): T extends true ? number : string;
function getAge(birthday: string, asNumber: boolean = false): number | string {
  const age = Math.floor(
    DateTime.now().diff(DateTime.fromISO(birthday), ['years']).years,
  );
  return asNumber ? (age as number) : (`${age} años` as string);
}

type GetFormattedDate = {
  date: string | Date;
  timezone?: string;
  format?: 'DATE_FULL' | 'DATETIME_FULL' | 'TIME_SIMPLE';
};

function getFormattedDate({
  date,
  timezone = 'America/Argentina/Buenos_Aires',
  format = 'DATE_FULL',
}: GetFormattedDate): string {
  const cleanDate =
    typeof date === 'string'
      ? DateTime.fromISO(date)
      : DateTime.fromJSDate(date);

  let finalDate = cleanDate
    .setZone(timezone)
    .setLocale('es')
    .toLocaleString(DateTime[format]);

  if (format === 'TIME_SIMPLE') {
    finalDate += ' hs';
  }
  return finalDate;
}

function useSelectedYear() {
  let [searchParams] = useSearchParams();
  return searchParams.get('year') ?? DateTime.now().year.toString();
}

const schemaCheckbox = z.preprocess((value) => value === 'true', z.boolean());

const emptyStringToUndefined = z.literal('').transform(() => undefined);

function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}

enum ProgramSexText {
  MALE = 'varones',
  FEMALE = 'mujeres',
  ALL = 'mixto',
}

enum PartcipantSexText {
  MALE = 'Varón',
  FEMALE = 'Mujer',
}

function getNeighborhoodText(neighborhood: Neighborhood) {
  switch (neighborhood) {
    case 'LA_LATA':
      return 'La Lata';
    case 'MORENO':
      return 'Moreno';
    case 'SAN_FRANCISQUITO':
      return 'San Francisquito';
    case 'OTHER':
      return 'Otro';
    default:
      throw new Error('[getNeighborhoodText] Unknown neighborhood');
  }
}

function getPhoneBelongsToText(phoneBelongsTo: PhoneBelongsTo) {
  switch (phoneBelongsTo) {
    case 'FATHER':
      return 'Padre';
    case 'MOTHER':
      return 'Madre';
    case 'SELF':
      return 'Propio';
    case 'TUTOR':
      return 'Otro/Tutor';
    default:
      throw new Error('[getPhoneBelongsToText] Unknown phone belongs to');
  }
}

function getDayByName(name: Weekdays) {
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

function getBloodTypeName(bloodType: BloodType) {
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

function getUserStatusName(status: UserStatus) {
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

function getUserRoleName(role: Roles, short: boolean = false) {
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

function getFormAnswerOptionName(
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

function convertStringToNumberForZod(value: unknown) {
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

function isAdmin(user: UserForRoleCheck) {
  checkUserAndRolesExist(user);
  return user?.roles?.some((role) => role.role === Roles.ADMIN);
}
function isFacilitator(user: UserForRoleCheck) {
  checkUserAndRolesExist(user);
  return user?.roles?.some((role) => role.role === Roles.FACILITATOR);
}
function isFacilitatorVolunteer(user: UserForRoleCheck) {
  checkUserAndRolesExist(user);
  return user?.roles?.some((role) => role.role === Roles.FACILITATOR_VOLUNTEER);
}
function isMentor(user: UserForRoleCheck) {
  checkUserAndRolesExist(user);
  return user?.roles?.some((role) => role.role === Roles.MENTOR);
}

function getAttendanceProps(attendance: ClassAttendanceStatus) {
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
    case ClassAttendanceStatus.UNKNOWN: {
      backgroundColor = 'gray.100';
      backgroundColorHex = '#EDF2F7';
      textColor = 'gray.600';
      textColorHex = '#4A5568';
      text = 'Desconocida';
      shortText = '';
      break;
    }
    default:
      throw new Error('[getAttendanceProps] Attendance not supported');
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

export type ClassForChart = {
  date: Date;
  isRainyDay: boolean;
  participants: Array<{
    status: ClassAttendanceStatus;
  }>;
};

function formatAttendanceChartBarsData(
  classes: GetProgramClasses | ClassForChart[],
) {
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
    const month = (
      DateTime.fromJSDate(classItem.date, {
        zone: 'utc',
      }).setLocale('en-EN').month - 1
    ).toString();

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
    .forEach((month) => {
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
      formatter() {
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
          formatter() {
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
          formatter() {
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

function formatProgramChartPieData(
  classes: GetProgramClasses | ClassForChart[],
) {
  // Helper to collect data by month
  let present: number = 0;
  let absent: number = 0;
  let late: number = 0;
  let excused: number = 0;

  classes.forEach((classItem) => {
    classItem.participants.forEach((participant) => {
      if (participant.status === ClassAttendanceStatus.PRESENT) {
        present++;
      }
      if (participant.status === ClassAttendanceStatus.ABSENT) {
        absent++;
      }
      if (participant.status === ClassAttendanceStatus.LATE) {
        late++;
      }
      if (participant.status === ClassAttendanceStatus.EXCUSED) {
        excused++;
      }
    });
  });

  const presentTotal = present + late;
  const absentTotal = absent + excused;

  const totalStimulus = present + absent + late + excused;

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      height: '300px',
    },
    title: {
      text: null as unknown as undefined,
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        shadow: false,
        center: ['50%', '50%'],
      },
    },
    tooltip: {
      valueSuffix: '%',
      pointFormat: '<b>{point.y}</b>',
      formatter() {
        return (
          this.point.name + ': <b>' + this.point.y?.toFixed(2) + '</b>' + '%'
        );
      },
    },
    series: [
      {
        type: null as unknown as 'variablepie',
        name: 'Totals',
        data: [
          {
            name: 'Presente Total',
            y: (presentTotal * 100) / totalStimulus,
            color: getAttendanceProps('PRESENT').backgroundColorHex,
          },
          {
            name: 'Ausente Total',
            y: (absentTotal * 100) / totalStimulus,
            color: getAttendanceProps('ABSENT').backgroundColorHex,
          },
        ],
        size: '90%',
        dataLabels: {
          formatter() {
            return (
              // @ts-ignore
              this.point.name + ': <b>' + this.y?.toFixed(2) + '</b>' + '%'
            );
          },
          color: 'white',
          distance: -50,
        },
      },
      {
        type: null as unknown as 'variablepie',
        name: 'Breakdown',
        data: [
          {
            name: 'Presente',
            y: (present * 100) / totalStimulus,
            color: getAttendanceProps('PRESENT').backgroundColorHex,
          },
          {
            name: 'Tardanza',
            y: (late * 100) / totalStimulus,
            color: getAttendanceProps('LATE').backgroundColorHex,
          },
          {
            name: 'Ausente',
            y: (absent * 100) / totalStimulus,
            color: getAttendanceProps('ABSENT').backgroundColorHex,
          },
          {
            name: 'Justificada',
            y: (excused * 100) / totalStimulus,
            color: getAttendanceProps('EXCUSED').backgroundColorHex,
          },
        ],
        size: '100%',
        innerSize: '90%',
        dataLabels: {
          enabled: false,
          formatter() {
            // display only if larger than 1
            // @ts-ignore
            return this.y && this.y > 1
              ? // @ts-ignore
                '<b>' + this.point.name + ':</b> ' + this.y.toFixed(2) + '%'
              : null;
          },
        },
      },
    ],
  };
  return options;
}

function getParticipantDiaryTypeProps(type: ParticipantDiaryType) {
  switch (type) {
    case ParticipantDiaryType.INFO: {
      return {
        tagColor: 'gray',
        variant: 'solid',
        text: 'info',
        description: 'Información General',
      };
    }
    case ParticipantDiaryType.MENTORSHIP: {
      return {
        tagColor: 'gray',
        variant: 'solid',
        text: 'mentoría',
        description: 'Mentoría',
      };
    }
    case ParticipantDiaryType.PROGRAM_STATUS_ACTIVE: {
      return {
        tagColor: 'blue',
        variant: 'solid',
        text: 'alta',
        description: 'Alta en Programa',
      };
    }
    case ParticipantDiaryType.PROGRAM_STATUS_INACTIVE_3_ABSENT: {
      return {
        tagColor: 'red',
        variant: 'solid',
        text: 'baja (3 faltas)',
        description: 'Baja (3 faltas seguidas)',
      };
    }
    case ParticipantDiaryType.PROGRAM_STATUS_INACTIVE_FAMILY: {
      return {
        tagColor: 'red',
        variant: 'solid',
        text: 'baja (situa. familiar)',
        description: 'Baja (situación familiar)',
      };
    }
    case ParticipantDiaryType.PROGRAM_STATUS_INACTIVE_LOW_ATTENDANCE: {
      return {
        tagColor: 'red',
        variant: 'solid',
        text: 'baja (< 75%)',
        description: 'Baja (< 75% asistencia)',
      };
    }
    case ParticipantDiaryType.PROGRAM_STATUS_INACTIVE_NO_SHOW: {
      return {
        tagColor: 'red',
        variant: 'solid',
        text: 'baja (no show)',
        description: 'Baja (no show)',
      };
    }
    case ParticipantDiaryType.PROGRAM_STATUS_INACTIVE_OTHER: {
      return {
        tagColor: 'red',
        variant: 'solid',
        text: 'baja',
        description: 'Baja (otro)',
      };
    }
    case ParticipantDiaryType.PROGRAM_STATUS_WAITING: {
      return {
        tagColor: 'blue',
        variant: 'outline',
        text: 'espera',
        description: 'Espera (en Programa)',
      };
    }
    case ParticipantDiaryType.YEAR_STATUS_WAITING: {
      return {
        tagColor: 'blue',
        variant: 'outline',
        text: 'espera',
        description: 'Espera (en el año)',
      };
    }
    case ParticipantDiaryType.YEAR_STATUS_ACTIVE: {
      return {
        tagColor: 'blue',
        variant: 'solid',
        text: 'activo',
        description: 'Activo (en el año)',
      };
    }
    case ParticipantDiaryType.YEAR_STATUS_INACTIVE: {
      return {
        tagColor: 'red',
        variant: 'solid',
        text: 'inactivo',
        description: 'Baja (en el año)',
      };
    }
    default: {
      throw new Error(
        '[getParticipantDiaryTypeProps] Unknown participant diary type',
      );
    }
  }
}
function getUserDiaryTypeProps(type: UserDiaryType) {
  switch (type) {
    case UserDiaryType.STATUS_INVITED: {
      return {
        tagColor: 'gray',
        variant: 'solid',
        text: 'invitado',
        description: 'invitado',
      };
    }
    case UserDiaryType.STATUS_ACTIVE: {
      return {
        tagColor: 'blue',
        variant: 'solid',
        text: 'activo',
        description: 'Estado del usuario cambiado a: activo',
      };
    }
    case UserDiaryType.STATUS_INACTIVE: {
      return {
        tagColor: 'red',
        variant: 'solid',
        text: 'inactivo',
        description: 'Estado del usuario cambiado a: inactivo',
      };
    }
    case UserDiaryType.INFO: {
      return {
        tagColor: 'gray',
        variant: 'solid',
        text: 'info',
        description: 'Información General',
      };
    }
    case UserDiaryType.PROGRAM_STATUS_ACTIVE: {
      return {
        tagColor: 'blue',
        variant: 'solid',
        text: 'alta',
        description: 'Alta en Programa',
      };
    }
    case UserDiaryType.PROGRAM_STATUS_INACTIVE: {
      return {
        tagColor: 'red',
        variant: 'solid',
        text: 'baja',
        description: 'Baja del Programa',
      };
    }
    default: {
      throw new Error('[getUserDiaryTypeProps] Unknown user diary type');
    }
  }
}

function getSelectedYearFromRequest(request: Request) {
  const url = new URL(request.url);
  return Number(url.searchParams.get('year') ?? DateTime.now().year.toString());
}

let monthName: string;
let statusKey: string;
let descriptionKey: string;

export type CommitmentTableMonth =
  | 'april'
  | 'may'
  | 'june'
  | 'july'
  | 'august'
  | 'september'
  | 'october'
  | 'november'
  | 'december';

function commitmentTableProps(month: CommitmentTableMonth) {
  switch (month) {
    case 'april': {
      monthName = 'abr';
      statusKey = `${month}Status`;
      descriptionKey = `${month}Description`;
      break;
    }
    case 'may': {
      monthName = 'may';
      statusKey = `${month}Status`;
      descriptionKey = `${month}Description`;
      break;
    }
    case 'june': {
      monthName = 'jun';
      statusKey = `${month}Status`;
      descriptionKey = `${month}Description`;
      break;
    }
    case 'july': {
      monthName = 'jul';
      statusKey = `${month}Status`;
      descriptionKey = `${month}Description`;
      break;
    }
    case 'august': {
      monthName = 'ago';
      statusKey = `${month}Status`;
      descriptionKey = `${month}Description`;
      break;
    }
    case 'september': {
      monthName = 'sep';
      statusKey = `${month}Status`;
      descriptionKey = `${month}Description`;
      break;
    }
    case 'october': {
      monthName = 'oct';
      statusKey = `${month}Status`;
      descriptionKey = `${month}Description`;
      break;
    }
    case 'november': {
      monthName = 'nov';
      statusKey = `${month}Status`;
      descriptionKey = `${month}Description`;
      break;
    }
    case 'december': {
      monthName = 'dec';
      statusKey = `${month}Status`;
      descriptionKey = `${month}Description`;
      break;
    }
    default:
      throw new Error('[commitmentTableProps] Unknown month');
  }

  return { monthName, statusKey, descriptionKey };
}

export {
  asOptionalField,
  commitmentTableProps,
  convertStringToNumberForZod,
  formatAttendanceChartBarsData,
  formatProgramChartPieData,
  getAge,
  getAttendanceProps,
  getBloodTypeName,
  getDayByName,
  getFormAnswerOptionName,
  getFormattedDate,
  getNeighborhoodText,
  getParticipantDiaryTypeProps,
  getPhoneBelongsToText,
  getSelectedYearFromRequest,
  getUserDiaryTypeProps,
  getUserRoleName,
  getUserStatusName,
  isAdmin,
  isFacilitator,
  isFacilitatorVolunteer,
  isMentor,
  PartcipantSexText,
  ProgramSexText,
  schemaCheckbox,
  useSelectedYear,
};
