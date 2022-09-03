// env variables types
declare namespace NodeJS {
  export interface ProcessEnv {
    BASE_URL: string;
    COOKIE_SECRET: string;
    MAGIC_LINK_SECRET: string;
    SENDGRID_API_KEY: string;
    SENDGRID_TEMPLATE_MAGIC_LINK: string;
    METRONOME_API_KEY: string;
    NEW_RELIC_ENABLED: string;
    GH_TOKEN: string;
    DATABASE_URL: string;
    DATABASE_URL_CLEAN: string;
    DATABASE_URL_E2E: string;
    E2E: string;
    MAGIC_LINK_ADMIN: string;
  }
}
