import { Box, Container, Heading, useColorModeValue } from "@chakra-ui/react";
import { ActionFunction, LoaderFunction, redirect } from "remix";
import { validationError, withZod } from "remix-validated-form";
import { db } from "~/services/db.server";
import { authenticator } from "~/services/auth.server";
import {
  ParticipantForm,
  participantFormValidator,
} from "~/components/Participants/ParticipantsForm";
import {
  ProgramForm,
  programFormValidator,
} from "~/components/Program/ProgramForm";

// export const loader: LoaderFunction = async ({ request }) => {
//   let user = await authenticator.isAuthenticated(request, {
//     failureRedirect: "/login",
//   });

//   const newProgram = {
//     name: "Hockey",
//     year: 2021,
//     sex: "MALE",
//     seats: 21,
//     ageFrom: 15,
//     ageTo: 17,
//     ageByYear: false,
//     programDays: [
//       {
//         day: "MONDAY",
//         fromTime: "18:00",
//         toTime: "19:00",
//       },
//       {
//         day: "MONDAY",
//         fromTime: "18:00",
//         toTime: "19:00",
//       },
//       {
//         day: "MONDAY",
//         fromTime: "18:00",
//         toTime: "19:00",
//       },
//     ],
//   };

//   const fieldValues = programFormValidator.validate(newProgram);

//   const { programDays, ...rest } = newProgram;

//   const program = await db.program.create({
//     data: {
//       ...rest,
//       createdBy: user.id,
//       updatedBy: user.id,
//       programDays: {
//         create: programDays,
//       },
//     },
//   });

//   console.log(program);
//   return program;
// };

export const action: ActionFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const formData = Object.fromEntries(await request.formData());

  const fieldValues = programFormValidator.validate(formData);
  console.log(fieldValues);

  if (fieldValues.error) return validationError(fieldValues.error);

  const { programDays, ...rest } = fieldValues.data;

  const program = await db.program.create({
    data: {
      ...rest,
      createdBy: user.id,
      updatedBy: user.id,
      programDays: {
        create: programDays,
      },
    },
  });

  return redirect("/programs");
};

export default function NewProgram() {
  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        pt="4"
        pb="4"
        shadow="sm"
      >
        <Container maxW="7xl">
          <Heading size="lg" mb="0">
            Crear Programa
          </Heading>
        </Container>
      </Box>

      <ProgramForm />
    </>
  );
}
