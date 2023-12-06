import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();
console.log('MySQL Database is running on port ' + 3307);
export default knex({
    client: 'mysql2',
    // notes: chỉnh sửa các thông tin db ở đây
    connection: {
        host: '127.0.0.1',
        port: '3307',
        user: 'root',
        password: '123456',
        database: 'ads',
    },

    pool: { min: 0, max: 10 },
});
