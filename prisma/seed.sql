--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Debian 14.4-1.pgdg110+1)
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

--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."User" (id, email, "createdAt", "updatedAt", status, address, biography, birthday, city, facebook, "firstName", "lastName", linkedin, phone1, phone2, picture, twitter, skype, timezone) VALUES (1, 'lucas.curti@eldesafio.org', '2022-03-20 16:37:05.191985+00', '2022-03-28 17:37:13.683822+00', 'ACTIVE', NULL, NULL, '1981-09-02', NULL, NULL, 'Lucas', 'Curti', NULL, NULL, NULL, 'https://res.cloudinary.com/eldesafio/image/upload/v1648489029/blz1hhfcdsgtmvhdidbj.jpg', NULL, NULL, 'Europe/Madrid');
INSERT INTO public."User" (id, email, "createdAt", "updatedAt", status, address, biography, birthday, city, facebook, "firstName", "lastName", linkedin, phone1, phone2, picture, twitter, skype, timezone) VALUES (2, 'esther@mail.com.bla.bla', '2022-03-20 16:42:16.041+00', '2022-03-28 17:38:01.167156+00', 'ACTIVE', NULL, NULL, '2000-09-09', NULL, NULL, 'Esther', 'Piscore', NULL, NULL, NULL, 'https://res.cloudinary.com/eldesafio/image/upload/v1648489075/iwgf6srbsjvh6cuscmhd.jpg', NULL, NULL, 'America/Argentina/Buenos_Aires');
INSERT INTO public."User" (id, email, "createdAt", "updatedAt", status, address, biography, birthday, city, facebook, "firstName", "lastName", linkedin, phone1, phone2, picture, twitter, skype, timezone) VALUES (3, 'efren@mail.bla.bla', '2022-03-20 16:43:00.314+00', '2022-04-12 12:03:05.827119+00', 'INVITED', NULL, NULL, '1999-08-08', NULL, NULL, 'Efren', 'Salonga', NULL, NULL, NULL, NULL, NULL, NULL, 'America/Argentina/Buenos_Aires');


--
-- Data for Name: Program; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."Program" (id, name, description, seats, "ageFrom", "ageTo", "ageByYear", sex, "createdBy", "updatedBy", "createdAt", "updatedAt", year) VALUES (1, '⚽️ Futbol', '', 4, 10, 22, false, 'MALE', 1, 1, '2022-03-20 16:41:36.356+00', '2022-03-20 16:43:47.19883+00', 2022);
INSERT INTO public."Program" (id, name, description, seats, "ageFrom", "ageTo", "ageByYear", sex, "createdBy", "updatedBy", "createdAt", "updatedAt", year) VALUES (2, '🏑 Hockey', '', 4, 10, 22, false, 'ALL', 1, 1, '2022-03-20 16:44:25.781+00', '2022-03-20 16:44:25.781+00', 2022);
INSERT INTO public."Program" (id, name, description, seats, "ageFrom", "ageTo", "ageByYear", sex, "createdBy", "updatedBy", "createdAt", "updatedAt", year) VALUES (4, '🎨 Arte', '', 4, 10, 20, false, 'ALL', 1, 1, '2022-03-26 10:51:35.372+00', '2022-03-26 10:51:35.372+00', 2021);
INSERT INTO public."Program" (id, name, description, seats, "ageFrom", "ageTo", "ageByYear", sex, "createdBy", "updatedBy", "createdAt", "updatedAt", year) VALUES (3, '📸 Fotografía', '', 4, 10, 22, false, 'ALL', 1, 1, '2022-03-20 16:45:04.246+00', '2022-04-12 10:49:55.16246+00', 2022);
INSERT INTO public."Program" (id, name, description, seats, "ageFrom", "ageTo", "ageByYear", sex, "createdBy", "updatedBy", "createdAt", "updatedAt", year) VALUES (8, '🪂 Paracaidismo', '', 4, 10, 20, false, 'ALL', 1, 1, '2022-04-12 11:29:45.779+00', '2022-04-12 11:29:45.779+00', 2022);


--
-- Data for Name: Class; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."Class" (id, "programId", "isRainyDay", "createdAt", "updatedAt", "createdBy", "updatedBy", date) VALUES (1, 3, true, '2022-03-22 07:58:36.551+00', '2022-03-22 07:58:36.551+00', 1, 1, '2022-03-01');
INSERT INTO public."Class" (id, "programId", "isRainyDay", "createdAt", "updatedAt", "createdBy", "updatedBy", date) VALUES (2, 1, false, '2022-03-22 07:59:07.44+00', '2022-03-22 07:59:07.44+00', 1, 1, '2022-03-01');
INSERT INTO public."Class" (id, "programId", "isRainyDay", "createdAt", "updatedAt", "createdBy", "updatedBy", date) VALUES (3, 1, false, '2022-03-28 07:13:22.826+00', '2022-03-28 07:13:22.826+00', 1, 1, '2022-03-28');
INSERT INTO public."Class" (id, "programId", "isRainyDay", "createdAt", "updatedAt", "createdBy", "updatedBy", date) VALUES (4, 3, true, '2022-08-18 15:55:08.839+00', '2022-08-18 15:55:08.839+00', 1, 1, '2022-08-18');


--
-- Data for Name: School; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."School" (id, name, address, city, phone, "principalName", "principalPhone", "vicePrincipalName", "vicePrincipalPhone", "createdAt", "updatedAt", "createdBy", "updatedBy", email) VALUES (1, 'Normal 2', 'Córdoba 1111', 'Rosario', '345345345', 'Carlos Perciavale', '2345345', 'Norma Pons', '3456567', '2022-03-24 23:31:01.178+00', '2022-03-28 20:32:44.151314+00', 1, 1, 'normal@normal.school.bla');


