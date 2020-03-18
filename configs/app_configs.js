exports.config = {
    development: {
        port: 3000,
        hostname: 'http://localhost:3000',
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