import { LoaderFunction, redirect } from "remix";

import { authenticator } from "~/services/auth.server";

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return redirect("/participants");
};
