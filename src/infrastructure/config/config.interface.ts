export interface Configuration {
  database: {
    type: 'mysql' | 'mariadb';
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    secure: boolean;
    url: string;
  };

  jwt: {
    auth: {
      secret: string;
      ttl: number;
    };
    refresh: {
      secret: string;
      ttl: number;
    };
  };

  // corebank: {
  //   apiUser: string;
  //   apiKey: string;
  //   url: string;
  //   static_token: string;
  // };

  // throttler: {
  //   default_ttl: number;
  //   default_limit: number;
  // };
}
