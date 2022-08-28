--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3 (Debian 14.3-1.pgdg110+1)
-- Dumped by pg_dump version 14.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."UsersOnPrograms" DROP CONSTRAINT "UsersOnPrograms_userId_fkey";
ALTER TABLE ONLY public."UsersOnPrograms" DROP CONSTRAINT "UsersOnPrograms_programId_fkey";
ALTER TABLE ONLY public."UserRoles" DROP CONSTRAINT "UserRoles_userId_fkey";
ALTER TABLE ONLY public."UserDiary" DROP CONSTRAINT "UserDiary_userId_fkey";
ALTER TABLE ONLY public."UserDiary" DROP CONSTRAINT "UserDiary_updatedBy_fkey";
ALTER TABLE ONLY public."UserDiary" DROP CONSTRAINT "UserDiary_createdBy_fkey";
ALTER TABLE ONLY public."UserDiaryPrograms" DROP CONSTRAINT "UserDiaryPrograms_userDiaryId_fkey";
ALTER TABLE ONLY public."UserDiaryPrograms" DROP CONSTRAINT "UserDiaryPrograms_programId_fkey";
ALTER TABLE ONLY public."SurveyBiography" DROP CONSTRAINT "SurveyBiography_updatedBy_fkey";
ALTER TABLE ONLY public."SurveyBiography" DROP CONSTRAINT "SurveyBiography_participantId_fkey";
ALTER TABLE ONLY public."SurveyBiography" DROP CONSTRAINT "SurveyBiography_createdBy_fkey";
ALTER TABLE ONLY public."School" DROP CONSTRAINT "School_updatedBy_fkey";
ALTER TABLE ONLY public."School" DROP CONSTRAINT "School_createdBy_fkey";
ALTER TABLE ONLY public."Program" DROP CONSTRAINT "Program_updatedBy_fkey";
ALTER TABLE ONLY public."Program" DROP CONSTRAINT "Program_createdBy_fkey";
ALTER TABLE ONLY public."ProgramDiary" DROP CONSTRAINT "ProgramDiary_updatedBy_fkey";
ALTER TABLE ONLY public."ProgramDiary" DROP CONSTRAINT "ProgramDiary_programId_fkey";
ALTER TABLE ONLY public."ProgramDiary" DROP CONSTRAINT "ProgramDiary_createdBy_fkey";
ALTER TABLE ONLY public."ProgramDiaryParticipants" DROP CONSTRAINT "ProgramDiaryParticipants_programDiaryId_fkey";
ALTER TABLE ONLY public."ProgramDiaryParticipants" DROP CONSTRAINT "ProgramDiaryParticipants_participantId_fkey";
ALTER TABLE ONLY public."ProgramDays" DROP CONSTRAINT "ProgramDays_programId_fkey";
ALTER TABLE ONLY public."ParticipantsOnPrograms" DROP CONSTRAINT "ParticipantsOnPrograms_updatedBy_fkey";
ALTER TABLE ONLY public."ParticipantsOnPrograms" DROP CONSTRAINT "ParticipantsOnPrograms_programId_fkey";
ALTER TABLE ONLY public."ParticipantsOnPrograms" DROP CONSTRAINT "ParticipantsOnPrograms_participantId_fkey";
ALTER TABLE ONLY public."ParticipantsOnPrograms" DROP CONSTRAINT "ParticipantsOnPrograms_createdBy_fkey";
ALTER TABLE ONLY public."ParticipantsOnClasses" DROP CONSTRAINT "ParticipantsOnClasses_participantId_fkey";
ALTER TABLE ONLY public."ParticipantsOnClasses" DROP CONSTRAINT "ParticipantsOnClasses_classId_fkey";
ALTER TABLE ONLY public."Participant" DROP CONSTRAINT "Participant_updatedBy_fkey";
ALTER TABLE ONLY public."Participant" DROP CONSTRAINT "Participant_schoolId_fkey";
ALTER TABLE ONLY public."Participant" DROP CONSTRAINT "Participant_createdBy_fkey";
ALTER TABLE ONLY public."ParticipantStatus" DROP CONSTRAINT "ParticipantStatus_participantId_fkey";
ALTER TABLE ONLY public."ParticipantHealth" DROP CONSTRAINT "ParticipantHealth_updatedBy_fkey";
ALTER TABLE ONLY public."ParticipantHealth" DROP CONSTRAINT "ParticipantHealth_participantId_fkey";
ALTER TABLE ONLY public."ParticipantHealth" DROP CONSTRAINT "ParticipantHealth_createdBy_fkey";
ALTER TABLE ONLY public."ParticipantDiary" DROP CONSTRAINT "ParticipantDiary_updatedBy_fkey";
ALTER TABLE ONLY public."ParticipantDiary" DROP CONSTRAINT "ParticipantDiary_participantId_fkey";
ALTER TABLE ONLY public."ParticipantDiary" DROP CONSTRAINT "ParticipantDiary_createdBy_fkey";
ALTER TABLE ONLY public."ParticipantDiaryPrograms" DROP CONSTRAINT "ParticipantDiaryPrograms_programId_fkey";
ALTER TABLE ONLY public."ParticipantDiaryPrograms" DROP CONSTRAINT "ParticipantDiaryPrograms_participantDiaryId_fkey";
ALTER TABLE ONLY public."ParticipantCommitment" DROP CONSTRAINT "ParticipantCommitment_participantId_fkey";
ALTER TABLE ONLY public."Class" DROP CONSTRAINT "Class_updatedBy_fkey";
ALTER TABLE ONLY public."Class" DROP CONSTRAINT "Class_programId_fkey";
ALTER TABLE ONLY public."Class" DROP CONSTRAINT "Class_createdBy_fkey";
DROP INDEX public.user_lastname_index;
DROP INDEX public.user_firstname_index;
DROP INDEX public.school_name_index;
DROP INDEX public.program_name_index;
DROP INDEX public.participant_lastname_index;
DROP INDEX public.participant_firstname_index;
DROP INDEX public.participant_dni_index;
DROP INDEX public."User_email_key";
DROP INDEX public."Participant_dni_key";
ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
ALTER TABLE ONLY public."UsersOnPrograms" DROP CONSTRAINT "UsersOnPrograms_pkey";
ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
ALTER TABLE ONLY public."UserRoles" DROP CONSTRAINT "UserRoles_pkey";
ALTER TABLE ONLY public."UserDiary" DROP CONSTRAINT "UserDiary_pkey";
ALTER TABLE ONLY public."UserDiaryPrograms" DROP CONSTRAINT "UserDiaryPrograms_pkey";
ALTER TABLE ONLY public."SurveyBiography" DROP CONSTRAINT "SurveyBiography_pkey";
ALTER TABLE ONLY public."School" DROP CONSTRAINT "School_pkey";
ALTER TABLE ONLY public."Program" DROP CONSTRAINT "Program_pkey";
ALTER TABLE ONLY public."ProgramDiary" DROP CONSTRAINT "ProgramDiary_pkey";
ALTER TABLE ONLY public."ProgramDiaryParticipants" DROP CONSTRAINT "ProgramDiaryParticipants_pkey";
ALTER TABLE ONLY public."ProgramDays" DROP CONSTRAINT "ProgramDays_pkey";
ALTER TABLE ONLY public."ParticipantsOnPrograms" DROP CONSTRAINT "ParticipantsOnPrograms_pkey";
ALTER TABLE ONLY public."ParticipantsOnClasses" DROP CONSTRAINT "ParticipantsOnClasses_pkey";
ALTER TABLE ONLY public."Participant" DROP CONSTRAINT "Participant_pkey";
ALTER TABLE ONLY public."ParticipantStatus" DROP CONSTRAINT "ParticipantStatus_pkey";
ALTER TABLE ONLY public."ParticipantHealth" DROP CONSTRAINT "ParticipantHealth_pkey";
ALTER TABLE ONLY public."ParticipantDiary" DROP CONSTRAINT "ParticipantDiary_pkey";
ALTER TABLE ONLY public."ParticipantDiaryPrograms" DROP CONSTRAINT "ParticipantDiaryPrograms_pkey";
ALTER TABLE ONLY public."ParticipantCommitment" DROP CONSTRAINT "ParticipantCommitment_pkey";
ALTER TABLE ONLY public."Class" DROP CONSTRAINT "Class_pkey";
ALTER TABLE public."UserDiary" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."School" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."ProgramDiary" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."ProgramDays" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."Program" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."ParticipantDiary" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."Participant" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."Class" ALTER COLUMN id DROP DEFAULT;
DROP TABLE public._prisma_migrations;
DROP TABLE public."UsersOnPrograms";
DROP SEQUENCE public."User_id_seq";
DROP TABLE public."UserRoles";
DROP SEQUENCE public."UserDiary_id_seq";
DROP TABLE public."UserDiaryPrograms";
DROP TABLE public."UserDiary";
DROP TABLE public."User";
DROP TABLE public."SurveyBiography";
DROP SEQUENCE public."School_id_seq";
DROP TABLE public."School";
DROP SEQUENCE public."Program_id_seq";
DROP SEQUENCE public."ProgramDiary_id_seq";
DROP TABLE public."ProgramDiaryParticipants";
DROP TABLE public."ProgramDiary";
DROP SEQUENCE public."ProgramDays_id_seq";
DROP TABLE public."ProgramDays";
DROP TABLE public."Program";
DROP TABLE public."ParticipantsOnPrograms";
DROP TABLE public."ParticipantsOnClasses";
DROP SEQUENCE public."Participant_id_seq";
DROP TABLE public."ParticipantStatus";
DROP TABLE public."ParticipantHealth";
DROP SEQUENCE public."ParticipantDiary_id_seq";
DROP TABLE public."ParticipantDiaryPrograms";
DROP TABLE public."ParticipantDiary";
DROP TABLE public."ParticipantCommitment";
DROP TABLE public."Participant";
DROP SEQUENCE public."Class_id_seq";
DROP TABLE public."Class";
DROP TYPE public."Weekdays";
DROP TYPE public."UserStatus";
DROP TYPE public."UserDiaryType";
DROP TYPE public."Sex";
DROP TYPE public."SchoolYear";
DROP TYPE public."Roles";
DROP TYPE public."ProgramSex";
DROP TYPE public."ProgramDiaryType";
DROP TYPE public."PhoneBelongsTo";
DROP TYPE public."ParticipantsOnProgramsStatus";
DROP TYPE public."ParticipantYearStatus";
DROP TYPE public."ParticipantDiaryType";
DROP TYPE public."Neighborhood";
DROP TYPE public."FormAnswerOptions";
DROP TYPE public."ClassAttendanceStatus";
DROP TYPE public."BloodType";
DROP EXTENSION pg_trgm;
DROP EXTENSION btree_gin;
--
-- Name: btree_gin; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gin WITH SCHEMA public;


--
-- Name: EXTENSION btree_gin; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gin IS 'support for indexing common datatypes in GIN';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: BloodType; Type: TYPE; Schema: public; Owner: desafio
--

CREATE TYPE public."BloodType" AS ENUM (
    'A_POSITIVE',
    'A_NEGATIVE',
    'B_POSITIVE',
    'B_NEGATIVE',
    'AB_POSITIVE',
    'AB_NEGATIVE',
    'ZERO_POSITIVE',
    'ZERO_NEGATIVE'
);


ALTER TYPE public."BloodType" OWNER TO desafio;

--
-- Name: ClassAttendanceStatus; Type: TYPE; Schema: public; Owner: desafio
--

CREATE TYPE public."ClassAttendanceStatus" AS ENUM (
    'UNKNOWN',
    'PRESENT',
    'LATE',
    'ABSENT',
    'EXCUSED'
);


ALTER TYPE public."ClassAttendanceStatus" OWNER TO desafio;

--
-- Name: FormAnswerOptions; Type: TYPE; Schema: public; Owner: desafio
--

CREATE TYPE public."FormAnswerOptions" AS ENUM (
    'YES',
    'NO',
    'DKNA'
);


ALTER TYPE public."FormAnswerOptions" OWNER TO desafio;

--
-- Name: Neighborhood; Type: TYPE; Schema: public; Owner: desafio
--

CREATE TYPE public."Neighborhood" AS ENUM (
    'LA_LATA',
    'MORENO',
    'SAN_FRANCISQUITO',
    'OTHER'
);


ALTER TYPE public."Neighborhood" OWNER TO desafio;

--
-- Name: ParticipantDiaryType; Type: TYPE; Schema: public; Owner: desafio
--

CREATE TYPE public."ParticipantDiaryType" AS ENUM (
    'YEAR_STATUS_ACTIVE',
    'YEAR_STATUS_WAITING',
    'YEAR_STATUS_INACTIVE',
    'PROGRAM_STATUS_ACTIVE',
    'PROGRAM_STATUS_WAITING',
    'PROGRAM_STATUS_INACTIVE_NO_SHOW',
    'PROGRAM_STATUS_INACTIVE_LOW_ATTENDANCE',
    'PROGRAM_STATUS_INACTIVE_FAMILY',
    'PROGRAM_STATUS_INACTIVE_3_ABSENT',
    'PROGRAM_STATUS_INACTIVE_OTHER',
    'INFO',
    'MENTORSHIP'
);


ALTER TYPE public."ParticipantDiaryType" OWNER TO desafio;

--
-- Name: ParticipantYearStatus; Type: TYPE; Schema: public; Owner: desafio
--

CREATE TYPE public."ParticipantYearStatus" AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'WAITING'
);


ALTER TYPE public."ParticipantYearStatus" OWNER TO desafio;

--
-- Name: ParticipantsOnProgramsStatus; Type: TYPE; Schema: public; Owner: desafio
--

CREATE TYPE public."ParticipantsOnProgramsStatus" AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'WAITING'
);


ALTER TYPE public."ParticipantsOnProgramsStatus" OWNER TO desafio;

--
-- Name: PhoneBelongsTo; Type: TYPE; Schema: public; Owner: desafio
--

CREATE TYPE public."PhoneBelongsTo" AS ENUM (
    'SELF',
    'MOTHER',
    'FATHER',
    'TUTOR'
);


