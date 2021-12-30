import { json, LoaderFunction } from "remix";
import { db } from "~/services/db.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const schoolName = url.searchParams.get("schoolName") ?? "";

  const schools = await db.school.findMany({
    where: {
      name: {
        contains: schoolName,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  return json(schools);
};
