// app/routes/auth.auth0.tsx
import { ActionFunction, LoaderFunction, redirect } from "remix";
import { authenticator } from "~/services/auth.server";

// export let loader: LoaderFunction = async ({ request }) => {
//   authenticator.authenticate("auth0", request);
// };

export let loader: LoaderFunction = () => redirect("/login");

export let action: ActionFunction = async ({ request }) => {
  const response = await authenticator.authenticate("auth0", request);
  console.log(response);
  return response;
};