ALTER TYPE public."PhoneBelongsTo" OWNER TO desafio;

--
-- Name: ProgramDiaryType; Type: TYPE; Schema: public; Owner: desafio
--

CREATE TYPE public."ProgramDiaryType" AS ENUM (
    'INFO'
);


ALTER TYPE public."ProgramDiaryType" OWNER TO desafio;

--
-- Name: ProgramSex; Type: TYPE; Schema: public; Owner: desafio
--

CREATE TYPE public."ProgramSex" AS ENUM (
    'MALE',
    'FEMALE',
    'ALL'
);


ALTER TYPE public."ProgramSex" OWNER TO desafio;

--
-- Name: Roles; Type: TYPE; Schema: public; Owner: desafio
--

CREATE TYPE public."Roles" AS ENUM (
    'ADMIN',
    'MENTOR',
    'FACILITATOR',
    'FACILITATOR_VOLUNTEER'
);


ALTER TYPE public."Roles" OWNER TO desafio;

--
-- Name: SchoolYear; Type: TYPE; Schema: public; Owner: desafio
--

CREATE TYPE public."SchoolYear" AS ENUM (
    'GRADE_1',
    'GRADE_2',
    'GRADE_3',
    'GRADE_4',
    'GRADE_5',
    'GRADE_6',
    'GRADE_7',
    'YEAR_1',
    'YEAR_2',
    'YEAR_3',
    'YEAR_4',
    'YEAR_5'
);


ALTER TYPE public."SchoolYear" OWNER TO desafio;

--
-- Name: Sex; Type: TYPE; Schema: public; Owner: desafio
--

CREATE TYPE public."Sex" AS ENUM (
    'MALE',
    'FEMALE'
);


ALTER TYPE public."Sex" OWNER TO desafio;

--
-- Name: UserDiaryType; Type: TYPE; Schema: public; Owner: desafio
--

CREATE TYPE public."UserDiaryType" AS ENUM (
    'STATUS_ACTIVE',
    'STATUS_INACTIVE',
    'PROGRAM_STATUS_ACTIVE',
    'PROGRAM_STATUS_INACTIVE',
    'INFO',
    'STATUS_INVITED'
);


ALTER TYPE public."UserDiaryType" OWNER TO desafio;

--
-- Name: UserStatus; Type: TYPE; Schema: public; Owner: desafio
--

CREATE TYPE public."UserStatus" AS ENUM (
    'INVITED',
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public."UserStatus" OWNER TO desafio;

--
-- Name: Weekdays; Type: TYPE; Schema: public; Owner: desafio
--

CREATE TYPE public."Weekdays" AS ENUM (
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
);


ALTER TYPE public."Weekdays" OWNER TO desafio;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Class; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."Class" (
    id integer NOT NULL,
    "programId" integer NOT NULL,
    "isRainyDay" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" integer NOT NULL,
    "updatedBy" integer NOT NULL,
    date date NOT NULL
);


ALTER TABLE public."Class" OWNER TO desafio;

--
-- Name: Class_id_seq; Type: SEQUENCE; Schema: public; Owner: desafio
--

CREATE SEQUENCE public."Class_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Class_id_seq" OWNER TO desafio;

--
-- Name: Class_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desafio
--

ALTER SEQUENCE public."Class_id_seq" OWNED BY public."Class".id;


--
-- Name: Participant; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."Participant" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    address text,
    city text,
    "createdBy" integer NOT NULL,
    dni text NOT NULL,
    "firstName" text NOT NULL,
    "healthCertificateDate" text,
    "lastName" text NOT NULL,
    "medicalInsurance" text,
    picture text,
    "presentedDNI" boolean DEFAULT false NOT NULL,
    "presentedHealthCertificate" boolean DEFAULT false NOT NULL,
    "updatedBy" integer NOT NULL,
    sex public."Sex" NOT NULL,
    birthday text NOT NULL,
    neighborhood public."Neighborhood",
    email text,
    phone1 text,
    "phone1BelongsTo" public."PhoneBelongsTo",
    "phone1HasWhatsapp" boolean DEFAULT false NOT NULL,
    phone2 text,
    "phone2BelongsTo" public."PhoneBelongsTo",
    "phone2HasWhatsapp" boolean DEFAULT false NOT NULL,
    biography text,
    "notSchooled" boolean DEFAULT false NOT NULL,
    "schoolYear" public."SchoolYear",
    "schoolId" integer
);


ALTER TABLE public."Participant" OWNER TO desafio;

--
-- Name: ParticipantCommitment; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."ParticipantCommitment" (
    year integer NOT NULL,
    "participantId" integer NOT NULL,
    "aprilStatus" boolean,
    "aprilDescription" text,
    "mayStatus" boolean,
    "mayDescription" text,
    "juneStatus" boolean,
    "juneDescription" text,
    "julyStatus" boolean,
    "julyDescription" text,
    "augustStatus" boolean,
    "augustDescription" text,
    "septemberStatus" boolean,
    "septemberDescription" text,
    "octoberStatus" boolean,
    "octoberDescription" text,
    "novemberStatus" boolean,
    "novemberDescription" text,
    "commitmentDonation" boolean DEFAULT false NOT NULL,
    "commitmentVolunteer" boolean DEFAULT false NOT NULL,
    "decemberDescription" text,
    "decemberStatus" boolean
);


ALTER TABLE public."ParticipantCommitment" OWNER TO desafio;

