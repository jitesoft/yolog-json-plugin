import JsonBase from '../../src/index';

export default class JsonPlugin extends JsonBase {
  #colors = {
    error: { call: 'error' },
    critical: { call: 'error' },
    alert: { call: 'error' },
    emergency: { call: 'error' },
    warning: { call: 'warn' },
    debug: { call: 'log' },
    info: { call: 'info' }
  };

  async log (tag, timestamp, message) {
    const data = await super.log(tag, timestamp, message);
    window.console[this.#colors[tag].call](data);
  }
}
