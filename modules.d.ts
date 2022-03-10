// env variables types
declare namespace NodeJS {
  export interface ProcessEnv {
    COOKIE_SECRET: string;
    MAGIC_LINK_SECRET: string;
    SENDGRID_API_KEY: string;
    SENDGRID_TEMPLATE_MAGIC_LINK: string;
    BASE_URL: string;
  }
}
