import { YologPlugin as Plugin } from '@jitesoft/yolog';

export default class JsonBase extends Plugin {
  async log (tag, timestamp, message, error) {
    if (error && !['warning', 'debug', 'info'].includes(tag)) {
      return Promise.resolve({
        tag: tag,
        timestamp: timestamp,
        message: message,
        error: {
          message: error.message,
          stack: error.stack
        }
      });
    }
    return Promise.resolve({
      tag: tag,
      timestamp: timestamp,
      message: message
    });
  }
}
