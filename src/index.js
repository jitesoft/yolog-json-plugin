import { Plugin } from '@jitesoft/yolog';

export default class JsonBase extends Plugin {
  async log (tag, timestamp, message) {
    return Promise.resolve({
      tag: tag,
      timestamp: timestamp,
      message: message
    });
  }
}