--
-- Name: ParticipantDiary; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."ParticipantDiary" (
    id integer NOT NULL,
    "participantId" integer NOT NULL,
    type public."ParticipantDiaryType" NOT NULL,
    title text NOT NULL,
    description text,
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" integer NOT NULL,
    "updatedBy" integer NOT NULL,
    "isAutoEvent" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."ParticipantDiary" OWNER TO desafio;

--
-- Name: ParticipantDiaryPrograms; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."ParticipantDiaryPrograms" (
    "participantDiaryId" integer NOT NULL,
    "programId" integer NOT NULL
);


ALTER TABLE public."ParticipantDiaryPrograms" OWNER TO desafio;

--
-- Name: ParticipantDiary_id_seq; Type: SEQUENCE; Schema: public; Owner: desafio
--

CREATE SEQUENCE public."ParticipantDiary_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ParticipantDiary_id_seq" OWNER TO desafio;

--
-- Name: ParticipantDiary_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desafio
--

ALTER SEQUENCE public."ParticipantDiary_id_seq" OWNED BY public."ParticipantDiary".id;


--
-- Name: ParticipantHealth; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."ParticipantHealth" (
    "participantId" integer NOT NULL,
    "bloodType" public."BloodType" NOT NULL,
    "missingVaccines" text,
    "allergyDetails" text,
    "foodRestrictionDetails" text,
    "chronicDiseaseDetails" text,
    "takingMedicationDetails" text,
    "hospitalizedDetails" text,
    "isNormalPregnancy" public."FormAnswerOptions" NOT NULL,
    "hasCompleteVaccination" public."FormAnswerOptions" NOT NULL,
    "hasCongenitalHeartDisease" public."FormAnswerOptions" NOT NULL,
    "hasHypertension" public."FormAnswerOptions" NOT NULL,
    "hasHeartMurmurs" public."FormAnswerOptions" NOT NULL,
    "hasArrhythmia" public."FormAnswerOptions" NOT NULL,
    "hasAllergy" public."FormAnswerOptions" NOT NULL,
    "hasFoodRestriction" public."FormAnswerOptions" NOT NULL,
    "hasChronicDisease" public."FormAnswerOptions" NOT NULL,
    "isTakingMedication" public."FormAnswerOptions" NOT NULL,
    "hasBeenHospitalized" public."FormAnswerOptions" NOT NULL,
    "canDoPhysicalActivity" public."FormAnswerOptions" NOT NULL,
    observations text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" integer NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedBy" integer NOT NULL
);


ALTER TABLE public."ParticipantHealth" OWNER TO desafio;

--
-- Name: ParticipantStatus; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."ParticipantStatus" (
    year integer NOT NULL,
    "participantId" integer NOT NULL,
    status public."ParticipantYearStatus" DEFAULT 'INACTIVE'::public."ParticipantYearStatus" NOT NULL,
    "wasEverActive" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."ParticipantStatus" OWNER TO desafio;

--
-- Name: Participant_id_seq; Type: SEQUENCE; Schema: public; Owner: desafio
--

CREATE SEQUENCE public."Participant_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Participant_id_seq" OWNER TO desafio;

--
-- Name: Participant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desafio
--

ALTER SEQUENCE public."Participant_id_seq" OWNED BY public."Participant".id;


--
-- Name: ParticipantsOnClasses; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."ParticipantsOnClasses" (
    "classId" integer NOT NULL,
    "participantId" integer NOT NULL,
    status public."ClassAttendanceStatus" DEFAULT 'UNKNOWN'::public."ClassAttendanceStatus" NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ParticipantsOnClasses" OWNER TO desafio;

--
-- Name: ParticipantsOnPrograms; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."ParticipantsOnPrograms" (
    "programId" integer NOT NULL,
    "participantId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" integer NOT NULL,
    "updatedBy" integer NOT NULL,
    status public."ParticipantsOnProgramsStatus" DEFAULT 'ACTIVE'::public."ParticipantsOnProgramsStatus" NOT NULL,
    "waitingListOrder" text,
    "wasEverActive" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."ParticipantsOnPrograms" OWNER TO desafio;

--
-- Name: Program; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."Program" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    seats integer NOT NULL,
    "ageFrom" integer NOT NULL,
    "ageTo" integer NOT NULL,
    "ageByYear" boolean DEFAULT false NOT NULL,
    sex public."ProgramSex" NOT NULL,
    "createdBy" integer NOT NULL,
    "updatedBy" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    year integer NOT NULL
);


ALTER TABLE public."Program" OWNER TO desafio;

--
-- Name: ProgramDays; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."ProgramDays" (
    id integer NOT NULL,
    "programId" integer NOT NULL,
    day public."Weekdays" NOT NULL,
    "fromTime" text NOT NULL,
    "toTime" text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ProgramDays" OWNER TO desafio;

--
-- Name: ProgramDays_id_seq; Type: SEQUENCE; Schema: public; Owner: desafio
--

CREATE SEQUENCE public."ProgramDays_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ProgramDays_id_seq" OWNER TO desafio;

--
-- Name: ProgramDays_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desafio
--

ALTER SEQUENCE public."ProgramDays_id_seq" OWNED BY public."ProgramDays".id;


--
-- Name: ProgramDiary; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."ProgramDiary" (
    id integer NOT NULL,
    "programId" integer NOT NULL,
    type public."ProgramDiaryType" NOT NULL,
    title text NOT NULL,
    description text,
    "isAutoEvent" boolean DEFAULT false NOT NULL,
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" integer NOT NULL,
    "updatedBy" integer NOT NULL
);


ALTER TABLE public."ProgramDiary" OWNER TO desafio;

--
-- Name: ProgramDiaryParticipants; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."ProgramDiaryParticipants" (
    "programDiaryId" integer NOT NULL,
    "participantId" integer NOT NULL
);


ALTER TABLE public."ProgramDiaryParticipants" OWNER TO desafio;

--
-- Name: ProgramDiary_id_seq; Type: SEQUENCE; Schema: public; Owner: desafio
--

CREATE SEQUENCE public."ProgramDiary_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ProgramDiary_id_seq" OWNER TO desafio;

--
-- Name: ProgramDiary_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desafio
--

ALTER SEQUENCE public."ProgramDiary_id_seq" OWNED BY public."ProgramDiary".id;


--
-- Name: Program_id_seq; Type: SEQUENCE; Schema: public; Owner: desafio
--

CREATE SEQUENCE public."Program_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Program_id_seq" OWNER TO desafio;

--
-- Name: Program_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desafio
--

ALTER SEQUENCE public."Program_id_seq" OWNED BY public."Program".id;


--
-- Name: School; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."School" (
    id integer NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    phone text,
    "principalName" text,
    "principalPhone" text,
    "vicePrincipalName" text,
    "vicePrincipalPhone" text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" integer NOT NULL,
    "updatedBy" integer NOT NULL,
    email text
);


ALTER TABLE public."School" OWNER TO desafio;

--
-- Name: School_id_seq; Type: SEQUENCE; Schema: public; Owner: desafio
--

CREATE SEQUENCE public."School_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."School_id_seq" OWNER TO desafio;

--
-- Name: School_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desafio
--

ALTER SEQUENCE public."School_id_seq" OWNED BY public."School".id;


--
-- Name: SurveyBiography; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."SurveyBiography" (
    "livesWith" text NOT NULL,
    "schoolSituation" text NOT NULL,
    "programsInterest" text NOT NULL,
    "personalDescription" text NOT NULL,
    "homeActivities" text NOT NULL,
    "changedSchool" public."FormAnswerOptions" NOT NULL,
    "repeatedYear" public."FormAnswerOptions" NOT NULL,
    "participatedBefore" public."FormAnswerOptions" NOT NULL,
    "otherActivities" public."FormAnswerOptions" NOT NULL,
    "participantId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" integer NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedBy" integer NOT NULL,
    "finishedYear" public."FormAnswerOptions",
    "participatedBeforeDescription" text,
    "reasonChangedSchool" text,
    "reasonRepeatedYear" text,
    "otherActivitiesDescription" text
);


ALTER TABLE public."SurveyBiography" OWNER TO desafio;

--
-- Name: User; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status public."UserStatus" DEFAULT 'INVITED'::public."UserStatus" NOT NULL,
    address text,
    biography text,
    birthday text,
    city text,
    facebook text,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    linkedin text,
    phone1 text,
    phone2 text,
    picture text,
    twitter text,
    skype text,
    timezone text DEFAULT 'America/Argentina/Buenos_Aires'::text NOT NULL
);


ALTER TABLE public."User" OWNER TO desafio;

--
-- Name: UserDiary; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."UserDiary" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    type public."UserDiaryType" NOT NULL,
    title text NOT NULL,
    description text,
    "isAutoEvent" boolean DEFAULT false NOT NULL,
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" integer NOT NULL,
    "updatedBy" integer NOT NULL
);


ALTER TABLE public."UserDiary" OWNER TO desafio;

--
-- Name: UserDiaryPrograms; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."UserDiaryPrograms" (
    "userDiaryId" integer NOT NULL,
    "programId" integer NOT NULL
);


ALTER TABLE public."UserDiaryPrograms" OWNER TO desafio;

--
-- Name: UserDiary_id_seq; Type: SEQUENCE; Schema: public; Owner: desafio
--

CREATE SEQUENCE public."UserDiary_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserDiary_id_seq" OWNER TO desafio;

--
-- Name: UserDiary_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desafio
--

ALTER SEQUENCE public."UserDiary_id_seq" OWNED BY public."UserDiary".id;


--
-- Name: UserRoles; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."UserRoles" (
    "userId" integer NOT NULL,
    role public."Roles" NOT NULL
);


ALTER TABLE public."UserRoles" OWNER TO desafio;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: desafio
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO desafio;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desafio
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: UsersOnPrograms; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public."UsersOnPrograms" (
    "userId" integer NOT NULL,
    "programId" integer NOT NULL,
    "isFacilitator" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."UsersOnPrograms" OWNER TO desafio;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: desafio
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO desafio;

--
-- Name: Class id; Type: DEFAULT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."Class" ALTER COLUMN id SET DEFAULT nextval('public."Class_id_seq"'::regclass);


--
-- Name: Participant id; Type: DEFAULT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."Participant" ALTER COLUMN id SET DEFAULT nextval('public."Participant_id_seq"'::regclass);


--
-- Name: ParticipantDiary id; Type: DEFAULT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantDiary" ALTER COLUMN id SET DEFAULT nextval('public."ParticipantDiary_id_seq"'::regclass);


--
-- Name: Program id; Type: DEFAULT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."Program" ALTER COLUMN id SET DEFAULT nextval('public."Program_id_seq"'::regclass);


--
-- Name: ProgramDays id; Type: DEFAULT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ProgramDays" ALTER COLUMN id SET DEFAULT nextval('public."ProgramDays_id_seq"'::regclass);


--
-- Name: ProgramDiary id; Type: DEFAULT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ProgramDiary" ALTER COLUMN id SET DEFAULT nextval('public."ProgramDiary_id_seq"'::regclass);


--
-- Name: School id; Type: DEFAULT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."School" ALTER COLUMN id SET DEFAULT nextval('public."School_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: UserDiary id; Type: DEFAULT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."UserDiary" ALTER COLUMN id SET DEFAULT nextval('public."UserDiary_id_seq"'::regclass);


--
-- Data for Name: Class; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."Class" (id, "programId", "isRainyDay", "createdAt", "updatedAt", "createdBy", "updatedBy", date) FROM stdin;
1	3	t	2022-03-22 07:58:36.551+00	2022-03-22 07:58:36.551+00	1	1	2022-03-01
2	1	f	2022-03-22 07:59:07.44+00	2022-03-22 07:59:07.44+00	1	1	2022-03-01
3	1	f	2022-03-28 07:13:22.826+00	2022-03-28 07:13:22.826+00	1	1	2022-03-28
4	3	t	2022-08-18 15:55:08.839+00	2022-08-18 15:55:08.839+00	1	1	2022-08-18
\.


--
-- Data for Name: Participant; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."Participant" (id, "createdAt", "updatedAt", address, city, "createdBy", dni, "firstName", "healthCertificateDate", "lastName", "medicalInsurance", picture, "presentedDNI", "presentedHealthCertificate", "updatedBy", sex, birthday, neighborhood, email, phone1, "phone1BelongsTo", "phone1HasWhatsapp", phone2, "phone2BelongsTo", "phone2HasWhatsapp", biography, "notSchooled", "schoolYear", "schoolId") FROM stdin;
2	2022-03-20 16:39:02.062+00	2022-03-20 16:39:02.062+00			1	53453453	Fito	\N	Paez		https://res.cloudinary.com/eldesafio/image/upload/v1647794329/wbu11sp5klejhmf4re7w.jpg	f	f	1	MALE	2011-07-22	\N	\N		\N	f		\N	f		f	\N	\N
3	2022-03-20 16:39:44.593+00	2022-03-20 16:39:44.593+00			1	23453452	Pappo	\N	Napolitano		https://res.cloudinary.com/eldesafio/image/upload/v1647794370/ulwgcnbkbutdn6gbyjtv.webp	f	f	1	MALE	2009-08-08	\N	\N		\N	f		\N	f		f	\N	\N
4	2022-03-20 16:40:09.674+00	2022-03-20 16:40:09.674+00			1	99838342	Patricia	\N	Sosa		https://res.cloudinary.com/eldesafio/image/upload/v1647794394/vtm70ssjdyinmpxou7j1.jpg	f	f	1	FEMALE	2010-01-13	\N	\N		\N	f		\N	f		f	\N	\N
5	2022-03-20 16:40:36.839+00	2022-03-20 16:40:36.839+00			1	28474903	Fabiana	\N	Cantilo		https://res.cloudinary.com/eldesafio/image/upload/v1647794422/hj99uuodi2inwmeh3bzc.webp	f	f	1	FEMALE	2012-09-09	\N	\N		\N	f		\N	f		f	\N	\N
6	2022-03-20 16:41:05.735+00	2022-03-20 16:41:05.735+00			1	1232323	Freddie	\N	Mercury		https://res.cloudinary.com/eldesafio/image/upload/v1647794449/f7ji6c98clx1tdrutiwc.jpg	f	f	1	MALE	2010-09-09	\N	\N		\N	f		\N	f		f	\N	\N
7	2022-03-20 17:30:18.291+00	2022-03-20 17:32:30.148773+00			1	4532234	Luis Alberto	\N	Spinetta		https://res.cloudinary.com/eldesafio/image/upload/v1647797546/dnne4awdjkmkhx360ig4.webp	f	f	1	MALE	2010-10-10	\N	\N		\N	f		\N	f		f	\N	\N
1	2022-03-20 16:38:36.335+00	2022-03-27 17:26:28.671024+00			1	58367293	Charly	2022-03-27	Garcia		https://res.cloudinary.com/eldesafio/image/upload/v1647794300/cb3zyeyooushfzdcctea.jpg	t	t	1	MALE	2010-08-29	\N	\N		\N	f		\N	f		f	\N	\N
\.


--
-- Data for Name: ParticipantCommitment; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."ParticipantCommitment" (year, "participantId", "aprilStatus", "aprilDescription", "mayStatus", "mayDescription", "juneStatus", "juneDescription", "julyStatus", "julyDescription", "augustStatus", "augustDescription", "septemberStatus", "septemberDescription", "octoberStatus", "octoberDescription", "novemberStatus", "novemberDescription", "commitmentDonation", "commitmentVolunteer", "decemberDescription", "decemberStatus") FROM stdin;
2021	1	t	zdcsdfsd	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	t	f	\N	\N
2022	1	f	Donaron 100 pesos	t	mayo dfrgdfg	f	sdfsdf	f	sdfsdf	f	af	f	sep	f	oct	t	nobv	t	t	dec	t
\.


--
-- Data for Name: ParticipantDiary; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") FROM stdin;
3	1	INFO	Frustrado	Se frustra porque no puede meter goles	2022-03-14 00:00:00+00	2022-03-20 23:29:04.28+00	2022-03-20 23:29:04.28+00	1	1	f
1	1	INFO	Prueba 2	Esto es una prueba 2	2022-03-20 00:00:00+00	2022-03-20 18:24:17.269899+00	2022-03-20 23:53:29.200237+00	1	1	f
4	1	INFO	Prueba 3	Esto es una prueba	2022-03-02 00:00:00+00	2022-03-20 23:50:23.336+00	2022-03-20 23:55:37.832607+00	1	1	f
5	1	MENTORSHIP	Toca como un abuelo	# Y es la verdad\n\n> tiene un trip en el bocho	2022-03-01 00:00:00+00	2022-03-21 00:00:31.005+00	2022-03-21 00:00:31.005+00	1	1	f
57	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-22 00:00:00+00	2022-03-22 07:30:59.777+00	2022-03-22 07:30:59.777+00	1	1	t
58	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-22 00:00:00+00	2022-03-22 07:31:02.479+00	2022-03-22 07:31:02.479+00	1	1	t
59	1	YEAR_STATUS_WAITING	El estado del participante en el año 2022 fue cambiado a: espera	\N	2022-03-22 00:00:00+00	2022-03-22 07:31:02.496+00	2022-03-22 07:31:02.496+00	1	1	t
40	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-21 00:00:00+00	2022-03-21 19:25:20.476+00	2022-03-21 19:25:20.476+00	1	1	t
41	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2022 fue cambiado a: inactivo	\N	2022-03-21 00:00:00+00	2022-03-21 19:25:20.505+00	2022-03-21 19:25:20.505+00	1	1	t
42	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-21 00:00:00+00	2022-03-21 19:25:51.208+00	2022-03-21 19:25:51.208+00	1	1	t
43	1	YEAR_STATUS_ACTIVE	El estado del participante en el año 2022 fue cambiado a: activo	\N	2022-03-21 00:00:00+00	2022-03-21 19:25:51.238+00	2022-03-21 19:25:51.238+00	1	1	t
44	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-22 00:00:00+00	2022-03-22 07:28:45.069+00	2022-03-22 07:28:45.069+00	1	1	t
45	1	YEAR_STATUS_WAITING	El estado del participante en el año 2022 fue cambiado a: espera	\N	2022-03-22 00:00:00+00	2022-03-22 07:28:45.132+00	2022-03-22 07:28:45.132+00	1	1	t
46	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-22 00:00:00+00	2022-03-22 07:29:02.625+00	2022-03-22 07:29:02.625+00	1	1	t
47	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2022 fue cambiado a: inactivo	\N	2022-03-22 00:00:00+00	2022-03-22 07:29:02.663+00	2022-03-22 07:29:02.663+00	1	1	t
48	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-22 00:00:00+00	2022-03-22 07:29:11.779+00	2022-03-22 07:29:11.779+00	1	1	t
49	1	YEAR_STATUS_ACTIVE	El estado del participante en el año 2022 fue cambiado a: activo	\N	2022-03-22 00:00:00+00	2022-03-22 07:29:11.8+00	2022-03-22 07:29:11.8+00	1	1	t
50	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-22 00:00:00+00	2022-03-22 07:30:27.756+00	2022-03-22 07:30:27.756+00	1	1	t
51	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2022 fue cambiado a: inactivo	\N	2022-03-22 00:00:00+00	2022-03-22 07:30:27.797+00	2022-03-22 07:30:27.797+00	1	1	t
52	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-22 00:00:00+00	2022-03-22 07:30:36.641+00	2022-03-22 07:30:36.641+00	1	1	t
53	1	YEAR_STATUS_WAITING	El estado del participante en el año 2022 fue cambiado a: espera	\N	2022-03-22 00:00:00+00	2022-03-22 07:30:36.668+00	2022-03-22 07:30:36.668+00	1	1	t
54	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-22 00:00:00+00	2022-03-22 07:30:46.416+00	2022-03-22 07:30:46.416+00	1	1	t
55	1	YEAR_STATUS_ACTIVE	El estado del participante en el año 2022 fue cambiado a: activo	\N	2022-03-22 00:00:00+00	2022-03-22 07:30:46.443+00	2022-03-22 07:30:46.443+00	1	1	t
56	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-22 00:00:00+00	2022-03-22 07:30:52.585+00	2022-03-22 07:30:52.585+00	1	1	t
60	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-22 00:00:00+00	2022-03-22 07:48:04.06+00	2022-03-22 07:48:04.06+00	1	1	t
61	1	YEAR_STATUS_ACTIVE	El estado del participante en el año 2022 fue cambiado a: activo	\N	2022-03-22 00:00:00+00	2022-03-22 07:48:04.122+00	2022-03-22 07:48:04.122+00	1	1	t
62	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-22 00:00:00+00	2022-03-22 07:56:38.546+00	2022-03-22 07:56:38.546+00	1	1	t
63	1	YEAR_STATUS_WAITING	El estado del participante en el año 2022 fue cambiado a: espera	\N	2022-03-22 00:00:00+00	2022-03-22 07:56:38.588+00	2022-03-22 07:56:38.588+00	1	1	t
64	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-22 00:00:00+00	2022-03-22 07:56:51.326+00	2022-03-22 07:56:51.326+00	1	1	t
65	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-22 00:00:00+00	2022-03-22 07:56:54.377+00	2022-03-22 07:56:54.377+00	1	1	t
66	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2022 fue cambiado a: inactivo	\N	2022-03-22 00:00:00+00	2022-03-22 07:56:54.407+00	2022-03-22 07:56:54.407+00	1	1	t
67	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-22 00:00:00+00	2022-03-22 07:58:20.3+00	2022-03-22 07:58:20.3+00	1	1	t
68	1	YEAR_STATUS_ACTIVE	El estado del participante en el año 2022 fue cambiado a: activo	\N	2022-03-22 00:00:00+00	2022-03-22 07:58:20.327+00	2022-03-22 07:58:20.327+00	1	1	t
69	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-22 00:00:00+00	2022-03-22 07:58:52.757+00	2022-03-22 07:58:52.757+00	1	1	t
71	1	INFO	testing fecha 2	\N	2022-03-22 18:53:00+00	2022-03-22 18:54:01.633+00	2022-03-22 18:54:01.633+00	1	1	f
70	1	INFO	Testing fecha	\N	2022-03-22 19:15:00+00	2022-03-22 18:16:17.228+00	2022-03-22 20:38:15.904885+00	1	1	f
72	2	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-22 00:00:00+00	2022-03-22 22:25:06.941+00	2022-03-22 22:25:06.941+00	1	1	t
73	2	YEAR_STATUS_ACTIVE	El estado del participante en el año 2022 fue cambiado a: activo	\N	2022-03-22 00:00:00+00	2022-03-22 22:25:06.981+00	2022-03-22 22:25:06.981+00	1	1	t
74	7	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-22 00:00:00+00	2022-03-22 22:25:16.812+00	2022-03-22 22:25:16.812+00	1	1	t
75	7	YEAR_STATUS_ACTIVE	El estado del participante en el año 2022 fue cambiado a: activo	\N	2022-03-22 00:00:00+00	2022-03-22 22:25:16.84+00	2022-03-22 22:25:16.84+00	1	1	t
2	1	INFO	Ganamos! 😃	\N	2022-03-23 02:25:00+00	2022-03-20 22:29:54.607+00	2022-03-22 22:56:42.301232+00	1	1	f
76	1	INFO	Evento de 2021	Un evento del año pasado	2021-10-12 23:34:00+00	2022-03-23 19:35:12.515+00	2022-03-23 19:35:12.515+00	1	1	f
77	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 11:42:07.565+00	2022-03-26 11:42:07.565+00	1	1	t
78	1	YEAR_STATUS_WAITING	El estado del participante en el año 2021 fue cambiado a: espera	\N	2022-03-26 00:00:00+00	2022-03-26 11:42:07.614+00	2022-03-26 11:42:07.614+00	1	1	t
79	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-26 00:00:00+00	2022-03-26 11:42:58.012+00	2022-03-26 11:42:58.012+00	1	1	t
80	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	\N	2022-03-26 00:00:00+00	2022-03-26 11:42:58.042+00	2022-03-26 11:42:58.042+00	1	1	t
81	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 11:47:27.002+00	2022-03-26 11:47:27.002+00	1	1	t
82	1	YEAR_STATUS_WAITING	El estado del participante en el año 2021 fue cambiado a: espera	\N	2022-03-26 00:00:00+00	2022-03-26 11:47:27.041+00	2022-03-26 11:47:27.041+00	1	1	t
83	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-26 00:00:00+00	2022-03-26 11:47:39.07+00	2022-03-26 11:47:39.07+00	1	1	t
84	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	\N	2022-03-26 00:00:00+00	2022-03-26 11:47:39.098+00	2022-03-26 11:47:39.098+00	1	1	t
85	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 11:54:14.12+00	2022-03-26 11:54:14.12+00	1	1	t
86	1	YEAR_STATUS_WAITING	El estado del participante en el año 2021 fue cambiado a: espera	\N	2022-03-26 00:00:00+00	2022-03-26 11:54:14.155+00	2022-03-26 11:54:14.155+00	1	1	t
87	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-26 00:00:00+00	2022-03-26 11:54:30.603+00	2022-03-26 11:54:30.603+00	1	1	t
88	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	\N	2022-03-26 00:00:00+00	2022-03-26 11:54:30.657+00	2022-03-26 11:54:30.657+00	1	1	t
89	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 11:55:52.392+00	2022-03-26 11:55:52.392+00	1	1	t
90	1	YEAR_STATUS_WAITING	El estado del participante en el año 2021 fue cambiado a: espera	\N	2022-03-26 00:00:00+00	2022-03-26 11:55:52.428+00	2022-03-26 11:55:52.428+00	1	1	t
91	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-26 00:00:00+00	2022-03-26 11:56:20.502+00	2022-03-26 11:56:20.502+00	1	1	t
92	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	\N	2022-03-26 00:00:00+00	2022-03-26 11:56:20.538+00	2022-03-26 11:56:20.538+00	1	1	t
93	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 11:56:28.073+00	2022-03-26 11:56:28.073+00	1	1	t
94	1	YEAR_STATUS_WAITING	El estado del participante en el año 2021 fue cambiado a: espera	\N	2022-03-26 00:00:00+00	2022-03-26 11:56:28.093+00	2022-03-26 11:56:28.093+00	1	1	t
95	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-26 00:00:00+00	2022-03-26 11:56:32.811+00	2022-03-26 11:56:32.811+00	1	1	t
96	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	\N	2022-03-26 00:00:00+00	2022-03-26 11:56:32.835+00	2022-03-26 11:56:32.835+00	1	1	t
97	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 11:58:37.607+00	2022-03-26 11:58:37.607+00	1	1	t
98	1	YEAR_STATUS_WAITING	El estado del participante en el año 2021 fue cambiado a: espera	\N	2022-03-26 00:00:00+00	2022-03-26 11:58:37.629+00	2022-03-26 11:58:37.629+00	1	1	t
99	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-26 00:00:00+00	2022-03-26 12:03:36.338+00	2022-03-26 12:03:36.338+00	1	1	t
100	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	\N	2022-03-26 00:00:00+00	2022-03-26 12:03:36.374+00	2022-03-26 12:03:36.374+00	1	1	t
101	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 12:03:43.941+00	2022-03-26 12:03:43.941+00	1	1	t
102	1	YEAR_STATUS_WAITING	El estado del participante en el año 2021 fue cambiado a: espera	\N	2022-03-26 00:00:00+00	2022-03-26 12:03:43.976+00	2022-03-26 12:03:43.976+00	1	1	t
103	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-26 00:00:00+00	2022-03-26 12:04:28.289+00	2022-03-26 12:04:28.289+00	1	1	t
104	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	\N	2022-03-26 00:00:00+00	2022-03-26 12:04:28.317+00	2022-03-26 12:04:28.317+00	1	1	t
105	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 12:04:33.201+00	2022-03-26 12:04:33.201+00	1	1	t
106	1	YEAR_STATUS_WAITING	El estado del participante en el año 2021 fue cambiado a: espera	\N	2022-03-26 00:00:00+00	2022-03-26 12:04:33.226+00	2022-03-26 12:04:33.226+00	1	1	t
107	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-26 00:00:00+00	2022-03-26 12:06:26.64+00	2022-03-26 12:06:26.64+00	1	1	t
108	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	\N	2022-03-26 00:00:00+00	2022-03-26 12:06:26.677+00	2022-03-26 12:06:26.677+00	1	1	t
109	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 12:06:57.777+00	2022-03-26 12:06:57.777+00	1	1	t
110	1	YEAR_STATUS_WAITING	El estado del participante en el año 2021 fue cambiado a: espera	\N	2022-03-26 00:00:00+00	2022-03-26 12:06:57.808+00	2022-03-26 12:06:57.808+00	1	1	t
111	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-26 00:00:00+00	2022-03-26 12:18:38.17+00	2022-03-26 12:18:38.17+00	1	1	t
112	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	\N	2022-03-26 00:00:00+00	2022-03-26 12:18:38.204+00	2022-03-26 12:18:38.204+00	1	1	t
113	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 14:43:44.115+00	2022-03-26 14:43:44.115+00	1	1	t
114	1	YEAR_STATUS_WAITING	El estado del participante en el año 2021 fue cambiado a: espera	\N	2022-03-26 00:00:00+00	2022-03-26 14:43:44.156+00	2022-03-26 14:43:44.156+00	1	1	t
115	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-26 00:00:00+00	2022-03-26 14:44:14.472+00	2022-03-26 14:44:14.472+00	1	1	t
116	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	\N	2022-03-26 00:00:00+00	2022-03-26 14:44:14.499+00	2022-03-26 14:44:14.499+00	1	1	t
117	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 14:44:23.787+00	2022-03-26 14:44:23.787+00	1	1	t
118	1	YEAR_STATUS_WAITING	El estado del participante en el año 2021 fue cambiado a: espera	\N	2022-03-26 00:00:00+00	2022-03-26 14:44:23.807+00	2022-03-26 14:44:23.807+00	1	1	t
119	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-26 00:00:00+00	2022-03-26 14:44:32.507+00	2022-03-26 14:44:32.507+00	1	1	t
120	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	\N	2022-03-26 00:00:00+00	2022-03-26 14:44:32.536+00	2022-03-26 14:44:32.536+00	1	1	t
121	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 17:06:14.15+00	2022-03-26 17:06:14.15+00	1	1	t
122	1	YEAR_STATUS_WAITING	El estado del participante en el año 2021 fue cambiado a: espera	\N	2022-03-26 00:00:00+00	2022-03-26 17:06:14.18+00	2022-03-26 17:06:14.18+00	1	1	t
123	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 17:06:47.036+00	2022-03-26 17:06:47.036+00	1	1	t
124	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 17:06:50.78+00	2022-03-26 17:06:50.78+00	1	1	t
125	1	YEAR_STATUS_WAITING	El estado del participante en el año 2022 fue cambiado a: espera	\N	2022-03-26 00:00:00+00	2022-03-26 17:06:50.812+00	2022-03-26 17:06:50.812+00	1	1	t
126	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-26 00:00:00+00	2022-03-26 17:06:55.126+00	2022-03-26 17:06:55.126+00	1	1	t
127	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-26 00:00:00+00	2022-03-26 17:06:58.295+00	2022-03-26 17:06:58.295+00	1	1	t
128	1	YEAR_STATUS_ACTIVE	El estado del participante en el año 2022 fue cambiado a: activo	\N	2022-03-26 00:00:00+00	2022-03-26 17:06:58.314+00	2022-03-26 17:06:58.314+00	1	1	t
129	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-26 00:00:00+00	2022-03-26 17:07:12.981+00	2022-03-26 17:07:12.981+00	1	1	t
130	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 17:11:03.812+00	2022-03-26 17:11:03.812+00	1	1	t
131	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-26 00:00:00+00	2022-03-26 17:11:47.826+00	2022-03-26 17:11:47.826+00	1	1	t
132	1	YEAR_STATUS_ACTIVE	El estado del participante en el año 2021 fue cambiado a: activo	\N	2022-03-26 00:00:00+00	2022-03-26 17:11:47.851+00	2022-03-26 17:11:47.851+00	1	1	t
133	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-26 00:00:00+00	2022-03-26 17:14:00.124+00	2022-03-26 17:14:00.124+00	1	1	t
134	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	\N	2022-03-26 00:00:00+00	2022-03-26 17:14:00.155+00	2022-03-26 17:14:00.155+00	1	1	t
135	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 17:14:37.929+00	2022-03-26 17:14:37.929+00	1	1	t
136	1	YEAR_STATUS_WAITING	El estado del participante en el año 2021 fue cambiado a: espera	\N	2022-03-26 00:00:00+00	2022-03-26 17:14:37.948+00	2022-03-26 17:14:37.948+00	1	1	t
137	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-26 00:00:00+00	2022-03-26 17:14:49.296+00	2022-03-26 17:14:49.296+00	1	1	t
138	1	YEAR_STATUS_ACTIVE	El estado del participante en el año 2021 fue cambiado a: activo	\N	2022-03-26 00:00:00+00	2022-03-26 17:14:49.316+00	2022-03-26 17:14:49.316+00	1	1	t
139	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-26 00:00:00+00	2022-03-26 17:14:54.117+00	2022-03-26 17:14:54.117+00	1	1	t
140	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	\N	2022-03-26 00:00:00+00	2022-03-26 17:14:54.153+00	2022-03-26 17:14:54.153+00	1	1	t
141	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 17:14:57.938+00	2022-03-26 17:14:57.938+00	1	1	t
142	1	YEAR_STATUS_WAITING	El estado del participante en el año 2021 fue cambiado a: espera	\N	2022-03-26 00:00:00+00	2022-03-26 17:14:57.959+00	2022-03-26 17:14:57.959+00	1	1	t
143	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-26 00:00:00+00	2022-03-26 17:15:02.235+00	2022-03-26 17:15:02.235+00	1	1	t
144	1	YEAR_STATUS_ACTIVE	El estado del participante en el año 2021 fue cambiado a: activo	\N	2022-03-26 00:00:00+00	2022-03-26 17:15:02.434+00	2022-03-26 17:15:02.434+00	1	1	t
145	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-26 00:00:00+00	2022-03-26 17:29:10.847+00	2022-03-26 17:29:10.847+00	1	1	t
146	1	YEAR_STATUS_WAITING	El estado del participante en el año 2021 fue cambiado a: espera	\N	2022-03-26 00:00:00+00	2022-03-26 17:29:10.881+00	2022-03-26 17:29:10.881+00	1	1	t
147	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	Baja porque faltó 3 veces seguidas	2022-03-27 00:00:00+00	2022-03-27 09:39:07.997+00	2022-03-27 09:39:07.997+00	1	1	t
148	1	PROGRAM_STATUS_INACTIVE_3_ABSENT	Dado de baja del programa	Baja porque faltó 3 veces seguidas	2022-03-27 00:00:00+00	2022-03-27 09:39:08.013+00	2022-03-27 09:39:08.013+00	1	1	t
149	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-27 00:00:00+00	2022-03-27 09:40:25.286+00	2022-03-27 09:40:25.286+00	1	1	t
150	1	YEAR_STATUS_ACTIVE	El estado del participante en el año 2021 fue cambiado a: activo	\N	2022-03-27 00:00:00+00	2022-03-27 09:40:25.322+00	2022-03-27 09:40:25.322+00	1	1	t
151	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	ya no puede seguir asistiendo porque se mudó de barrio	2022-03-27 00:00:00+00	2022-03-27 09:40:47.697+00	2022-03-27 09:40:47.697+00	1	1	t
152	1	PROGRAM_STATUS_INACTIVE_FAMILY	Dado de baja del programa	ya no puede seguir asistiendo porque se mudó de barrio	2022-03-27 00:00:00+00	2022-03-27 09:40:47.697+00	2022-03-27 09:40:47.697+00	1	1	t
153	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-27 00:00:00+00	2022-03-27 09:51:32.096+00	2022-03-27 09:51:32.096+00	1	1	t
154	1	YEAR_STATUS_ACTIVE	El estado del participante en el año 2021 fue cambiado a: activo	\N	2022-03-27 00:00:00+00	2022-03-27 09:51:32.136+00	2022-03-27 09:51:32.136+00	1	1	t
155	1	PROGRAM_STATUS_INACTIVE_NO_SHOW	Dado de baja del programa	nunca se presentó	2022-03-27 09:53:05.074+00	2022-03-27 09:53:05.076+00	2022-03-27 09:53:05.076+00	1	1	t
156	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	nunca se presentó	2022-03-27 09:53:05.075+00	2022-03-27 09:53:05.076+00	2022-03-27 09:53:05.076+00	1	1	t
157	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-27 10:13:27.343+00	2022-03-27 10:13:27.344+00	2022-03-27 10:13:27.344+00	1	1	t
158	1	YEAR_STATUS_WAITING	El estado del participante en el año 2021 fue cambiado a: espera	\N	2022-03-27 10:13:27.372+00	2022-03-27 10:13:27.372+00	2022-03-27 10:13:27.372+00	1	1	t
159	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-27 10:13:45.239+00	2022-03-27 10:13:45.24+00	2022-03-27 10:13:45.24+00	1	1	t
160	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2021 fue cambiado a: inactivo	\N	2022-03-27 10:13:45.26+00	2022-03-27 10:13:45.261+00	2022-03-27 10:13:45.261+00	1	1	t
161	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2022 fue cambiado a: inactivo		2022-03-27 14:43:16.194+00	2022-03-27 14:43:16.197+00	2022-03-27 14:43:16.197+00	1	1	t
162	1	PROGRAM_STATUS_INACTIVE_3_ABSENT	Dado de baja del programa		2022-03-27 14:43:16.194+00	2022-03-27 14:43:16.197+00	2022-03-27 14:43:16.197+00	1	1	t
163	1	PROGRAM_STATUS_INACTIVE_3_ABSENT	Dado de baja del programa		2022-03-27 14:43:16.194+00	2022-03-27 14:43:16.197+00	2022-03-27 14:43:16.197+00	1	1	t
164	1	PROGRAM_STATUS_INACTIVE_3_ABSENT	Dado de baja del programa		2022-03-27 14:43:16.194+00	2022-03-27 14:43:16.197+00	2022-03-27 14:43:16.197+00	1	1	t
165	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-27 14:43:29.903+00	2022-03-27 14:43:29.904+00	2022-03-27 14:43:29.904+00	1	1	t
166	1	YEAR_STATUS_ACTIVE	El estado del participante en el año 2022 fue cambiado a: activo	\N	2022-03-27 14:43:29.945+00	2022-03-27 14:43:29.946+00	2022-03-27 14:43:29.946+00	1	1	t
167	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-27 14:43:33.947+00	2022-03-27 14:43:33.948+00	2022-03-27 14:43:33.948+00	1	1	t
168	1	PROGRAM_STATUS_INACTIVE_3_ABSENT	Dado de baja del programa		2022-03-27 14:46:32.697+00	2022-03-27 14:46:32.698+00	2022-03-27 14:46:32.698+00	1	1	t
169	1	PROGRAM_STATUS_INACTIVE_3_ABSENT	Dado de baja del programa		2022-03-27 14:46:32.697+00	2022-03-27 14:46:32.698+00	2022-03-27 14:46:32.698+00	1	1	t
170	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2022 fue cambiado a: inactivo		2022-03-27 14:46:32.697+00	2022-03-27 14:46:32.698+00	2022-03-27 14:46:32.698+00	1	1	t
171	1	PROGRAM_STATUS_INACTIVE_3_ABSENT	Dado de baja del programa		2022-03-27 14:46:32.697+00	2022-03-27 14:46:32.698+00	2022-03-27 14:46:32.698+00	1	1	t
172	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-27 14:48:17.032+00	2022-03-27 14:48:17.033+00	2022-03-27 14:48:17.033+00	1	1	t
173	1	YEAR_STATUS_ACTIVE	El estado del participante en el año 2022 fue cambiado a: activo	\N	2022-03-27 14:48:17.067+00	2022-03-27 14:48:17.069+00	2022-03-27 14:48:17.069+00	1	1	t
174	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-27 14:48:19.903+00	2022-03-27 14:48:19.904+00	2022-03-27 14:48:19.904+00	1	1	t
175	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-27 14:48:29.33+00	2022-03-27 14:48:29.331+00	2022-03-27 14:48:29.331+00	1	1	t
176	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2022 fue cambiado a: inactivo		2022-03-27 14:48:46.414+00	2022-03-27 14:48:46.415+00	2022-03-27 14:48:46.415+00	1	1	t
177	1	PROGRAM_STATUS_INACTIVE_3_ABSENT	Dado de baja del programa		2022-03-27 14:48:46.414+00	2022-03-27 14:48:46.415+00	2022-03-27 14:48:46.415+00	1	1	t
178	1	PROGRAM_STATUS_INACTIVE_3_ABSENT	Dado de baja del programa		2022-03-27 14:48:46.414+00	2022-03-27 14:48:46.415+00	2022-03-27 14:48:46.415+00	1	1	t
179	1	PROGRAM_STATUS_INACTIVE_3_ABSENT	Dado de baja del programa		2022-03-27 14:48:46.414+00	2022-03-27 14:48:46.415+00	2022-03-27 14:48:46.415+00	1	1	t
180	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-27 14:49:49.959+00	2022-03-27 14:49:49.96+00	2022-03-27 14:49:49.96+00	1	1	t
181	1	YEAR_STATUS_ACTIVE	El estado del participante en el año 2022 fue cambiado a: activo	\N	2022-03-27 14:49:49.985+00	2022-03-27 14:49:49.985+00	2022-03-27 14:49:49.985+00	1	1	t
182	1	PROGRAM_STATUS_INACTIVE_3_ABSENT	Dado de baja del programa		2022-03-27 14:50:03.26+00	2022-03-27 14:50:03.262+00	2022-03-27 14:50:03.262+00	1	1	t
183	1	PROGRAM_STATUS_INACTIVE_3_ABSENT	Dado de baja del programa		2022-03-27 14:50:03.261+00	2022-03-27 14:50:03.262+00	2022-03-27 14:50:03.262+00	1	1	t
184	1	YEAR_STATUS_INACTIVE	El estado del participante en el año 2022 fue cambiado a: inactivo		2022-03-27 14:50:03.261+00	2022-03-27 14:50:03.262+00	2022-03-27 14:50:03.262+00	1	1	t
185	1	PROGRAM_STATUS_INACTIVE_3_ABSENT	Dado de baja del programa		2022-03-27 14:50:03.261+00	2022-03-27 14:50:03.262+00	2022-03-27 14:50:03.262+00	1	1	t
186	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-27 14:53:33.635+00	2022-03-27 14:53:33.635+00	2022-03-27 14:53:33.635+00	1	1	t
187	1	YEAR_STATUS_ACTIVE	El estado del participante en el año 2022 fue cambiado a: activo	\N	2022-03-27 14:53:33.658+00	2022-03-27 14:53:33.659+00	2022-03-27 14:53:33.659+00	1	1	t
188	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-27 14:53:36.794+00	2022-03-27 14:53:36.795+00	2022-03-27 14:53:36.795+00	1	1	t
189	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-03-27 14:53:55.902+00	2022-03-27 14:53:55.902+00	2022-03-27 14:53:55.902+00	1	1	t
190	1	PROGRAM_STATUS_INACTIVE_OTHER	Dado de baja del programa	\N	2022-03-27 14:54:10.313+00	2022-03-27 14:54:10.313+00	2022-03-27 14:54:10.313+00	1	1	t
191	1	PROGRAM_STATUS_WAITING	Agregado a la lista de espera	\N	2022-03-27 14:54:50.315+00	2022-03-27 14:54:50.315+00	2022-03-27 14:54:50.315+00	1	1	t
192	1	PROGRAM_STATUS_ACTIVE	Dado de alta en el programa	\N	2022-04-03 19:43:01.349+00	2022-04-03 19:43:01.373+00	2022-04-03 19:43:01.373+00	1	1	t
193	1	YEAR_STATUS_ACTIVE	El estado del participante en el año 2021 fue cambiado a: activo	\N	2022-04-03 19:43:01.475+00	2022-04-03 19:43:01.508+00	2022-04-03 19:43:01.508+00	1	1	t
\.


--
-- Data for Name: ParticipantDiaryPrograms; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") FROM stdin;
3	1
1	1
4	1
5	1
40	3
42	3
44	3
46	3
48	3
50	3
52	3
54	3
56	1
57	1
58	3
60	3
62	3
64	1
65	3
67	3
69	1
70	3
70	2
72	1
74	1
76	1
77	4
79	4
81	4
83	4
85	4
87	4
89	4
91	4
93	4
95	4
97	4
99	4
101	4
103	4
105	4
107	4
109	4
111	4
113	4
115	4
117	4
119	4
121	4
123	3
124	1
126	1
127	1
129	3
130	3
131	4
133	4
135	4
137	4
139	4
141	4
143	4
145	4
148	4
149	4
152	4
153	4
155	4
157	4
159	4
162	2
163	1
164	3
165	3
167	1
168	1
169	3
171	2
172	3
174	1
175	2
177	2
178	3
179	1
180	3
182	3
183	2
185	1
186	3
188	1
189	2
190	2
191	1
192	4
\.


--
-- Data for Name: ParticipantHealth; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."ParticipantHealth" ("participantId", "bloodType", "missingVaccines", "allergyDetails", "foodRestrictionDetails", "chronicDiseaseDetails", "takingMedicationDetails", "hospitalizedDetails", "isNormalPregnancy", "hasCompleteVaccination", "hasCongenitalHeartDisease", "hasHypertension", "hasHeartMurmurs", "hasArrhythmia", "hasAllergy", "hasFoodRestriction", "hasChronicDisease", "isTakingMedication", "hasBeenHospitalized", "canDoPhysicalActivity", observations, "createdAt", "createdBy", "updatedAt", "updatedBy") FROM stdin;
1	A_POSITIVE	BCG	\N	pan	\N	\N	\N	YES	NO	NO	NO	NO	NO	NO	YES	NO	NO	NO	YES	\N	2022-03-27 11:12:45.325+00	1	2022-03-27 11:12:45.325+00	1
\.


--
-- Data for Name: ParticipantStatus; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."ParticipantStatus" (year, "participantId", status, "wasEverActive") FROM stdin;
2022	1	ACTIVE	t
2021	1	ACTIVE	t
2022	2	ACTIVE	f
2022	7	ACTIVE	f
\.


--
-- Data for Name: ParticipantsOnClasses; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."ParticipantsOnClasses" ("classId", "participantId", status, "createdAt", "updatedAt") FROM stdin;
1	1	PRESENT	2022-03-22 07:58:36.551+00	2022-03-22 07:58:36.551+00
2	1	ABSENT	2022-03-22 07:59:07.44+00	2022-03-22 07:59:07.44+00
3	7	PRESENT	2022-03-28 07:13:22.826+00	2022-03-28 07:13:22.826+00
3	2	PRESENT	2022-03-28 07:13:22.826+00	2022-03-28 07:13:22.826+00
4	1	ABSENT	2022-08-18 15:55:08.839+00	2022-08-18 15:55:08.839+00
\.


--
-- Data for Name: ParticipantsOnPrograms; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."ParticipantsOnPrograms" ("programId", "participantId", "createdAt", "updatedAt", "createdBy", "updatedBy", status, "waitingListOrder", "wasEverActive") FROM stdin;
3	1	2022-03-21 00:39:52.31+00	2022-03-27 14:53:33.605568+00	1	1	ACTIVE	\N	t
2	1	2022-03-20 21:53:33.747+00	2022-03-27 14:54:10.293592+00	1	1	INACTIVE	\N	t
1	1	2022-03-20 21:53:30.607+00	2022-03-27 14:54:50.298864+00	1	1	WAITING	m	t
4	1	2022-03-26 11:42:07.547+00	2022-04-03 19:43:01.324007+00	1	1	ACTIVE	\N	t
1	2	2022-03-22 22:25:06.918+00	2022-03-22 22:25:06.918+00	1	1	ACTIVE	\N	t
1	7	2022-03-22 22:25:16.799+00	2022-03-22 22:25:16.799+00	1	1	ACTIVE	\N	t
\.


--
-- Data for Name: Program; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."Program" (id, name, description, seats, "ageFrom", "ageTo", "ageByYear", sex, "createdBy", "updatedBy", "createdAt", "updatedAt", year) FROM stdin;
1	⚽️ Futbol		4	10	22	f	MALE	1	1	2022-03-20 16:41:36.356+00	2022-03-20 16:43:47.19883+00	2022
2	🏑 Hockey		4	10	22	f	ALL	1	1	2022-03-20 16:44:25.781+00	2022-03-20 16:44:25.781+00	2022
4	🎨 Arte		4	10	20	f	ALL	1	1	2022-03-26 10:51:35.372+00	2022-03-26 10:51:35.372+00	2021
3	📸 Fotografía		4	10	22	f	ALL	1	1	2022-03-20 16:45:04.246+00	2022-04-12 10:49:55.16246+00	2022
8	🪂 Paracaidismo		4	10	20	f	ALL	1	1	2022-04-12 11:29:45.779+00	2022-04-12 11:29:45.779+00	2022
\.


--
-- Data for Name: ProgramDays; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."ProgramDays" (id, "programId", day, "fromTime", "toTime", "createdAt", "updatedAt") FROM stdin;
3	1	MONDAY	15:00	16:00	2022-03-20 16:43:47.198+00	2022-03-20 16:43:47.198+00
4	2	FRIDAY	18:00	19:00	2022-03-20 16:44:25.781+00	2022-03-20 16:44:25.781+00
6	4	FRIDAY	14:00	15:00	2022-03-26 10:51:35.372+00	2022-03-26 10:51:35.372+00
10	3	THURSDAY	11:00	12:30	2022-04-12 10:49:55.162+00	2022-04-12 10:49:55.162+00
14	8	MONDAY	15:00	16:00	2022-04-12 11:29:45.779+00	2022-04-12 11:29:45.779+00
\.


--
-- Data for Name: ProgramDiary; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."ProgramDiary" (id, "programId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") FROM stdin;
1	1	INFO	Charly se porta mal	### Problemas con Chary\n\nNo se está portando bien y hace macanas.	f	2022-03-23 02:19:00+00	2022-03-22 22:20:03.362+00	2022-03-22 22:20:03.362+00	1	1
2	1	INFO	Ganamos! 😃	Le ganamos al Jockey club!	f	2022-03-23 02:25:00+00	2022-03-22 22:25:46.686+00	2022-03-23 19:57:40.509039+00	1	1
\.


--
-- Data for Name: ProgramDiaryParticipants; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."ProgramDiaryParticipants" ("programDiaryId", "participantId") FROM stdin;
1	1
2	7
2	2
2	1
\.


--
-- Data for Name: School; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."School" (id, name, address, city, phone, "principalName", "principalPhone", "vicePrincipalName", "vicePrincipalPhone", "createdAt", "updatedAt", "createdBy", "updatedBy", email) FROM stdin;
1	Normal 2	Córdoba 1111	Rosario	345345345	Carlos Perciavale	2345345	Norma Pons	3456567	2022-03-24 23:31:01.178+00	2022-03-28 20:32:44.151314+00	1	1	normal@normal.school.bla
\.


--
-- Data for Name: SurveyBiography; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."SurveyBiography" ("livesWith", "schoolSituation", "programsInterest", "personalDescription", "homeActivities", "changedSchool", "repeatedYear", "participatedBefore", "otherActivities", "participantId", "createdAt", "createdBy", "updatedAt", "updatedBy", "finishedYear", "participatedBeforeDescription", "reasonChangedSchool", "reasonRepeatedYear", "otherActivitiesDescription") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."User" (id, email, "createdAt", "updatedAt", status, address, biography, birthday, city, facebook, "firstName", "lastName", linkedin, phone1, phone2, picture, twitter, skype, timezone) FROM stdin;
1	lucas.curti@eldesafio.org	2022-03-20 16:37:05.191985+00	2022-03-28 17:37:13.683822+00	ACTIVE	\N	\N	1981-09-02	\N	\N	Lucas	Curti	\N	\N	\N	https://res.cloudinary.com/eldesafio/image/upload/v1648489029/blz1hhfcdsgtmvhdidbj.jpg	\N	\N	Europe/Madrid
2	esther@mail.com.bla.bla	2022-03-20 16:42:16.041+00	2022-03-28 17:38:01.167156+00	ACTIVE	\N	\N	2000-09-09	\N	\N	Esther	Piscore	\N	\N	\N	https://res.cloudinary.com/eldesafio/image/upload/v1648489075/iwgf6srbsjvh6cuscmhd.jpg	\N	\N	America/Argentina/Buenos_Aires
3	efren@mail.bla.bla	2022-03-20 16:43:00.314+00	2022-04-12 12:03:05.827119+00	INVITED	\N	\N	1999-08-08	\N	\N	Efren	Salonga	\N	\N	\N	\N	\N	\N	America/Argentina/Buenos_Aires
\.


--
-- Data for Name: UserDiary; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."UserDiary" (id, "userId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") FROM stdin;
2	1	INFO	Testing	testing	f	2022-04-06 17:22:00+00	2022-04-06 17:22:15.878+00	2022-04-06 17:22:15.878+00	1	1
1	2	INFO	testing	sdfsdfsdfsdf	f	2021-09-15 19:48:00+00	2022-04-03 19:49:00.936+00	2022-04-06 17:36:57.345029+00	1	1
3	2	INFO	testing 2022	testing 2022	f	2022-04-06 17:37:00+00	2022-04-06 17:37:43.063+00	2022-04-06 17:37:43.063+00	1	1
4	3	PROGRAM_STATUS_INACTIVE	Dado de baja como voluntario en el programa	\N	t	2022-04-12 10:48:59.365+00	2022-04-12 10:48:59.368+00	2022-04-12 10:48:59.368+00	1	1
5	3	PROGRAM_STATUS_ACTIVE	Dado de alta como voluntario en el programa	\N	t	2022-04-12 10:49:18.048+00	2022-04-12 10:49:18.05+00	2022-04-12 10:49:18.05+00	1	1
6	2	PROGRAM_STATUS_INACTIVE	Dado de baja como facilitador en el programa	\N	t	2022-04-12 10:49:38.913+00	2022-04-12 10:49:38.915+00	2022-04-12 10:49:38.915+00	1	1
7	2	PROGRAM_STATUS_ACTIVE	Dado de alta como facilitador en el programa	\N	t	2022-04-12 10:49:55.16+00	2022-04-12 10:49:55.162+00	2022-04-12 10:49:55.162+00	1	1
8	2	PROGRAM_STATUS_ACTIVE	Dado de alta como facilitador en el programa	\N	t	2022-04-12 11:29:45.814+00	2022-04-12 11:29:45.816+00	2022-04-12 11:29:45.816+00	1	1
9	3	PROGRAM_STATUS_ACTIVE	Dado de alta como voluntario en el programa	\N	t	2022-04-12 11:29:45.814+00	2022-04-12 11:29:45.816+00	2022-04-12 11:29:45.816+00	1	1
10	3	STATUS_INACTIVE	Status cambiado a: Inactivo	\N	t	2022-04-12 12:00:43.006+00	2022-04-12 12:00:43.007+00	2022-04-12 12:00:43.007+00	1	1
11	3	STATUS_INVITED	Status cambiado a: Invitado	\N	t	2022-04-12 12:02:20.998+00	2022-04-12 12:02:21+00	2022-04-12 12:02:21+00	1	1
12	3	STATUS_INACTIVE	Status cambiado a: Inactivo	\N	t	2022-04-12 12:02:28.541+00	2022-04-12 12:02:28.542+00	2022-04-12 12:02:28.542+00	1	1
13	3	STATUS_ACTIVE	Status cambiado a: Activo	\N	t	2022-04-12 12:02:53.302+00	2022-04-12 12:02:53.303+00	2022-04-12 12:02:53.303+00	1	1
14	3	STATUS_INACTIVE	Status cambiado a: Inactivo	\N	t	2022-04-12 12:02:59.578+00	2022-04-12 12:02:59.579+00	2022-04-12 12:02:59.579+00	1	1
15	3	STATUS_INVITED	Status cambiado a: Invitado	\N	t	2022-04-12 12:03:05.856+00	2022-04-12 12:03:05.857+00	2022-04-12 12:03:05.857+00	1	1
\.


--
-- Data for Name: UserDiaryPrograms; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."UserDiaryPrograms" ("userDiaryId", "programId") FROM stdin;
1	4
3	1
4	3
5	3
6	3
7	3
8	8
9	8
\.


--
-- Data for Name: UserRoles; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."UserRoles" ("userId", role) FROM stdin;
1	ADMIN
2	FACILITATOR
3	FACILITATOR_VOLUNTEER
\.


--
-- Data for Name: UsersOnPrograms; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public."UsersOnPrograms" ("userId", "programId", "isFacilitator", "createdAt", "updatedAt") FROM stdin;
2	1	t	2022-03-20 16:43:47.198+00	2022-03-20 16:43:47.198+00
3	1	f	2022-03-20 16:43:47.198+00	2022-03-20 16:43:47.198+00
2	2	t	2022-03-20 16:44:25.781+00	2022-03-20 16:44:25.781+00
3	2	f	2022-03-20 16:44:25.781+00	2022-03-20 16:44:25.781+00
2	4	t	2022-03-26 10:51:35.372+00	2022-03-26 10:51:35.372+00
3	4	f	2022-03-26 10:51:35.372+00	2022-03-26 10:51:35.372+00
2	3	t	2022-04-12 10:49:55.162+00	2022-04-12 10:49:55.162+00
3	3	f	2022-04-12 10:49:55.162+00	2022-04-12 10:49:55.162+00
2	8	t	2022-04-12 11:29:45.779+00	2022-04-12 11:29:45.779+00
3	8	f	2022-04-12 11:29:45.779+00	2022-04-12 11:29:45.779+00
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: desafio
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ca0ed34b-36eb-4e71-9525-3d812bd3571d	42e475168c26bc2479b7999c308ac616e170cff29ec6497f0232dea19710a954	2022-03-20 16:29:02.160205+00	20211206151111_phones_and_email	\N	\N	2022-03-20 16:29:02.153541+00	1
e5f53303-7249-4b23-a901-f916da1e0ee5	136997de50222631d24f17b82e261788cf1a339d70a5245358367e33ad30638f	2022-03-20 16:29:02.005492+00	20211204205358_init	\N	\N	2022-03-20 16:29:01.994795+00	1
fadc77e6-ba64-4525-856b-6f8a158c000f	726a98408fb2525b26c6e1b0cadaa472c41d4af0605df46b347afdcfd9c7c74f	2022-03-20 16:29:02.017025+00	20211205115959_init	\N	\N	2022-03-20 16:29:02.007487+00	1
04015902-175f-4576-95a5-1f3ebdc6d191	e40086f50e07017cd9fd42431ffd80599e2b6ae7ecde3110d6a46ee4188b24c2	2022-03-20 16:29:02.361124+00	20220305105652_add	\N	\N	2022-03-20 16:29:02.355199+00	1
0c14d5a8-0e83-422a-8f85-f846eb1117dc	a618fae88215f0d1ec3342d041b78cdc5dae438ebe9d3254fd1e9ff5cd51f7ee	2022-03-20 16:29:02.039825+00	20211205120320_init	\N	\N	2022-03-20 16:29:02.019848+00	1
f56b9e71-a69c-4e73-ac2f-5ed0cd1cfb61	5d5483c7c1cdaa2210e05a3978aef24ecadf880d82240b370279f0c67efa5ea2	2022-03-20 16:29:02.168784+00	20211206151453_belongs_to_defualt_null	\N	\N	2022-03-20 16:29:02.163379+00	1
2f094bf5-4daa-4567-8f4e-2da7e42861a8	1c1119e3cef5e61a80b100c1312598d7dfe82a278881f779b06148ff23d85a5f	2022-03-20 16:29:02.050844+00	20211205120627_add_dates	\N	\N	2022-03-20 16:29:02.042285+00	1
d81193cd-a4fc-4fd1-8e28-06f16dccdbd1	29d8b92619ea26cdea4dca98ee55e6f7902e997dc433fccad4812eab8066ed93	2022-03-20 16:29:02.066872+00	20211205170400_add_participant_and_survey_bio	\N	\N	2022-03-20 16:29:02.052924+00	1
92b95ce1-da58-491c-b2ae-933785f98b4c	f93acd3cac763efabd394146dc0626002eddf594da0f446777363f0266e71f53	2022-03-20 16:29:02.249476+00	20211210094224_add_school	\N	\N	2022-03-20 16:29:02.239961+00	1
95bdd462-19b2-4eab-83e1-b24460a1af12	68faa95369d6f5bdac6c92538baf5d6a439dd3c8ab5c15108aba26c3c8044f36	2022-03-20 16:29:02.074984+00	20211205185940_add_sex	\N	\N	2022-03-20 16:29:02.069209+00	1
bfb5a52f-c70f-48f5-809a-59856d398519	319b163cb821d7a0068f8bb503535723db37efaff722f3a0fac883b601d366b5	2022-03-20 16:29:02.174836+00	20211206162245_add_bio	\N	\N	2022-03-20 16:29:02.170383+00	1
f8ac646d-817f-4449-a624-c8dca5f66a36	cb773c8c66c5f72e7938802ee2a737f095697372859ecc7281191f38ea31bf1e	2022-03-20 16:29:02.088635+00	20211205221657_add_birthday	\N	\N	2022-03-20 16:29:02.077648+00	1
35a41036-d559-490d-8022-8bf07dd749d0	585ae64a4ae915dd27d7e9b4bab8db3c9d7eac210f1c5e0b3841d364e19ba8eb	2022-03-20 16:29:02.098404+00	20211205224324_make_sex_optional	\N	\N	2022-03-20 16:29:02.091022+00	1
684d034d-fb48-4188-949b-d0733121aebf	d33c0959157c9c9ee0f4f542e7c10b431c95aa9724060f7a95d834e4fb05f623	2022-03-20 16:29:02.111719+00	20211205224945_make_birthday_string	\N	\N	2022-03-20 16:29:02.101386+00	1
8f28a888-7b5a-4e1d-9b22-b644ffc26291	5e7e4ca46a82fd08c5a37cf1d49907f42042456bcc3db1374e1718d830fae67c	2022-03-20 16:29:02.183327+00	20211207115100_dni_required	\N	\N	2022-03-20 16:29:02.176675+00	1
c910e1d6-680e-46da-b324-e66835169e14	ba690ff0674ac7ac4f3ddb761d95632883aafae0229137f1d402c249f87dd3d4	2022-03-20 16:29:02.12367+00	20211206144216_add_barrio_enum	\N	\N	2022-03-20 16:29:02.115323+00	1
7883faa4-c561-4de5-8c30-5261af2af0de	4a5ab483e8b0a1171449adc1e44feafd6eb9a9baf49c6c6040264949c625c4bf	2022-03-20 16:29:02.133392+00	20211206144435_neighborhood_remain	\N	\N	2022-03-20 16:29:02.125401+00	1
800ad1e9-a5cb-45e4-8a02-c1ab7e73124a	451a2d8315be3267914e89ec8ee0efc93e88befd6bf276cc9bb9c1431a5a1b35	2022-03-20 16:29:02.30252+00	20220125110154_add	\N	\N	2022-03-20 16:29:02.292481+00	1
44c65544-c4e6-47e6-b081-9d542623d29a	e33f34415a4918a06ceb45b5464e44e92aa0175434299832611853a52079a3ef	2022-03-20 16:29:02.139814+00	20211206144516_neighborhood_rename	\N	\N	2022-03-20 16:29:02.135206+00	1
d2e2710d-c95d-459c-855f-c728dd0797aa	85b8e3ca695d90a5fa23ba19f1f994215e9c3377f5447ed1db6b123778d0c450	2022-03-20 16:29:02.190042+00	20211207115328_whatsapp_required	\N	\N	2022-03-20 16:29:02.185145+00	1
24e1edbf-4281-4001-a15f-b9e802c96ed6	09f2f54cc1e2d73bfe8f3237d9f8ee313df3f2c42ca227f41425dbd93deaa578	2022-03-20 16:29:02.151429+00	20211206144749_neighborhood_enum_change	\N	\N	2022-03-20 16:29:02.141438+00	1
3b742c66-0207-4151-b211-c38ade62f195	4d09f3f99e0834388debafa1c003a4fee0710519e5902ec70d8e8737537f7556	2022-03-20 16:29:02.256445+00	20211227193828_add_school_email	\N	\N	2022-03-20 16:29:02.25173+00	1
9c11c771-23f3-4dbe-aea4-46e04b9e821b	fa6611de10a326a708774f6b2697f0e55f0c4b8e9d6f05105a6ccd21795cc33a	2022-03-20 16:29:02.201583+00	20211207154401_certificado_string	\N	\N	2022-03-20 16:29:02.191413+00	1
1a65a256-bf84-4aca-9531-8209e14cf750	2d261b04290c4d23f8903015c4b563f94a03dc65c10d94f34d6615a410749c3d	2022-03-20 16:29:02.223203+00	20211208121045_add_programs	\N	\N	2022-03-20 16:29:02.203723+00	1
c44c0c1b-0eb8-45e4-b8e2-178de474f43e	4d5255293c1110db40a9551f15f65c2004ccb448303d8316c200de8fbc936650	2022-03-20 16:29:02.266174+00	20211230092634_add	\N	\N	2022-03-20 16:29:02.258026+00	1
ee6ab694-a45f-4474-a452-c80a1369661d	82f7e59fefb06043c0fa8654e58488873006c2834b07e249a3d5aa59f3e0d975	2022-03-20 16:29:02.231676+00	20211208124052_add_program_year	\N	\N	2022-03-20 16:29:02.224794+00	1
741170aa-500a-425d-a715-384d6894b80f	0b406fa8d7f2e252df15c67779151108eb90a4bfb83595000fc49f6f3125d46d	2022-03-20 16:29:02.238474+00	20211208195504_remove_user_from_days	\N	\N	2022-03-20 16:29:02.233136+00	1
9dd63c82-6d33-42f9-a7e1-108ab6ca7634	395af60a42b6fee8dbb715bc162736e6d53264fd3b1ec5a9a3e2a1cc47dba68b	2022-03-20 16:29:02.335655+00	20220228224720_add	\N	\N	2022-03-20 16:29:02.330488+00	1
55fdf5ea-14d9-4caf-b502-cd65627d90ff	b1ed3f9b84ecc6710683c6930d3d98e14b238b9d4ecbd5036cdd91e26b02c74d	2022-03-20 16:29:02.273199+00	20211230103817_add	\N	\N	2022-03-20 16:29:02.267981+00	1
eecea3e3-150f-4268-bc73-512894730be8	62f7e77cd8afd89b92cc3437b2f0212b6c2c45be36eba8ea84592bb3de51c6cf	2022-03-20 16:29:02.312127+00	20220125113458_add	\N	\N	2022-03-20 16:29:02.305128+00	1
e0c5d9b0-f736-48ea-b062-0c8ff70d8887	01d516b609c6c795ba332c08179330777f07036a009c84976ae1afb233b00a63	2022-03-20 16:29:02.282912+00	20211230104228_add	\N	\N	2022-03-20 16:29:02.274901+00	1
308fcebc-7332-4646-a9ac-1beec6ccd044	dc8396b71b1ba9c6c55aee3dc28825e40e0a52d0de8fec1cbed662ae0f77bdc5	2022-03-20 16:29:02.290635+00	20220122125631_add	\N	\N	2022-03-20 16:29:02.285234+00	1
a06f65e6-9f8f-4f22-8544-5b573ad054a7	243354aa91b6241aaf58e88c2f6b941640837e6c4d27b1101b2adfc277f99bf3	2022-03-20 16:29:02.3201+00	20220228214809_add	\N	\N	2022-03-20 16:29:02.315118+00	1
d261b07c-26c5-4022-bd5d-1574e67316e3	2356f8788897cf853046f1276a1f609ec530936bc79d86d6d58aaa3ae30eb010	2022-03-20 16:29:02.3535+00	20220305104423_add	\N	\N	2022-03-20 16:29:02.344103+00	1
99bdeac8-be08-4342-8553-edd512084e66	f61aeacefad9063f011e3317a383d9832dc3afc52ed616a81e971f277ea49e64	2022-03-20 16:29:02.327671+00	20220228224045_add	\N	\N	2022-03-20 16:29:02.321668+00	1
974affa3-ff49-456e-b16d-65b9331bb3f6	44bc5da73e6cfe33b9ced93433d366fe44a6e3e6b9a22c834375e7a4ea2a4f47	2022-03-20 16:29:02.342234+00	20220305101057_add	\N	\N	2022-03-20 16:29:02.337168+00	1
48037c58-5f91-4242-a1f2-708c65be33aa	df8c0ae0c6cc5ba7a0c736ba81ca8280e3a9c69d8d2ce431987e37523bd33c8f	2022-03-20 16:29:02.369899+00	20220305115731_add	\N	\N	2022-03-20 16:29:02.364232+00	1
cf581720-f6af-4911-9c2f-c89646d3083a	ffcdb000217dd9ec93262ac5485ffe9138fb316dc74ff792f69dd556df0e3f77	2022-03-20 16:29:02.376646+00	20220305131214_add	\N	\N	2022-03-20 16:29:02.371512+00	1
dcb0d305-9db2-489e-aa2b-0358c02e400b	b81bc0d091567f43475cfdaf0bd55e8b3c39621d82c80125897b77cbd739d1a1	2022-03-20 16:29:02.38485+00	20220305165904_add_was_ever_active	\N	\N	2022-03-20 16:29:02.37864+00	1
3742358d-1aab-4122-9a26-bc6707b4f978	393726f50f328666d288b871c14bc478e88590f4eb92eab79d2ef07b3873099d	2022-03-20 16:29:02.395004+00	20220306213909_remove_other_sex	\N	\N	2022-03-20 16:29:02.386143+00	1
b2dd0b15-4d82-4104-b64a-5fd026306995	5f34e812a59cd7e058656cbc8d739acaf7eb506223785d87ac4923f693d10d50	2022-03-20 16:29:02.404813+00	20220307175004_add_status	\N	\N	2022-03-20 16:29:02.397867+00	1
70c75003-cab0-42da-bd90-0fcfd3870b6e	0563f40d1d325a5e216f717ad1389ceaed77f40e1595d574d5138b90b8944907	2022-03-27 17:45:32.709907+00	20220327174532_change_commitment_schema	\N	\N	2022-03-27 17:45:32.701182+00	1
b8149d44-cfde-4518-9dae-28b57c0e8742	72b091f790e24029b8877a634aa1f46c24f7695ea3424787bd12599d10bf2778	2022-03-20 16:29:02.413276+00	20220307175042_remove_participant_active	\N	\N	2022-03-20 16:29:02.406367+00	1
6cc1236c-18a8-4766-a46c-b1a9960afcc6	36b50a294195693479d1ca2928835a3f3acf79b89868b7a4d8da1eb3c7282b69	2022-03-22 11:31:45.676532+00	20220322113145_add_timezone_to_user	\N	\N	2022-03-22 11:31:45.667992+00	1
3993a89a-6790-4090-8a33-249855d3ad1b	f96ecb588a1d881336355e9b80c1e0ee7cde22a3cb6f3bcc5f23c99c19d54381	2022-03-20 16:29:02.423075+00	20220307183504_update_user_schema	\N	\N	2022-03-20 16:29:02.415543+00	1
8fdd96a4-37a6-4b5f-98b2-c33278227643	ea20347b647ebc1e44993e41b521b11eb54593529e8c741c85ec49bbe99dec39	2022-03-20 16:29:02.431218+00	20220307183515_update_user_schema	\N	\N	2022-03-20 16:29:02.424883+00	1
65b1762a-bfb4-426b-8aaa-3230bd1e247a	d05449d441f5f1e10b9fcc5c0a59288aa94d7930454abcaf2db101a745615c42	2022-03-20 16:29:02.43786+00	20220307224044_add_skype_to_user	\N	\N	2022-03-20 16:29:02.433337+00	1
5f7b1b79-fac9-4f17-b392-70ecb83ed730	bd04123b8868ec8fe0ea7707c53fe327f244150961565328595f43f0221c4249	2022-03-22 18:10:33.522787+00	20220322181033_change_diary_to_timestamp	\N	\N	2022-03-22 18:10:33.5084+00	1
66bd19c2-d839-4043-94b8-463acf6bc9e4	f524c47b9f932ef6a7ddae6681268a9c51a38249b7cccdec811ded58ee6f1b1a	2022-03-20 16:29:02.449673+00	20220312230730_add_classes	\N	\N	2022-03-20 16:29:02.439285+00	1
06595edf-1c0e-4638-b44c-47d19bd3de3e	adacbd864c3c79d9c85e8ed925cab79349946281442ed1ddaf8755cb1784816c	2022-03-20 16:29:02.461488+00	20220313002828_update_waiting_list_order	\N	\N	2022-03-20 16:29:02.451458+00	1
54686438-1c30-4a28-82ef-e2621bd1806d	4238f6572003589b08e9717350b89eb91aea5f16c5dc6293f99203c13ae65445	2022-03-20 16:29:02.473041+00	20220313183124_update_class_date_to_string	\N	\N	2022-03-20 16:29:02.464198+00	1
ed98957a-961f-4a3f-b5a9-5b5cbfeb584c	98408e1e255ee4b4f440a2e09fc669b819fcca10ec0a20d9d3ec2b82af97291e	2022-03-22 21:56:18.596183+00	20220322215618_create_diary_program	\N	\N	2022-03-22 21:56:18.577574+00	1
f9aa6c96-47cb-49c0-82d7-1c7ef1920c2c	5aafe8d3d8041e55a4c9edc0fed2e7359b1c45b53e8653ec84b8b0ac66b37309	2022-03-20 16:29:02.48208+00	20220313185148_add_cascades	\N	\N	2022-03-20 16:29:02.474554+00	1
04e4d4da-3dbc-4c44-8eaf-88d317ee1955	7be5c322a7ce19a1eda11ad6312a8faee815bbeb220bf4eb65cd38b0cde63303	2022-03-20 16:29:02.488525+00	20220313185627_update_class_string_to_date	\N	\N	2022-03-20 16:29:02.483699+00	1
b1333da1-c065-4297-a011-198246801ddd	838de9324292dc850907199410729593ab09dfdd3380440b0c75d08d21193e84	2022-03-28 17:16:03.746902+00	20220328171603_change_typo	\N	\N	2022-03-28 17:16:03.738909+00	1
1e86507b-7759-4b23-b59d-c970f1b1065e	cf7601616edda6176fda4de40b16c8e56e846a1c01c2982612502de5843bf0f2	2022-03-20 16:29:02.501462+00	20220320160230_add_participant_diary	\N	\N	2022-03-20 16:29:02.490351+00	1
f07489da-6139-4b38-a6ca-95e2cb14a794	c19adf56eb955d420cc70cdf235165a8bb07aff4fc2fee05cbfde188b292a4f1	2022-03-23 22:30:48.763322+00	20220323223048_make_dni_unique	\N	\N	2022-03-23 22:30:48.752522+00	1
c85d2be0-a7e8-4d08-95c7-952628667731	40a68eb8cc4d656071e78a7ae8d7bbba74821d649e49cd006a68f39e2d7b4603	2022-03-20 18:29:47.161873+00	20220320182946_add_cascade	\N	\N	2022-03-20 18:29:47.152184+00	1
959d90c1-480a-45d6-b8ab-361b91a441f5	5ac368ec69a4f016d5bd85fb532744ec3463734bbf2a8c426e584ff1e91bb59a	2022-03-20 22:26:50.425371+00	20220320222650_change_date	\N	\N	2022-03-20 22:26:50.412374+00	1
babfe31e-25a2-4c9f-9e61-6f2055e4e42f	80ebcbca31bbe462d2b367950a90fadacc6dce8f94903b0f70738c7a37dac12f	2022-03-21 19:21:20.499822+00	20220321192120_add_auto_event	\N	\N	2022-03-21 19:21:20.491858+00	1
7ae27f68-2c6a-4c2a-a71a-2cc3911465f0	4e0147fa3027e9c74dd044e4afd15e3990b1fd4b7f48ae5fb9498a19fef548ab	2022-03-23 22:55:22.935637+00	20220323225335_add_indexes	\N	\N	2022-03-23 22:55:22.907929+00	1
c465ccc4-31a3-4e94-8160-dde3fa08c1bc	13b0b16681b3dc1164bb847cafe83e7430c192eae0453da29809eb8bbd414843	2022-03-26 10:32:12.879763+00	20220326103212_add_was_ever_active_to_year_status	\N	\N	2022-03-26 10:32:12.853618+00	1
6e80d013-cd76-48a9-b112-b7b126fded37	1b6fd16c854c18d1492ef5068d15e3eacfbe11f266f6bfcb063a2c62c2bae7d4	2022-04-03 16:24:34.640869+00	20220403162434_create_usser_diary	\N	\N	2022-04-03 16:24:34.616612+00	1
d2f44dc6-b74a-486c-b70d-0ba3b5f6dd80	904f0b5a1e7b2349b9eea6fb64d67e8799a0b71097de1e339cc1bba0fc92790e	2022-03-27 11:36:54.658993+00	20220327113654_add_commitment	\N	\N	2022-03-27 11:36:54.645245+00	1
e709805a-eaaf-4406-8e3d-d3a44a6b75e1	2d4652597f5effa809c99a619921e7d0ba1fbd7bc745be0209b2c725f5d9db52	2022-03-27 15:49:17.297998+00	20220327154917_change_commitment_schema	\N	\N	2022-03-27 15:49:17.29015+00	1
78303fb9-e9b8-471c-9480-78026205dffb	e1dda13a7ff5388190b07dfc2b24a2d903fc1367ff798fb8f21a9f0cefba9d42	2022-04-12 11:20:49.035356+00	20220412112048_add_on_delete_cascade2	\N	\N	2022-04-12 11:20:49.028488+00	1
668cfe2d-e6bd-4652-9382-3038974f4166	6343bb31581b9aa6662a798767459aed1db2b21681cde5f449da8bc4ef5565c6	2022-04-03 18:21:46.595566+00	20220403182146_add_invited_to_user_diary_status	\N	\N	2022-04-03 18:21:46.58795+00	1
7f2426b8-4da0-4593-9a6a-01179ac58a1e	b0fa46961000c1cb5b81f17c748586cfe824a82d119f7e7f0a187d83ec34aa78	2022-04-12 10:41:24.580614+00	20220412104124_add_default_date_to_diaries	\N	\N	2022-04-12 10:41:24.571084+00	1
c24f95ad-d87b-4319-9c89-285835a9ed7b	4c5cacf6eeca47e2bbbe422d9f27f437352c613e39acb02b9a48d62d547d11e9	2022-04-12 11:11:46.773638+00	20220412111146_add_on_delete_cascade	\N	\N	2022-04-12 11:11:46.760254+00	1
\.


--
-- Name: Class_id_seq; Type: SEQUENCE SET; Schema: public; Owner: desafio
--

SELECT pg_catalog.setval('public."Class_id_seq"', 4, true);


--
-- Name: ParticipantDiary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: desafio
--

SELECT pg_catalog.setval('public."ParticipantDiary_id_seq"', 193, true);


--
-- Name: Participant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: desafio
--

SELECT pg_catalog.setval('public."Participant_id_seq"', 7, true);


--
-- Name: ProgramDays_id_seq; Type: SEQUENCE SET; Schema: public; Owner: desafio
--

SELECT pg_catalog.setval('public."ProgramDays_id_seq"', 14, true);


--
-- Name: ProgramDiary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: desafio
--

SELECT pg_catalog.setval('public."ProgramDiary_id_seq"', 2, true);


--
-- Name: Program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: desafio
--

SELECT pg_catalog.setval('public."Program_id_seq"', 8, true);


--
-- Name: School_id_seq; Type: SEQUENCE SET; Schema: public; Owner: desafio
--

SELECT pg_catalog.setval('public."School_id_seq"', 1, true);


--
-- Name: UserDiary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: desafio
--

SELECT pg_catalog.setval('public."UserDiary_id_seq"', 15, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: desafio
--

SELECT pg_catalog.setval('public."User_id_seq"', 3, true);


--
-- Name: Class Class_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."Class"
    ADD CONSTRAINT "Class_pkey" PRIMARY KEY (id);


--
-- Name: ParticipantCommitment ParticipantCommitment_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantCommitment"
    ADD CONSTRAINT "ParticipantCommitment_pkey" PRIMARY KEY (year, "participantId");


--
-- Name: ParticipantDiaryPrograms ParticipantDiaryPrograms_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantDiaryPrograms"
    ADD CONSTRAINT "ParticipantDiaryPrograms_pkey" PRIMARY KEY ("participantDiaryId", "programId");


--
-- Name: ParticipantDiary ParticipantDiary_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantDiary"
    ADD CONSTRAINT "ParticipantDiary_pkey" PRIMARY KEY (id);


--
-- Name: ParticipantHealth ParticipantHealth_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantHealth"
    ADD CONSTRAINT "ParticipantHealth_pkey" PRIMARY KEY ("participantId");


--
-- Name: ParticipantStatus ParticipantStatus_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantStatus"
    ADD CONSTRAINT "ParticipantStatus_pkey" PRIMARY KEY (year, "participantId");


--
-- Name: Participant Participant_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."Participant"
    ADD CONSTRAINT "Participant_pkey" PRIMARY KEY (id);


--
-- Name: ParticipantsOnClasses ParticipantsOnClasses_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantsOnClasses"
    ADD CONSTRAINT "ParticipantsOnClasses_pkey" PRIMARY KEY ("classId", "participantId");


--
-- Name: ParticipantsOnPrograms ParticipantsOnPrograms_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantsOnPrograms"
    ADD CONSTRAINT "ParticipantsOnPrograms_pkey" PRIMARY KEY ("programId", "participantId");


--
-- Name: ProgramDays ProgramDays_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ProgramDays"
    ADD CONSTRAINT "ProgramDays_pkey" PRIMARY KEY (id);


--
-- Name: ProgramDiaryParticipants ProgramDiaryParticipants_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ProgramDiaryParticipants"
    ADD CONSTRAINT "ProgramDiaryParticipants_pkey" PRIMARY KEY ("programDiaryId", "participantId");


--
-- Name: ProgramDiary ProgramDiary_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ProgramDiary"
    ADD CONSTRAINT "ProgramDiary_pkey" PRIMARY KEY (id);


--
-- Name: Program Program_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."Program"
    ADD CONSTRAINT "Program_pkey" PRIMARY KEY (id);


--
-- Name: School School_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."School"
    ADD CONSTRAINT "School_pkey" PRIMARY KEY (id);


--
-- Name: SurveyBiography SurveyBiography_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."SurveyBiography"
    ADD CONSTRAINT "SurveyBiography_pkey" PRIMARY KEY ("participantId");


--
-- Name: UserDiaryPrograms UserDiaryPrograms_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."UserDiaryPrograms"
    ADD CONSTRAINT "UserDiaryPrograms_pkey" PRIMARY KEY ("userDiaryId", "programId");


--
-- Name: UserDiary UserDiary_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."UserDiary"
    ADD CONSTRAINT "UserDiary_pkey" PRIMARY KEY (id);


--
-- Name: UserRoles UserRoles_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."UserRoles"
    ADD CONSTRAINT "UserRoles_pkey" PRIMARY KEY ("userId", role);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: UsersOnPrograms UsersOnPrograms_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."UsersOnPrograms"
    ADD CONSTRAINT "UsersOnPrograms_pkey" PRIMARY KEY ("userId", "programId");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Participant_dni_key; Type: INDEX; Schema: public; Owner: desafio
--

CREATE UNIQUE INDEX "Participant_dni_key" ON public."Participant" USING btree (dni);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: desafio
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: participant_dni_index; Type: INDEX; Schema: public; Owner: desafio
--

CREATE INDEX participant_dni_index ON public."Participant" USING gin (to_tsvector('spanish'::regconfig, dni));


--
-- Name: participant_firstname_index; Type: INDEX; Schema: public; Owner: desafio
--

CREATE INDEX participant_firstname_index ON public."Participant" USING gin (to_tsvector('spanish'::regconfig, "firstName"));


--
-- Name: participant_lastname_index; Type: INDEX; Schema: public; Owner: desafio
--

CREATE INDEX participant_lastname_index ON public."Participant" USING gin (to_tsvector('spanish'::regconfig, "lastName"));


--
-- Name: program_name_index; Type: INDEX; Schema: public; Owner: desafio
--

CREATE INDEX program_name_index ON public."Program" USING gin (to_tsvector('spanish'::regconfig, name));


--
-- Name: school_name_index; Type: INDEX; Schema: public; Owner: desafio
--

CREATE INDEX school_name_index ON public."School" USING gin (to_tsvector('spanish'::regconfig, name));


--
-- Name: user_firstname_index; Type: INDEX; Schema: public; Owner: desafio
--

CREATE INDEX user_firstname_index ON public."User" USING gin (to_tsvector('spanish'::regconfig, "firstName"));


--
-- Name: user_lastname_index; Type: INDEX; Schema: public; Owner: desafio
--

CREATE INDEX user_lastname_index ON public."User" USING gin (to_tsvector('spanish'::regconfig, "lastName"));


--
-- Name: Class Class_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."Class"
    ADD CONSTRAINT "Class_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Class Class_programId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."Class"
    ADD CONSTRAINT "Class_programId_fkey" FOREIGN KEY ("programId") REFERENCES public."Program"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Class Class_updatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."Class"
    ADD CONSTRAINT "Class_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ParticipantCommitment ParticipantCommitment_participantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantCommitment"
    ADD CONSTRAINT "ParticipantCommitment_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES public."Participant"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ParticipantDiaryPrograms ParticipantDiaryPrograms_participantDiaryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantDiaryPrograms"
    ADD CONSTRAINT "ParticipantDiaryPrograms_participantDiaryId_fkey" FOREIGN KEY ("participantDiaryId") REFERENCES public."ParticipantDiary"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ParticipantDiaryPrograms ParticipantDiaryPrograms_programId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantDiaryPrograms"
    ADD CONSTRAINT "ParticipantDiaryPrograms_programId_fkey" FOREIGN KEY ("programId") REFERENCES public."Program"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ParticipantDiary ParticipantDiary_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantDiary"
    ADD CONSTRAINT "ParticipantDiary_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ParticipantDiary ParticipantDiary_participantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantDiary"
    ADD CONSTRAINT "ParticipantDiary_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES public."Participant"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ParticipantDiary ParticipantDiary_updatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantDiary"
    ADD CONSTRAINT "ParticipantDiary_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ParticipantHealth ParticipantHealth_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantHealth"
    ADD CONSTRAINT "ParticipantHealth_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ParticipantHealth ParticipantHealth_participantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantHealth"
    ADD CONSTRAINT "ParticipantHealth_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES public."Participant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ParticipantHealth ParticipantHealth_updatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantHealth"
    ADD CONSTRAINT "ParticipantHealth_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ParticipantStatus ParticipantStatus_participantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantStatus"
    ADD CONSTRAINT "ParticipantStatus_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES public."Participant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Participant Participant_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."Participant"
    ADD CONSTRAINT "Participant_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Participant Participant_schoolId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."Participant"
    ADD CONSTRAINT "Participant_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES public."School"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Participant Participant_updatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."Participant"
    ADD CONSTRAINT "Participant_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ParticipantsOnClasses ParticipantsOnClasses_classId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantsOnClasses"
    ADD CONSTRAINT "ParticipantsOnClasses_classId_fkey" FOREIGN KEY ("classId") REFERENCES public."Class"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ParticipantsOnClasses ParticipantsOnClasses_participantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantsOnClasses"
    ADD CONSTRAINT "ParticipantsOnClasses_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES public."Participant"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ParticipantsOnPrograms ParticipantsOnPrograms_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantsOnPrograms"
    ADD CONSTRAINT "ParticipantsOnPrograms_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ParticipantsOnPrograms ParticipantsOnPrograms_participantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantsOnPrograms"
    ADD CONSTRAINT "ParticipantsOnPrograms_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES public."Participant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ParticipantsOnPrograms ParticipantsOnPrograms_programId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantsOnPrograms"
    ADD CONSTRAINT "ParticipantsOnPrograms_programId_fkey" FOREIGN KEY ("programId") REFERENCES public."Program"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ParticipantsOnPrograms ParticipantsOnPrograms_updatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ParticipantsOnPrograms"
    ADD CONSTRAINT "ParticipantsOnPrograms_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProgramDays ProgramDays_programId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ProgramDays"
    ADD CONSTRAINT "ProgramDays_programId_fkey" FOREIGN KEY ("programId") REFERENCES public."Program"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProgramDiaryParticipants ProgramDiaryParticipants_participantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ProgramDiaryParticipants"
    ADD CONSTRAINT "ProgramDiaryParticipants_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES public."Participant"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProgramDiaryParticipants ProgramDiaryParticipants_programDiaryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ProgramDiaryParticipants"
    ADD CONSTRAINT "ProgramDiaryParticipants_programDiaryId_fkey" FOREIGN KEY ("programDiaryId") REFERENCES public."ProgramDiary"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProgramDiary ProgramDiary_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ProgramDiary"
    ADD CONSTRAINT "ProgramDiary_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProgramDiary ProgramDiary_programId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ProgramDiary"
    ADD CONSTRAINT "ProgramDiary_programId_fkey" FOREIGN KEY ("programId") REFERENCES public."Program"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProgramDiary ProgramDiary_updatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."ProgramDiary"
    ADD CONSTRAINT "ProgramDiary_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Program Program_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."Program"
    ADD CONSTRAINT "Program_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Program Program_updatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."Program"
    ADD CONSTRAINT "Program_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: School School_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."School"
    ADD CONSTRAINT "School_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: School School_updatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."School"
    ADD CONSTRAINT "School_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SurveyBiography SurveyBiography_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."SurveyBiography"
    ADD CONSTRAINT "SurveyBiography_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SurveyBiography SurveyBiography_participantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."SurveyBiography"
    ADD CONSTRAINT "SurveyBiography_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES public."Participant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SurveyBiography SurveyBiography_updatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."SurveyBiography"
    ADD CONSTRAINT "SurveyBiography_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserDiaryPrograms UserDiaryPrograms_programId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."UserDiaryPrograms"
    ADD CONSTRAINT "UserDiaryPrograms_programId_fkey" FOREIGN KEY ("programId") REFERENCES public."Program"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserDiaryPrograms UserDiaryPrograms_userDiaryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."UserDiaryPrograms"
    ADD CONSTRAINT "UserDiaryPrograms_userDiaryId_fkey" FOREIGN KEY ("userDiaryId") REFERENCES public."UserDiary"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserDiary UserDiary_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."UserDiary"
    ADD CONSTRAINT "UserDiary_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserDiary UserDiary_updatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."UserDiary"
    ADD CONSTRAINT "UserDiary_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserDiary UserDiary_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."UserDiary"
    ADD CONSTRAINT "UserDiary_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserRoles UserRoles_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."UserRoles"
    ADD CONSTRAINT "UserRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UsersOnPrograms UsersOnPrograms_programId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."UsersOnPrograms"
    ADD CONSTRAINT "UsersOnPrograms_programId_fkey" FOREIGN KEY ("programId") REFERENCES public."Program"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UsersOnPrograms UsersOnPrograms_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desafio
--

ALTER TABLE ONLY public."UsersOnPrograms"
    ADD CONSTRAINT "UsersOnPrograms_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

