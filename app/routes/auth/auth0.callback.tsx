import { LoaderFunction } from "remix";
import { authenticator } from "~/util/auth.server";

export let loader: LoaderFunction = async ({ request }) => {
  await authenticator.authenticate("auth0", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};
