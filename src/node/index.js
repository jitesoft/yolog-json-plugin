import fs from 'fs';
import sprintf from '@jitesoft/sprintf';
import { YologPlugin } from '@jitesoft/yolog';
import { dirname } from 'path';

export default class JsonPlugin extends YologPlugin {
  #colors = {
    error: 'stderr',
    critical: 'stderr',
    alert: 'stderr',
    emergency: 'stderr',
    warning: 'stdout',
    debug: 'stdout',
    info: 'stdout'
  };
  #file = null;

  /**
   * Constructor.
   * @param {String|null} [filePath] File path if any.
   */
  constructor (filePath = null) {
    super();
    this.#file = filePath;
  }

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
    const result = {
      tag: tag,
      timestamp: timestamp,
      message: message
    };

    if (error && !['warning', 'debug', 'info'].includes(tag)) {
      result.error = {
        message: error.message,
        stack: error.stack
      };
    }
    if (this.#file !== null) {
      await this.#writeToFileAsPromise(this.#file, sprintf('%j\n', result));
    } else {
      await new Promise((resolve, reject) => {
        process[this.#colors[tag]].write(sprintf('%j\n', result), 'UTF-8', (err) => err ? reject(err) : resolve());
      });
    }
  }

  /**
   * @private
   * @param {String} file
   * @param {String} text
   * @return {Promise<void>}
   */
  #writeToFileAsPromise = async (file, text) => {
    // depending on if it is relative path or not, we aught to append curr dir
    const path = (file.indexOf('/') === 0 || file.indexOf('\\') === 0) ? `${file}` : `${dirname(process.argv[1])}/${file}`;
    return new Promise((resolve, reject) => {
      fs.appendFile(path, text, (error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  };
}
