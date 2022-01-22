import { Prisma } from ".prisma/client";
import { SimpleGrid } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { LoaderFunction, useLoaderData } from "remix";
import { db } from "~/services/db.server";
import { ProgramBox } from "./components/ProgramBox";

async function getProgramsByYear(year: number) {
  return await db.program.findMany({
    where: {
      year: year,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const selectedYear = url.searchParams.get("year") ?? DateTime.now().year;
  const programs = await getProgramsByYear(+selectedYear);

  return programs;
};

export default function ParticipantPrograms() {
  const programs =
    useLoaderData<Prisma.PromiseReturnType<typeof getProgramsByYear>>();

  return (
    <SimpleGrid minChildWidth="300px" spacing="6">
      {programs.map((program) => (
        <ProgramBox
          key={program.id}
          name={program.name}
          sex={program.sex}
          ageFrom={program.ageFrom}
          ageTo={program.ageTo}
          seatsAvailable={program.seats}
          seatsTaken={5}
         />
      ))}
    </SimpleGrid>
  );
}
