import { LoaderFunction, redirect, useLoaderData } from "remix";
import { json } from "remix-utils";
import { User } from "~/models/user";
import { authenticator } from "~/util/auth.server";

type RouteData = { user: User };

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return json<RouteData>({ user });
};

// Empty React component required by Remix
export default function Dashboard() {
  let { user } = useLoaderData<RouteData>();
  // use the user to render the UI of your private route
  return <div>Dashboard</div>;
}
