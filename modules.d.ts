// env variables types
declare namespace NodeJS {
  export interface ProcessEnv {
    COOKIE_SECRET: string;
    AUTH0_DOMAIN: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_CLIENT_SECRET: string;
    BASE_URL: string;
  }
}
