import knex from '../utils/db.js';

class BaseModel {
    constructor(tableName, tableId) {
        if (new.target === BaseModel) {
            throw new TypeError('Cannot instantiate abstract class');
        }
        this.tableName = tableName;
        this.tableId = tableId;
        this.knex = knex;
    }

    // Hàm để thêm việc join các table khác vào query
    join(query, joins = []) {
        joins.forEach((join) => {
            query = query.join(join[0], join[1], join[2], join[3]);
        });
        return query;
    }

    leftJoin(query, joins = []) {
        joins.forEach((join) => {
            query = query.leftJoin(join[0], join[1], join[3]);
        });
        return query;
    }

    async getAll(conditions = {}) {
        return this.knex.select('*').from(this.tableName).where(conditions);
    }

    //  notes: Chú ý khi cần lấy thông tin các table khác mới sử dụng hàm này, còn không cứ sài hàm getAll()
    async getAllWithJoin(conditions = {}, joins = []) {
        let query = this.knex
            .select('*')
            .from(this.tableName)
            .where(conditions);

        // Join các table khác
        if (joins.length > 0) {
            query = this.leftJoin(query, joins);
        }

        return query;
    }

    async getById(id) {
        const conditions = {};
        conditions[this.tableId] = id;
        return this.knex
            .select('*')
            .from(this.tableName)
            .where(conditions)
            .first();
    }

    async getByIdWithJoin(id, joins = []) {
        const conditions = {};
        conditions[`${this.tableName}.id`] = id;

        let query = this.knex
            .select('*')
            .from(this.tableName)
            .where(conditions)
            .first();

        // Join các table khác
        if (joins.length > 0) {
            query = this.leftJoin(query, joins);
        }

        return query;
    }

    async getOne(conditions = {}) {
        return this.knex
            .select('*')
            .from(this.tableName)
            .where(conditions)
            .first();
    }

    async create(data) {
        return this.knex(this.tableName).insert(data);
    }

    async updateById(id, data) {
        // const conditions = {};
        // conditions[this.tableId] = id;
        return this.knex(this.tableName)
            .where({
                [this.tableId]: id,
            })
            .update(data);
    }

    async deleteById(id) {
        return this.knex(this.tableName)
            .where({ [this.tableId]: id })
            .del();
    }

    async deleteOne(conditions = {}) {
        return this.knex.from(this.tableName).where(conditions).del();
    }
}

export default BaseModel;
