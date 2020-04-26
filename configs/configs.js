exports.config = {
    current_env: 'development',
    development: {
        app_name: 'DBMANAGER JOKAM',
        hostname: 'http://localhost:313',
        port: 313,
        socketio_port: 211,
        db: {
            client: 'mysql',
            connection: {
                host: '127.0.0.1',
                port: '3306',
                user: 'root',
                password: '',
                database: 'db_manager_jm',
            },
            pool: {
                min: 0,
                max: 1000000000
            }
        }
    },

    production: {

    }
}