--
-- Data for Name: Participant; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."Participant" (id, "createdAt", "updatedAt", address, city, "createdBy", dni, "firstName", "healthCertificateDate", "lastName", "medicalInsurance", picture, "presentedDNI", "presentedHealthCertificate", "updatedBy", sex, birthday, neighborhood, email, phone1, "phone1BelongsTo", "phone1HasWhatsapp", phone2, "phone2BelongsTo", "phone2HasWhatsapp", biography, "notSchooled", "schoolYear", "schoolId") VALUES (5, '2022-03-20 16:40:36.839+00', '2022-09-03 22:07:26.158935+00', '', '', 1, '28474903', 'Fabiana', NULL, 'Cantilo', '', 'https://res.cloudinary.com/eldesafio/image/upload/v1647794422/hj99uuodi2inwmeh3bzc.webp', false, false, 1, 'FEMALE', '2012-09-09', NULL, 'fabiana@cantilo.fake', '', NULL, false, '', NULL, false, '', false, NULL, NULL);
INSERT INTO public."Participant" (id, "createdAt", "updatedAt", address, city, "createdBy", dni, "firstName", "healthCertificateDate", "lastName", "medicalInsurance", picture, "presentedDNI", "presentedHealthCertificate", "updatedBy", sex, birthday, neighborhood, email, phone1, "phone1BelongsTo", "phone1HasWhatsapp", phone2, "phone2BelongsTo", "phone2HasWhatsapp", biography, "notSchooled", "schoolYear", "schoolId") VALUES (1, '2022-03-20 16:38:36.335+00', '2022-09-03 22:07:33.916319+00', '', '', 1, '58367293', 'Charly', '2022-03-27', 'Garcia', '', 'https://res.cloudinary.com/eldesafio/image/upload/v1647794300/cb3zyeyooushfzdcctea.jpg', true, true, 1, 'MALE', '2010-08-29', NULL, 'charly@garcia.fake', '', NULL, false, '', NULL, false, '', false, NULL, NULL);
INSERT INTO public."Participant" (id, "createdAt", "updatedAt", address, city, "createdBy", dni, "firstName", "healthCertificateDate", "lastName", "medicalInsurance", picture, "presentedDNI", "presentedHealthCertificate", "updatedBy", sex, birthday, neighborhood, email, phone1, "phone1BelongsTo", "phone1HasWhatsapp", phone2, "phone2BelongsTo", "phone2HasWhatsapp", biography, "notSchooled", "schoolYear", "schoolId") VALUES (2, '2022-03-20 16:39:02.062+00', '2022-09-03 22:32:37.191801+00', '', '', 1, '53453453', 'Fito', NULL, 'Paez', '', 'https://res.cloudinary.com/eldesafio/image/upload/v1647794329/wbu11sp5klejhmf4re7w.jpg', false, false, 1, 'MALE', '2011-07-22', NULL, 'fito@paez.fake', '', NULL, false, '', NULL, false, '', false, NULL, NULL);
INSERT INTO public."Participant" (id, "createdAt", "updatedAt", address, city, "createdBy", dni, "firstName", "healthCertificateDate", "lastName", "medicalInsurance", picture, "presentedDNI", "presentedHealthCertificate", "updatedBy", sex, birthday, neighborhood, email, phone1, "phone1BelongsTo", "phone1HasWhatsapp", phone2, "phone2BelongsTo", "phone2HasWhatsapp", biography, "notSchooled", "schoolYear", "schoolId") VALUES (6, '2022-03-20 16:41:05.735+00', '2022-09-03 22:33:05.904367+00', '', '', 1, '1232323', 'Freddie', NULL, 'Mercury', '', 'https://res.cloudinary.com/eldesafio/image/upload/v1647794449/f7ji6c98clx1tdrutiwc.jpg', false, false, 1, 'MALE', '2010-09-09', NULL, 'freddie@mercury.fake', '', NULL, false, '', NULL, false, '', false, NULL, NULL);
INSERT INTO public."Participant" (id, "createdAt", "updatedAt", address, city, "createdBy", dni, "firstName", "healthCertificateDate", "lastName", "medicalInsurance", picture, "presentedDNI", "presentedHealthCertificate", "updatedBy", sex, birthday, neighborhood, email, phone1, "phone1BelongsTo", "phone1HasWhatsapp", phone2, "phone2BelongsTo", "phone2HasWhatsapp", biography, "notSchooled", "schoolYear", "schoolId") VALUES (7, '2022-03-20 17:30:18.291+00', '2022-09-03 22:33:35.226217+00', '', '', 1, '4532234', 'Luis Alberto', NULL, 'Spinetta', '', 'https://res.cloudinary.com/eldesafio/image/upload/v1647797546/dnne4awdjkmkhx360ig4.webp', false, false, 1, 'MALE', '2010-10-10', NULL, 'luis@spinetta.fake', '', NULL, false, '', NULL, false, '', false, NULL, NULL);
INSERT INTO public."Participant" (id, "createdAt", "updatedAt", address, city, "createdBy", dni, "firstName", "healthCertificateDate", "lastName", "medicalInsurance", picture, "presentedDNI", "presentedHealthCertificate", "updatedBy", sex, birthday, neighborhood, email, phone1, "phone1BelongsTo", "phone1HasWhatsapp", phone2, "phone2BelongsTo", "phone2HasWhatsapp", biography, "notSchooled", "schoolYear", "schoolId") VALUES (3, '2022-03-20 16:39:44.593+00', '2022-09-03 22:33:54.579278+00', '', '', 1, '23453452', 'Pappo', NULL, 'Napolitano', '', 'https://res.cloudinary.com/eldesafio/image/upload/v1647794370/ulwgcnbkbutdn6gbyjtv.webp', false, false, 1, 'MALE', '2009-08-08', NULL, 'pappo@napolitano.fake', '', NULL, false, '', NULL, false, '', false, NULL, NULL);
INSERT INTO public."Participant" (id, "createdAt", "updatedAt", address, city, "createdBy", dni, "firstName", "healthCertificateDate", "lastName", "medicalInsurance", picture, "presentedDNI", "presentedHealthCertificate", "updatedBy", sex, birthday, neighborhood, email, phone1, "phone1BelongsTo", "phone1HasWhatsapp", phone2, "phone2BelongsTo", "phone2HasWhatsapp", biography, "notSchooled", "schoolYear", "schoolId") VALUES (4, '2022-03-20 16:40:09.674+00', '2022-09-03 22:34:04.816095+00', '', '', 1, '99838342', 'Patricia', NULL, 'Sosa', '', 'https://res.cloudinary.com/eldesafio/image/upload/v1647794394/vtm70ssjdyinmpxou7j1.jpg', false, false, 1, 'FEMALE', '2010-01-13', NULL, 'patricia@sosa.fake', '', NULL, false, '', NULL, false, '', false, NULL, NULL);


