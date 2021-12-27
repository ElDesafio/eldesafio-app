import { Box, Container, Heading, useColorModeValue } from "@chakra-ui/react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import { validationError } from "remix-validated-form";
import { db } from "~/services/db.server";
import { authenticator } from "~/services/auth.server";
import * as z from "zod";

import { School } from ".prisma/client";
import {
  SchoolForm,
  schoolFormValidator,
} from "~/components/School/SchoolForm";

// LOADER
export let loader: LoaderFunction = async ({ params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  const school: School | null = await db.school.findUnique({
    where: { id: +id },
  });
  return school;
};

//ACTION
export const action: ActionFunction = async ({ request, params }) => {
  const { id } = z.object({ id: z.string() }).parse(params);

  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (!user) throw json("Unauthorized", { status: 403 });

  const fieldValues = schoolFormValidator.validate(
    Object.fromEntries(await request.formData())
  );
  if (fieldValues.error) return validationError(fieldValues.error);

  const school = await db.school.update({
    where: { id: +id },
    data: {
      ...fieldValues.data,
      updatedBy: user.id,
    },
  });

  return redirect("/schools");
};

export default function EditParticipant() {
  const school = useLoaderData<School>();
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
            Editar Escuela
          </Heading>
        </Container>
      </Box>

      <SchoolForm defaultValues={school} />
    </>
  );
}
