exports.config = {
    current_env: 'development',
    development: {
        hostname: 'http://localhost:354',
        port: 354,
        socketio_port: 313,
        db: {
            client      : 'mysql',
            connection  : {
                host        : '194.59.165.27',
                port        : '3306',
                user        : 'root',
                password    : 'SayaAbu313354',
                database    : 'absensi_jokam',
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