--
-- Data for Name: ParticipantCommitment; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."ParticipantCommitment" (year, "participantId", "aprilStatus", "aprilDescription", "mayStatus", "mayDescription", "juneStatus", "juneDescription", "julyStatus", "julyDescription", "augustStatus", "augustDescription", "septemberStatus", "septemberDescription", "octoberStatus", "octoberDescription", "novemberStatus", "novemberDescription", "commitmentDonation", "commitmentVolunteer", "decemberDescription", "decemberStatus") VALUES (2021, 1, true, 'zdcsdfsd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, true, false, NULL, NULL);
INSERT INTO public."ParticipantCommitment" (year, "participantId", "aprilStatus", "aprilDescription", "mayStatus", "mayDescription", "juneStatus", "juneDescription", "julyStatus", "julyDescription", "augustStatus", "augustDescription", "septemberStatus", "septemberDescription", "octoberStatus", "octoberDescription", "novemberStatus", "novemberDescription", "commitmentDonation", "commitmentVolunteer", "decemberDescription", "decemberStatus") VALUES (2022, 1, false, 'Donaron 100 pesos', true, 'mayo dfrgdfg', false, 'sdfsdf', false, 'sdfsdf', false, 'af', false, 'sep', false, 'oct', true, 'nobv', true, true, 'dec', true);


--
-- Data for Name: ParticipantDiary; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (3, 1, 'INFO', 'Frustrado', 'Se frustra porque no puede meter goles', '2022-03-14 00:00:00+00', '2022-03-20 23:29:04.28+00', '2022-03-20 23:29:04.28+00', 1, 1, false);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (1, 1, 'INFO', 'Prueba 2', 'Esto es una prueba 2', '2022-03-20 00:00:00+00', '2022-03-20 18:24:17.269899+00', '2022-03-20 23:53:29.200237+00', 1, 1, false);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (4, 1, 'INFO', 'Prueba 3', 'Esto es una prueba', '2022-03-02 00:00:00+00', '2022-03-20 23:50:23.336+00', '2022-03-20 23:55:37.832607+00', 1, 1, false);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (5, 1, 'MENTORSHIP', 'Toca como un abuelo', '# Y es la verdad > tiene un trip en el bocho', '2022-03-01 00:00:00+00', '2022-03-21 00:00:31.005+00', '2022-03-21 00:00:31.005+00', 1, 1, false);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (57, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:30:59.777+00', '2022-03-22 07:30:59.777+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (58, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:31:02.479+00', '2022-03-22 07:31:02.479+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (59, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2022 fue cambiado a: espera', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:31:02.496+00', '2022-03-22 07:31:02.496+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (40, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-21 00:00:00+00', '2022-03-21 19:25:20.476+00', '2022-03-21 19:25:20.476+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (41, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2022 fue cambiado a: inactivo', NULL, '2022-03-21 00:00:00+00', '2022-03-21 19:25:20.505+00', '2022-03-21 19:25:20.505+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (42, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-21 00:00:00+00', '2022-03-21 19:25:51.208+00', '2022-03-21 19:25:51.208+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (43, 1, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2022 fue cambiado a: activo', NULL, '2022-03-21 00:00:00+00', '2022-03-21 19:25:51.238+00', '2022-03-21 19:25:51.238+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (44, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:28:45.069+00', '2022-03-22 07:28:45.069+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (45, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2022 fue cambiado a: espera', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:28:45.132+00', '2022-03-22 07:28:45.132+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (46, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:29:02.625+00', '2022-03-22 07:29:02.625+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (47, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2022 fue cambiado a: inactivo', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:29:02.663+00', '2022-03-22 07:29:02.663+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (48, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:29:11.779+00', '2022-03-22 07:29:11.779+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (49, 1, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2022 fue cambiado a: activo', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:29:11.8+00', '2022-03-22 07:29:11.8+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (50, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:30:27.756+00', '2022-03-22 07:30:27.756+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (51, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2022 fue cambiado a: inactivo', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:30:27.797+00', '2022-03-22 07:30:27.797+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (52, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:30:36.641+00', '2022-03-22 07:30:36.641+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (53, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2022 fue cambiado a: espera', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:30:36.668+00', '2022-03-22 07:30:36.668+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (54, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:30:46.416+00', '2022-03-22 07:30:46.416+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (55, 1, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2022 fue cambiado a: activo', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:30:46.443+00', '2022-03-22 07:30:46.443+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (56, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:30:52.585+00', '2022-03-22 07:30:52.585+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (60, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:48:04.06+00', '2022-03-22 07:48:04.06+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (61, 1, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2022 fue cambiado a: activo', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:48:04.122+00', '2022-03-22 07:48:04.122+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (62, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:56:38.546+00', '2022-03-22 07:56:38.546+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (63, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2022 fue cambiado a: espera', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:56:38.588+00', '2022-03-22 07:56:38.588+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (64, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:56:51.326+00', '2022-03-22 07:56:51.326+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (65, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:56:54.377+00', '2022-03-22 07:56:54.377+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (66, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2022 fue cambiado a: inactivo', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:56:54.407+00', '2022-03-22 07:56:54.407+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (67, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:58:20.3+00', '2022-03-22 07:58:20.3+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (68, 1, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2022 fue cambiado a: activo', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:58:20.327+00', '2022-03-22 07:58:20.327+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (69, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-22 00:00:00+00', '2022-03-22 07:58:52.757+00', '2022-03-22 07:58:52.757+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (71, 1, 'INFO', 'testing fecha 2', NULL, '2022-03-22 18:53:00+00', '2022-03-22 18:54:01.633+00', '2022-03-22 18:54:01.633+00', 1, 1, false);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (70, 1, 'INFO', 'Testing fecha', NULL, '2022-03-22 19:15:00+00', '2022-03-22 18:16:17.228+00', '2022-03-22 20:38:15.904885+00', 1, 1, false);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (72, 2, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-22 00:00:00+00', '2022-03-22 22:25:06.941+00', '2022-03-22 22:25:06.941+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (73, 2, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2022 fue cambiado a: activo', NULL, '2022-03-22 00:00:00+00', '2022-03-22 22:25:06.981+00', '2022-03-22 22:25:06.981+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (74, 7, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-22 00:00:00+00', '2022-03-22 22:25:16.812+00', '2022-03-22 22:25:16.812+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (75, 7, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2022 fue cambiado a: activo', NULL, '2022-03-22 00:00:00+00', '2022-03-22 22:25:16.84+00', '2022-03-22 22:25:16.84+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (2, 1, 'INFO', 'Ganamos! 😃', NULL, '2022-03-23 02:25:00+00', '2022-03-20 22:29:54.607+00', '2022-03-22 22:56:42.301232+00', 1, 1, false);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (76, 1, 'INFO', 'Evento de 2021', 'Un evento del año pasado', '2021-10-12 23:34:00+00', '2022-03-23 19:35:12.515+00', '2022-03-23 19:35:12.515+00', 1, 1, false);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (77, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:42:07.565+00', '2022-03-26 11:42:07.565+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (78, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2021 fue cambiado a: espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:42:07.614+00', '2022-03-26 11:42:07.614+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (79, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:42:58.012+00', '2022-03-26 11:42:58.012+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (80, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:42:58.042+00', '2022-03-26 11:42:58.042+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (81, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:47:27.002+00', '2022-03-26 11:47:27.002+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (82, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2021 fue cambiado a: espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:47:27.041+00', '2022-03-26 11:47:27.041+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (83, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:47:39.07+00', '2022-03-26 11:47:39.07+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (84, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:47:39.098+00', '2022-03-26 11:47:39.098+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (85, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:54:14.12+00', '2022-03-26 11:54:14.12+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (86, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2021 fue cambiado a: espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:54:14.155+00', '2022-03-26 11:54:14.155+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (87, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:54:30.603+00', '2022-03-26 11:54:30.603+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (88, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:54:30.657+00', '2022-03-26 11:54:30.657+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (89, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:55:52.392+00', '2022-03-26 11:55:52.392+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (90, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2021 fue cambiado a: espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:55:52.428+00', '2022-03-26 11:55:52.428+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (91, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:56:20.502+00', '2022-03-26 11:56:20.502+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (92, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:56:20.538+00', '2022-03-26 11:56:20.538+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (93, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:56:28.073+00', '2022-03-26 11:56:28.073+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (94, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2021 fue cambiado a: espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:56:28.093+00', '2022-03-26 11:56:28.093+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (95, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:56:32.811+00', '2022-03-26 11:56:32.811+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (96, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:56:32.835+00', '2022-03-26 11:56:32.835+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (97, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:58:37.607+00', '2022-03-26 11:58:37.607+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (98, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2021 fue cambiado a: espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 11:58:37.629+00', '2022-03-26 11:58:37.629+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (99, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 12:03:36.338+00', '2022-03-26 12:03:36.338+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (100, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 12:03:36.374+00', '2022-03-26 12:03:36.374+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (101, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 12:03:43.941+00', '2022-03-26 12:03:43.941+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (102, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2021 fue cambiado a: espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 12:03:43.976+00', '2022-03-26 12:03:43.976+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (103, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 12:04:28.289+00', '2022-03-26 12:04:28.289+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (104, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 12:04:28.317+00', '2022-03-26 12:04:28.317+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (105, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 12:04:33.201+00', '2022-03-26 12:04:33.201+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (106, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2021 fue cambiado a: espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 12:04:33.226+00', '2022-03-26 12:04:33.226+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (107, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 12:06:26.64+00', '2022-03-26 12:06:26.64+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (108, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 12:06:26.677+00', '2022-03-26 12:06:26.677+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (109, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 12:06:57.777+00', '2022-03-26 12:06:57.777+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (110, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2021 fue cambiado a: espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 12:06:57.808+00', '2022-03-26 12:06:57.808+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (111, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 12:18:38.17+00', '2022-03-26 12:18:38.17+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (112, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 12:18:38.204+00', '2022-03-26 12:18:38.204+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (113, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 14:43:44.115+00', '2022-03-26 14:43:44.115+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (114, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2021 fue cambiado a: espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 14:43:44.156+00', '2022-03-26 14:43:44.156+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (115, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 14:44:14.472+00', '2022-03-26 14:44:14.472+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (116, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 14:44:14.499+00', '2022-03-26 14:44:14.499+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (117, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 14:44:23.787+00', '2022-03-26 14:44:23.787+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (118, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2021 fue cambiado a: espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 14:44:23.807+00', '2022-03-26 14:44:23.807+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (119, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 14:44:32.507+00', '2022-03-26 14:44:32.507+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (120, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 14:44:32.536+00', '2022-03-26 14:44:32.536+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (121, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:06:14.15+00', '2022-03-26 17:06:14.15+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (122, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2021 fue cambiado a: espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:06:14.18+00', '2022-03-26 17:06:14.18+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (123, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:06:47.036+00', '2022-03-26 17:06:47.036+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (124, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:06:50.78+00', '2022-03-26 17:06:50.78+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (125, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2022 fue cambiado a: espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:06:50.812+00', '2022-03-26 17:06:50.812+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (126, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:06:55.126+00', '2022-03-26 17:06:55.126+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (127, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:06:58.295+00', '2022-03-26 17:06:58.295+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (128, 1, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2022 fue cambiado a: activo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:06:58.314+00', '2022-03-26 17:06:58.314+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (129, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:07:12.981+00', '2022-03-26 17:07:12.981+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (130, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:11:03.812+00', '2022-03-26 17:11:03.812+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (131, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:11:47.826+00', '2022-03-26 17:11:47.826+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (132, 1, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2021 fue cambiado a: activo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:11:47.851+00', '2022-03-26 17:11:47.851+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (133, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:14:00.124+00', '2022-03-26 17:14:00.124+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (134, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:14:00.155+00', '2022-03-26 17:14:00.155+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (135, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:14:37.929+00', '2022-03-26 17:14:37.929+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (136, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2021 fue cambiado a: espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:14:37.948+00', '2022-03-26 17:14:37.948+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (137, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:14:49.296+00', '2022-03-26 17:14:49.296+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (138, 1, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2021 fue cambiado a: activo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:14:49.316+00', '2022-03-26 17:14:49.316+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (139, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:14:54.117+00', '2022-03-26 17:14:54.117+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (140, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:14:54.153+00', '2022-03-26 17:14:54.153+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (141, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:14:57.938+00', '2022-03-26 17:14:57.938+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (142, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2021 fue cambiado a: espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:14:57.959+00', '2022-03-26 17:14:57.959+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (143, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:15:02.235+00', '2022-03-26 17:15:02.235+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (144, 1, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2021 fue cambiado a: activo', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:15:02.434+00', '2022-03-26 17:15:02.434+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (145, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:29:10.847+00', '2022-03-26 17:29:10.847+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (146, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2021 fue cambiado a: espera', NULL, '2022-03-26 00:00:00+00', '2022-03-26 17:29:10.881+00', '2022-03-26 17:29:10.881+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (147, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', 'Baja porque faltó 3 veces seguidas', '2022-03-27 00:00:00+00', '2022-03-27 09:39:07.997+00', '2022-03-27 09:39:07.997+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (148, 1, 'PROGRAM_STATUS_INACTIVE_3_ABSENT', 'Dado de baja del programa', 'Baja porque faltó 3 veces seguidas', '2022-03-27 00:00:00+00', '2022-03-27 09:39:08.013+00', '2022-03-27 09:39:08.013+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (149, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-27 00:00:00+00', '2022-03-27 09:40:25.286+00', '2022-03-27 09:40:25.286+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (150, 1, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2021 fue cambiado a: activo', NULL, '2022-03-27 00:00:00+00', '2022-03-27 09:40:25.322+00', '2022-03-27 09:40:25.322+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (151, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', 'ya no puede seguir asistiendo porque se mudó de barrio', '2022-03-27 00:00:00+00', '2022-03-27 09:40:47.697+00', '2022-03-27 09:40:47.697+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (152, 1, 'PROGRAM_STATUS_INACTIVE_FAMILY', 'Dado de baja del programa', 'ya no puede seguir asistiendo porque se mudó de barrio', '2022-03-27 00:00:00+00', '2022-03-27 09:40:47.697+00', '2022-03-27 09:40:47.697+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (153, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-27 00:00:00+00', '2022-03-27 09:51:32.096+00', '2022-03-27 09:51:32.096+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (154, 1, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2021 fue cambiado a: activo', NULL, '2022-03-27 00:00:00+00', '2022-03-27 09:51:32.136+00', '2022-03-27 09:51:32.136+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (155, 1, 'PROGRAM_STATUS_INACTIVE_NO_SHOW', 'Dado de baja del programa', 'nunca se presentó', '2022-03-27 09:53:05.074+00', '2022-03-27 09:53:05.076+00', '2022-03-27 09:53:05.076+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (156, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', 'nunca se presentó', '2022-03-27 09:53:05.075+00', '2022-03-27 09:53:05.076+00', '2022-03-27 09:53:05.076+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (157, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-27 10:13:27.343+00', '2022-03-27 10:13:27.344+00', '2022-03-27 10:13:27.344+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (158, 1, 'YEAR_STATUS_WAITING', 'El estado del participante en el año 2021 fue cambiado a: espera', NULL, '2022-03-27 10:13:27.372+00', '2022-03-27 10:13:27.372+00', '2022-03-27 10:13:27.372+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (159, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-27 10:13:45.239+00', '2022-03-27 10:13:45.24+00', '2022-03-27 10:13:45.24+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (160, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2021 fue cambiado a: inactivo', NULL, '2022-03-27 10:13:45.26+00', '2022-03-27 10:13:45.261+00', '2022-03-27 10:13:45.261+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (161, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2022 fue cambiado a: inactivo', '', '2022-03-27 14:43:16.194+00', '2022-03-27 14:43:16.197+00', '2022-03-27 14:43:16.197+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (162, 1, 'PROGRAM_STATUS_INACTIVE_3_ABSENT', 'Dado de baja del programa', '', '2022-03-27 14:43:16.194+00', '2022-03-27 14:43:16.197+00', '2022-03-27 14:43:16.197+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (163, 1, 'PROGRAM_STATUS_INACTIVE_3_ABSENT', 'Dado de baja del programa', '', '2022-03-27 14:43:16.194+00', '2022-03-27 14:43:16.197+00', '2022-03-27 14:43:16.197+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (164, 1, 'PROGRAM_STATUS_INACTIVE_3_ABSENT', 'Dado de baja del programa', '', '2022-03-27 14:43:16.194+00', '2022-03-27 14:43:16.197+00', '2022-03-27 14:43:16.197+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (165, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-27 14:43:29.903+00', '2022-03-27 14:43:29.904+00', '2022-03-27 14:43:29.904+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (166, 1, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2022 fue cambiado a: activo', NULL, '2022-03-27 14:43:29.945+00', '2022-03-27 14:43:29.946+00', '2022-03-27 14:43:29.946+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (167, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-27 14:43:33.947+00', '2022-03-27 14:43:33.948+00', '2022-03-27 14:43:33.948+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (168, 1, 'PROGRAM_STATUS_INACTIVE_3_ABSENT', 'Dado de baja del programa', '', '2022-03-27 14:46:32.697+00', '2022-03-27 14:46:32.698+00', '2022-03-27 14:46:32.698+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (169, 1, 'PROGRAM_STATUS_INACTIVE_3_ABSENT', 'Dado de baja del programa', '', '2022-03-27 14:46:32.697+00', '2022-03-27 14:46:32.698+00', '2022-03-27 14:46:32.698+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (170, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2022 fue cambiado a: inactivo', '', '2022-03-27 14:46:32.697+00', '2022-03-27 14:46:32.698+00', '2022-03-27 14:46:32.698+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (171, 1, 'PROGRAM_STATUS_INACTIVE_3_ABSENT', 'Dado de baja del programa', '', '2022-03-27 14:46:32.697+00', '2022-03-27 14:46:32.698+00', '2022-03-27 14:46:32.698+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (172, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-27 14:48:17.032+00', '2022-03-27 14:48:17.033+00', '2022-03-27 14:48:17.033+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (173, 1, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2022 fue cambiado a: activo', NULL, '2022-03-27 14:48:17.067+00', '2022-03-27 14:48:17.069+00', '2022-03-27 14:48:17.069+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (174, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-27 14:48:19.903+00', '2022-03-27 14:48:19.904+00', '2022-03-27 14:48:19.904+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (175, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-27 14:48:29.33+00', '2022-03-27 14:48:29.331+00', '2022-03-27 14:48:29.331+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (176, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2022 fue cambiado a: inactivo', '', '2022-03-27 14:48:46.414+00', '2022-03-27 14:48:46.415+00', '2022-03-27 14:48:46.415+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (177, 1, 'PROGRAM_STATUS_INACTIVE_3_ABSENT', 'Dado de baja del programa', '', '2022-03-27 14:48:46.414+00', '2022-03-27 14:48:46.415+00', '2022-03-27 14:48:46.415+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (178, 1, 'PROGRAM_STATUS_INACTIVE_3_ABSENT', 'Dado de baja del programa', '', '2022-03-27 14:48:46.414+00', '2022-03-27 14:48:46.415+00', '2022-03-27 14:48:46.415+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (179, 1, 'PROGRAM_STATUS_INACTIVE_3_ABSENT', 'Dado de baja del programa', '', '2022-03-27 14:48:46.414+00', '2022-03-27 14:48:46.415+00', '2022-03-27 14:48:46.415+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (180, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-27 14:49:49.959+00', '2022-03-27 14:49:49.96+00', '2022-03-27 14:49:49.96+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (181, 1, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2022 fue cambiado a: activo', NULL, '2022-03-27 14:49:49.985+00', '2022-03-27 14:49:49.985+00', '2022-03-27 14:49:49.985+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (182, 1, 'PROGRAM_STATUS_INACTIVE_3_ABSENT', 'Dado de baja del programa', '', '2022-03-27 14:50:03.26+00', '2022-03-27 14:50:03.262+00', '2022-03-27 14:50:03.262+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (183, 1, 'PROGRAM_STATUS_INACTIVE_3_ABSENT', 'Dado de baja del programa', '', '2022-03-27 14:50:03.261+00', '2022-03-27 14:50:03.262+00', '2022-03-27 14:50:03.262+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (184, 1, 'YEAR_STATUS_INACTIVE', 'El estado del participante en el año 2022 fue cambiado a: inactivo', '', '2022-03-27 14:50:03.261+00', '2022-03-27 14:50:03.262+00', '2022-03-27 14:50:03.262+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (185, 1, 'PROGRAM_STATUS_INACTIVE_3_ABSENT', 'Dado de baja del programa', '', '2022-03-27 14:50:03.261+00', '2022-03-27 14:50:03.262+00', '2022-03-27 14:50:03.262+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (186, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-27 14:53:33.635+00', '2022-03-27 14:53:33.635+00', '2022-03-27 14:53:33.635+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (187, 1, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2022 fue cambiado a: activo', NULL, '2022-03-27 14:53:33.658+00', '2022-03-27 14:53:33.659+00', '2022-03-27 14:53:33.659+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (188, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-27 14:53:36.794+00', '2022-03-27 14:53:36.795+00', '2022-03-27 14:53:36.795+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (189, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-03-27 14:53:55.902+00', '2022-03-27 14:53:55.902+00', '2022-03-27 14:53:55.902+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (190, 1, 'PROGRAM_STATUS_INACTIVE_OTHER', 'Dado de baja del programa', NULL, '2022-03-27 14:54:10.313+00', '2022-03-27 14:54:10.313+00', '2022-03-27 14:54:10.313+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (191, 1, 'PROGRAM_STATUS_WAITING', 'Agregado a la lista de espera', NULL, '2022-03-27 14:54:50.315+00', '2022-03-27 14:54:50.315+00', '2022-03-27 14:54:50.315+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (192, 1, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta en el programa', NULL, '2022-04-03 19:43:01.349+00', '2022-04-03 19:43:01.373+00', '2022-04-03 19:43:01.373+00', 1, 1, true);
INSERT INTO public."ParticipantDiary" (id, "participantId", type, title, description, date, "createdAt", "updatedAt", "createdBy", "updatedBy", "isAutoEvent") VALUES (193, 1, 'YEAR_STATUS_ACTIVE', 'El estado del participante en el año 2021 fue cambiado a: activo', NULL, '2022-04-03 19:43:01.475+00', '2022-04-03 19:43:01.508+00', '2022-04-03 19:43:01.508+00', 1, 1, true);


--
-- Data for Name: ParticipantDiaryPrograms; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (3, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (1, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (4, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (5, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (40, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (42, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (44, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (46, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (48, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (50, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (52, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (54, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (56, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (57, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (58, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (60, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (62, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (64, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (65, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (67, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (69, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (70, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (70, 2);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (72, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (74, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (76, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (77, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (79, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (81, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (83, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (85, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (87, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (89, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (91, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (93, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (95, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (97, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (99, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (101, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (103, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (105, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (107, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (109, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (111, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (113, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (115, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (117, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (119, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (121, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (123, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (124, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (126, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (127, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (129, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (130, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (131, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (133, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (135, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (137, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (139, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (141, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (143, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (145, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (148, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (149, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (152, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (153, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (155, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (157, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (159, 4);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (162, 2);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (163, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (164, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (165, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (167, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (168, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (169, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (171, 2);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (172, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (174, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (175, 2);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (177, 2);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (178, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (179, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (180, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (182, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (183, 2);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (185, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (186, 3);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (188, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (189, 2);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (190, 2);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (191, 1);
INSERT INTO public."ParticipantDiaryPrograms" ("participantDiaryId", "programId") VALUES (192, 4);


--
-- Data for Name: ParticipantHealth; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."ParticipantHealth" ("participantId", "bloodType", "missingVaccines", "allergyDetails", "foodRestrictionDetails", "chronicDiseaseDetails", "takingMedicationDetails", "hospitalizedDetails", "isNormalPregnancy", "hasCompleteVaccination", "hasCongenitalHeartDisease", "hasHypertension", "hasHeartMurmurs", "hasArrhythmia", "hasAllergy", "hasFoodRestriction", "hasChronicDisease", "isTakingMedication", "hasBeenHospitalized", "canDoPhysicalActivity", observations, "createdAt", "createdBy", "updatedAt", "updatedBy") VALUES (1, 'A_POSITIVE', 'BCG', NULL, 'pan', NULL, NULL, NULL, 'YES', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'YES', 'NO', 'NO', 'NO', 'YES', NULL, '2022-03-27 11:12:45.325+00', 1, '2022-03-27 11:12:45.325+00', 1);


--
-- Data for Name: ParticipantStatus; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."ParticipantStatus" (year, "participantId", status, "wasEverActive") VALUES (2022, 1, 'ACTIVE', true);
INSERT INTO public."ParticipantStatus" (year, "participantId", status, "wasEverActive") VALUES (2021, 1, 'ACTIVE', true);
INSERT INTO public."ParticipantStatus" (year, "participantId", status, "wasEverActive") VALUES (2022, 2, 'ACTIVE', false);
INSERT INTO public."ParticipantStatus" (year, "participantId", status, "wasEverActive") VALUES (2022, 7, 'ACTIVE', false);


--
-- Data for Name: ParticipantsOnClasses; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."ParticipantsOnClasses" ("classId", "participantId", status, "createdAt", "updatedAt") VALUES (1, 1, 'PRESENT', '2022-03-22 07:58:36.551+00', '2022-03-22 07:58:36.551+00');
INSERT INTO public."ParticipantsOnClasses" ("classId", "participantId", status, "createdAt", "updatedAt") VALUES (2, 1, 'ABSENT', '2022-03-22 07:59:07.44+00', '2022-03-22 07:59:07.44+00');
INSERT INTO public."ParticipantsOnClasses" ("classId", "participantId", status, "createdAt", "updatedAt") VALUES (3, 7, 'PRESENT', '2022-03-28 07:13:22.826+00', '2022-03-28 07:13:22.826+00');
INSERT INTO public."ParticipantsOnClasses" ("classId", "participantId", status, "createdAt", "updatedAt") VALUES (3, 2, 'PRESENT', '2022-03-28 07:13:22.826+00', '2022-03-28 07:13:22.826+00');
INSERT INTO public."ParticipantsOnClasses" ("classId", "participantId", status, "createdAt", "updatedAt") VALUES (4, 1, 'ABSENT', '2022-08-18 15:55:08.839+00', '2022-08-18 15:55:08.839+00');


--
-- Data for Name: ParticipantsOnPrograms; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."ParticipantsOnPrograms" ("programId", "participantId", "createdAt", "updatedAt", "createdBy", "updatedBy", status, "waitingListOrder", "wasEverActive") VALUES (3, 1, '2022-03-21 00:39:52.31+00', '2022-03-27 14:53:33.605568+00', 1, 1, 'ACTIVE', NULL, true);
INSERT INTO public."ParticipantsOnPrograms" ("programId", "participantId", "createdAt", "updatedAt", "createdBy", "updatedBy", status, "waitingListOrder", "wasEverActive") VALUES (2, 1, '2022-03-20 21:53:33.747+00', '2022-03-27 14:54:10.293592+00', 1, 1, 'INACTIVE', NULL, true);
INSERT INTO public."ParticipantsOnPrograms" ("programId", "participantId", "createdAt", "updatedAt", "createdBy", "updatedBy", status, "waitingListOrder", "wasEverActive") VALUES (1, 1, '2022-03-20 21:53:30.607+00', '2022-03-27 14:54:50.298864+00', 1, 1, 'WAITING', 'm', true);
INSERT INTO public."ParticipantsOnPrograms" ("programId", "participantId", "createdAt", "updatedAt", "createdBy", "updatedBy", status, "waitingListOrder", "wasEverActive") VALUES (4, 1, '2022-03-26 11:42:07.547+00', '2022-04-03 19:43:01.324007+00', 1, 1, 'ACTIVE', NULL, true);
INSERT INTO public."ParticipantsOnPrograms" ("programId", "participantId", "createdAt", "updatedAt", "createdBy", "updatedBy", status, "waitingListOrder", "wasEverActive") VALUES (1, 2, '2022-03-22 22:25:06.918+00', '2022-03-22 22:25:06.918+00', 1, 1, 'ACTIVE', NULL, true);
INSERT INTO public."ParticipantsOnPrograms" ("programId", "participantId", "createdAt", "updatedAt", "createdBy", "updatedBy", status, "waitingListOrder", "wasEverActive") VALUES (1, 7, '2022-03-22 22:25:16.799+00', '2022-03-22 22:25:16.799+00', 1, 1, 'ACTIVE', NULL, true);


--
-- Data for Name: ProgramDays; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."ProgramDays" (id, "programId", day, "fromTime", "toTime", "createdAt", "updatedAt") VALUES (3, 1, 'MONDAY', '15:00', '16:00', '2022-03-20 16:43:47.198+00', '2022-03-20 16:43:47.198+00');
INSERT INTO public."ProgramDays" (id, "programId", day, "fromTime", "toTime", "createdAt", "updatedAt") VALUES (4, 2, 'FRIDAY', '18:00', '19:00', '2022-03-20 16:44:25.781+00', '2022-03-20 16:44:25.781+00');
INSERT INTO public."ProgramDays" (id, "programId", day, "fromTime", "toTime", "createdAt", "updatedAt") VALUES (6, 4, 'FRIDAY', '14:00', '15:00', '2022-03-26 10:51:35.372+00', '2022-03-26 10:51:35.372+00');
INSERT INTO public."ProgramDays" (id, "programId", day, "fromTime", "toTime", "createdAt", "updatedAt") VALUES (10, 3, 'THURSDAY', '11:00', '12:30', '2022-04-12 10:49:55.162+00', '2022-04-12 10:49:55.162+00');
INSERT INTO public."ProgramDays" (id, "programId", day, "fromTime", "toTime", "createdAt", "updatedAt") VALUES (14, 8, 'MONDAY', '15:00', '16:00', '2022-04-12 11:29:45.779+00', '2022-04-12 11:29:45.779+00');


--
-- Data for Name: ProgramDiary; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."ProgramDiary" (id, "programId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (1, 1, 'INFO', 'Charly se porta mal', '### Problemas con Chary No se está portando bien y hace macanas.', false, '2022-03-23 02:19:00+00', '2022-03-22 22:20:03.362+00', '2022-03-22 22:20:03.362+00', 1, 1);
INSERT INTO public."ProgramDiary" (id, "programId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (2, 1, 'INFO', 'Ganamos! 😃', 'Le ganamos al Jockey club!', false, '2022-03-23 02:25:00+00', '2022-03-22 22:25:46.686+00', '2022-03-23 19:57:40.509039+00', 1, 1);


--
-- Data for Name: ProgramDiaryParticipants; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."ProgramDiaryParticipants" ("programDiaryId", "participantId") VALUES (1, 1);
INSERT INTO public."ProgramDiaryParticipants" ("programDiaryId", "participantId") VALUES (2, 7);
INSERT INTO public."ProgramDiaryParticipants" ("programDiaryId", "participantId") VALUES (2, 2);
INSERT INTO public."ProgramDiaryParticipants" ("programDiaryId", "participantId") VALUES (2, 1);


--
-- Data for Name: SurveyBiography; Type: TABLE DATA; Schema: public; Owner: desafio
--



--
-- Data for Name: UserDiary; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."UserDiary" (id, "userId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (2, 1, 'INFO', 'Testing', 'testing', false, '2022-04-06 17:22:00+00', '2022-04-06 17:22:15.878+00', '2022-04-06 17:22:15.878+00', 1, 1);
INSERT INTO public."UserDiary" (id, "userId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (1, 2, 'INFO', 'testing', 'sdfsdfsdfsdf', false, '2021-09-15 19:48:00+00', '2022-04-03 19:49:00.936+00', '2022-04-06 17:36:57.345029+00', 1, 1);
INSERT INTO public."UserDiary" (id, "userId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (3, 2, 'INFO', 'testing 2022', 'testing 2022', false, '2022-04-06 17:37:00+00', '2022-04-06 17:37:43.063+00', '2022-04-06 17:37:43.063+00', 1, 1);
INSERT INTO public."UserDiary" (id, "userId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (4, 3, 'PROGRAM_STATUS_INACTIVE', 'Dado de baja como voluntario en el programa', NULL, true, '2022-04-12 10:48:59.365+00', '2022-04-12 10:48:59.368+00', '2022-04-12 10:48:59.368+00', 1, 1);
INSERT INTO public."UserDiary" (id, "userId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (5, 3, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta como voluntario en el programa', NULL, true, '2022-04-12 10:49:18.048+00', '2022-04-12 10:49:18.05+00', '2022-04-12 10:49:18.05+00', 1, 1);
INSERT INTO public."UserDiary" (id, "userId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (6, 2, 'PROGRAM_STATUS_INACTIVE', 'Dado de baja como facilitador en el programa', NULL, true, '2022-04-12 10:49:38.913+00', '2022-04-12 10:49:38.915+00', '2022-04-12 10:49:38.915+00', 1, 1);
INSERT INTO public."UserDiary" (id, "userId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (7, 2, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta como facilitador en el programa', NULL, true, '2022-04-12 10:49:55.16+00', '2022-04-12 10:49:55.162+00', '2022-04-12 10:49:55.162+00', 1, 1);
INSERT INTO public."UserDiary" (id, "userId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (8, 2, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta como facilitador en el programa', NULL, true, '2022-04-12 11:29:45.814+00', '2022-04-12 11:29:45.816+00', '2022-04-12 11:29:45.816+00', 1, 1);
INSERT INTO public."UserDiary" (id, "userId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (9, 3, 'PROGRAM_STATUS_ACTIVE', 'Dado de alta como voluntario en el programa', NULL, true, '2022-04-12 11:29:45.814+00', '2022-04-12 11:29:45.816+00', '2022-04-12 11:29:45.816+00', 1, 1);
INSERT INTO public."UserDiary" (id, "userId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (10, 3, 'STATUS_INACTIVE', 'Status cambiado a: Inactivo', NULL, true, '2022-04-12 12:00:43.006+00', '2022-04-12 12:00:43.007+00', '2022-04-12 12:00:43.007+00', 1, 1);
INSERT INTO public."UserDiary" (id, "userId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (11, 3, 'STATUS_INVITED', 'Status cambiado a: Invitado', NULL, true, '2022-04-12 12:02:20.998+00', '2022-04-12 12:02:21+00', '2022-04-12 12:02:21+00', 1, 1);
INSERT INTO public."UserDiary" (id, "userId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (12, 3, 'STATUS_INACTIVE', 'Status cambiado a: Inactivo', NULL, true, '2022-04-12 12:02:28.541+00', '2022-04-12 12:02:28.542+00', '2022-04-12 12:02:28.542+00', 1, 1);
INSERT INTO public."UserDiary" (id, "userId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (13, 3, 'STATUS_ACTIVE', 'Status cambiado a: Activo', NULL, true, '2022-04-12 12:02:53.302+00', '2022-04-12 12:02:53.303+00', '2022-04-12 12:02:53.303+00', 1, 1);
INSERT INTO public."UserDiary" (id, "userId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (14, 3, 'STATUS_INACTIVE', 'Status cambiado a: Inactivo', NULL, true, '2022-04-12 12:02:59.578+00', '2022-04-12 12:02:59.579+00', '2022-04-12 12:02:59.579+00', 1, 1);
INSERT INTO public."UserDiary" (id, "userId", type, title, description, "isAutoEvent", date, "createdAt", "updatedAt", "createdBy", "updatedBy") VALUES (15, 3, 'STATUS_INVITED', 'Status cambiado a: Invitado', NULL, true, '2022-04-12 12:03:05.856+00', '2022-04-12 12:03:05.857+00', '2022-04-12 12:03:05.857+00', 1, 1);


--
-- Data for Name: UserDiaryPrograms; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."UserDiaryPrograms" ("userDiaryId", "programId") VALUES (1, 4);
INSERT INTO public."UserDiaryPrograms" ("userDiaryId", "programId") VALUES (3, 1);
INSERT INTO public."UserDiaryPrograms" ("userDiaryId", "programId") VALUES (4, 3);
INSERT INTO public."UserDiaryPrograms" ("userDiaryId", "programId") VALUES (5, 3);
INSERT INTO public."UserDiaryPrograms" ("userDiaryId", "programId") VALUES (6, 3);
INSERT INTO public."UserDiaryPrograms" ("userDiaryId", "programId") VALUES (7, 3);
INSERT INTO public."UserDiaryPrograms" ("userDiaryId", "programId") VALUES (8, 8);
INSERT INTO public."UserDiaryPrograms" ("userDiaryId", "programId") VALUES (9, 8);


--
-- Data for Name: UserRoles; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."UserRoles" ("userId", role) VALUES (1, 'ADMIN');
INSERT INTO public."UserRoles" ("userId", role) VALUES (2, 'FACILITATOR');
INSERT INTO public."UserRoles" ("userId", role) VALUES (3, 'FACILITATOR_VOLUNTEER');


--
-- Data for Name: UsersOnPrograms; Type: TABLE DATA; Schema: public; Owner: desafio
--

INSERT INTO public."UsersOnPrograms" ("userId", "programId", "isFacilitator", "createdAt", "updatedAt") VALUES (2, 1, true, '2022-03-20 16:43:47.198+00', '2022-03-20 16:43:47.198+00');
INSERT INTO public."UsersOnPrograms" ("userId", "programId", "isFacilitator", "createdAt", "updatedAt") VALUES (3, 1, false, '2022-03-20 16:43:47.198+00', '2022-03-20 16:43:47.198+00');
INSERT INTO public."UsersOnPrograms" ("userId", "programId", "isFacilitator", "createdAt", "updatedAt") VALUES (2, 2, true, '2022-03-20 16:44:25.781+00', '2022-03-20 16:44:25.781+00');
INSERT INTO public."UsersOnPrograms" ("userId", "programId", "isFacilitator", "createdAt", "updatedAt") VALUES (3, 2, false, '2022-03-20 16:44:25.781+00', '2022-03-20 16:44:25.781+00');
INSERT INTO public."UsersOnPrograms" ("userId", "programId", "isFacilitator", "createdAt", "updatedAt") VALUES (2, 4, true, '2022-03-26 10:51:35.372+00', '2022-03-26 10:51:35.372+00');
INSERT INTO public."UsersOnPrograms" ("userId", "programId", "isFacilitator", "createdAt", "updatedAt") VALUES (3, 4, false, '2022-03-26 10:51:35.372+00', '2022-03-26 10:51:35.372+00');
INSERT INTO public."UsersOnPrograms" ("userId", "programId", "isFacilitator", "createdAt", "updatedAt") VALUES (2, 3, true, '2022-04-12 10:49:55.162+00', '2022-04-12 10:49:55.162+00');
INSERT INTO public."UsersOnPrograms" ("userId", "programId", "isFacilitator", "createdAt", "updatedAt") VALUES (3, 3, false, '2022-04-12 10:49:55.162+00', '2022-04-12 10:49:55.162+00');
INSERT INTO public."UsersOnPrograms" ("userId", "programId", "isFacilitator", "createdAt", "updatedAt") VALUES (2, 8, true, '2022-04-12 11:29:45.779+00', '2022-04-12 11:29:45.779+00');
INSERT INTO public."UsersOnPrograms" ("userId", "programId", "isFacilitator", "createdAt", "updatedAt") VALUES (3, 8, false, '2022-04-12 11:29:45.779+00', '2022-04-12 11:29:45.779+00');


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
-- PostgreSQL database dump complete
--

