import * as winston from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'

const logFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
)

const transport: DailyRotateFile = new DailyRotateFile({
    filename: './/logs//scoopApp-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
})

const logger = winston.createLogger({
    format: logFormat,
    transports: [
        transport,
        new winston.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
        }),
    ],
})

if (process.env.NODE_ENV !== 'production') {
    console.log('Logging initialized at debug level')
}

export default logger
