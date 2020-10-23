/**
 * This file consists test log configuration.
 * The exported logger instance can be used across the project.
 * protractor-logger provides functionalities as logger.info, logger.error, logger.warn
 * Logs will be saved with current date format in TEST_REPORT_DIRECTORY/logs folder
 */
import { configure, getLogger } from 'log4js';

require('dotenv-safe').config({
  allowEmptyValues: true,
  example: `${process.cwd()}/.env`,
});

configure({
  appenders: {
    console: { type: 'console' },
    file: {
      type: 'file',
      filename: `${process.cwd()}/target/logs/test_${new Date()
        .toISOString()
        .replace(/\W/g, '')}.log`,
    },
  },
  categories: {
    default: {
      appenders: ['console', 'file'],
      level: 'all',
    },
  },
});
export const logger = getLogger('log');
