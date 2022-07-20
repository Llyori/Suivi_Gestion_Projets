import { ConfigFactory } from '@nestjs/config';
import { Configuration } from './config.interface';

const bool = (val: string | undefined, bool: boolean): boolean =>
  val == null ? bool : val == 'true';
const int = (val: string | undefined, num: number): number =>
  val ? (isNaN(parseInt(val)) ? num : parseInt(val)) : num;
export type SQLDBType = 'mssql' | 'mariadb' | 'postgres';

const configFunction: ConfigFactory<Configuration> = (): Configuration => {
  return {
    jwt: {
      auth: {
        secret: process.env.AUTH_JWT_SECRET as string,
        ttl: int(process.env.AUTH_JWT_TTL, 7200),
      },
      refresh: {
        secret: process.env.AUTH_REFRESH_JWT_SECRET as string,
        ttl: int(process.env.AUTH_REFRESH_JWT_TTL, 2628000),
      },
    },

    // throttler: {
    //   default_ttl: int(process.env.THROTTLER_DEFAULT_TTL, 60),
    //   default_limit: int(process.env.THROTTLER_DEFAULT_LIMIT, 10),
    // },

    database: {
      url: process.env.DB_URL,
      name: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: int(process.env.DB_PORT, 1433),
      type: (process.env.DB_TYPE ?? 'mssql') as 'mysql' | 'mariadb',
      username: process.env.DB_USERNAME,
      secure: bool(process.env.DB_SSL_ENABLED, false),
    },
  };
};

export default configFunction;
