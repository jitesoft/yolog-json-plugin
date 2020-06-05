import JsonBase from '../index';

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

  /**
   * Method called when a log message is intercepted and the plugin is listening to the given tag.
   *
   * @param {String} tag       Tag which was used when logging the message.
   * @param {Number} timestamp Timestamp (in ms) when the log was intercepted by the Yolog instance.
   * @param {String} message   Message that is passed to the plugin.
   * @param {Error} error      Error generated in the logger to be possible to use for call stack or for other reasons.
   * @return Promise<void>
   * @abstract
   */
  async log (tag, timestamp, message, error) {
    const data = await super.log(tag, timestamp, message);
    console[this.#colors[tag].call](data);
  }
}
