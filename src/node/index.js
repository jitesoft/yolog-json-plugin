import JsonBase from '../index';
import fs from 'fs';
import sprintf from '@jitesoft/sprintf';

export default class Json extends JsonBase {
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

  constructor (filePath = null) {
    super();
    this.#file = filePath;
  }

  async log (tag, timestamp, message) {
    const data = await super.log(tag, timestamp, message);
    if (this.#file !== null) {
      await this.#writeToFileAsPromise(this.#file, sprintf('%j', data));
    } else {
      await new Promise((resolve, reject) => {
        process[this.#colors[tag]].write(sprintf('%j', data), 'UTF-8', (err) => err ? reject(err) : resolve());
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
    const path = `${file}`;
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
