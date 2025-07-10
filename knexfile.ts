import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'mssql',
        connection: {
            host: 'localhost',
            // TODO: Use your user & password from Microsoft SQL Server
            user: 'AnduNita',
            password: '04.05.2023A&M',
            database: 'bookish',
        },
    },
};

export default config;
