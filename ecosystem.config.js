module.exports = {
    apps: [
        {
            name: 'xcom-admin',
            script: 'serve',
            watch: false,
            log_date_format: 'DD-MM-YYYY HH:mm:ss.SSS',
            env: {
                PM2_SERVE_PATH: './dist',
                PM2_SERVE_PORT: 8080
            }
        }
    ]
}
