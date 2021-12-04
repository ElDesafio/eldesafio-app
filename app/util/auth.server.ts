import { Auth0Strategy, Authenticator } from "remix-auth";
import { User } from "~/models/user";
import { sessionStorage } from "./session.server";

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export let authenticator = new Authenticator<User>(sessionStorage);

let auth0Strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/auth0/callback",
  },
  async (accessToken, refreshToken, auth0Params, profile) => {
    // Get the user data from your DB or API using the tokens and profile
    // return User.findOrCreate({ email: profile.emails[0].value });
    console.log({ accessToken });
    console.log({ refreshToken });
    console.log({ auth0Params });
    console.log({ profile });

    return {
      email: "lucas@lucas.com",
      password: "234234234234",
    };
  }
);

authenticator.use(auth0Strategy);
