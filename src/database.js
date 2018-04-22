const knex = require('knex');

class Database {
    constructor(filename) {
        this.client = knex({
            client: 'sqlite3',
            connection: { filename },
            useNullAsDefault: true,
            migrations: {
                tableName: 'migrations',
                directory: './src/migrations'
            }
        });
    }

    migrate() {
        return this.client.migrate.latest();
    }

    hasId(id) {
        return new Promise((resolve, reject) => {
            return this.client.select().from('tweets').where('id', id)
                .then(response => {
                    resolve(response.length > 0);
                }).catch(err => reject(err));
        });
    }

    addId(id) {
        return new Promise((resolve, reject) => {
            return this.client.insert({ id }).into('tweets')
                .then(() => resolve(true))
                .catch(err => reject(err));
        });
    }
}

module.exports = Database;