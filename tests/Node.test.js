import JsonPlugin from '../src/node/index';
import sprintf from '@jitesoft/sprintf';
import fs from 'fs';

jest.mock('fs');
const plugin = new JsonPlugin();

describe('Test node plugin.', () => {
  describe('Test console output.', () => {
    let stderr;
    let stdout;

    beforeEach(() => {
      stderr = jest.spyOn(process.stderr, 'write');
      stderr.mockImplementation((m, u, cb) => {
        return cb();
      });

      stdout = jest.spyOn(process.stdout, 'write');
      stdout.mockImplementation((m, u, cb) => {
        return cb();
      });
    });

    afterEach(() => {
      stdout.mockRestore();
      stderr.mockRestore();
    });

    test('Test that Debug is printed to standard output.', async () => {
      await plugin.log('debug', 123, 'message');
      expect(stdout).toHaveBeenCalledWith(sprintf('%j\n', { tag: 'debug', timestamp: 123, message: 'message' }), 'UTF-8', expect.any(Function));
    });

    test('Test that Info is printed to standard output.', async () => {
      await plugin.log('info', 123, 'message');
      expect(stdout).toHaveBeenCalledWith(sprintf('%j\n', { tag: 'info', timestamp: 123, message: 'message' }), 'UTF-8', expect.any(Function));
    });

    test('Test that Warning is printed standard output.', async () => {
      await plugin.log('warning', 123, 'message');
      expect(stdout).toHaveBeenCalledWith(sprintf('%j\n', { tag: 'warning', timestamp: 123, message: 'message' }), 'UTF-8', expect.any(Function));
    });

    test('Test that error types are printed to error output.', async () => {
      const err = new Error('test test');
      await plugin.log('error', 123, 'message1');
      await plugin.log('critical', 1234, 'message2');
      await plugin.log('alert', 12345, 'message3');
      await plugin.log('emergency', 123456, 'message4', err);

      expect(stderr).toHaveBeenCalledTimes(4);
      expect(stderr).toHaveBeenNthCalledWith(1, sprintf('%j\n', { tag: 'error', timestamp: 123, message: 'message1' }), 'UTF-8', expect.any(Function));
      expect(stderr).toHaveBeenNthCalledWith(2, sprintf('%j\n', { tag: 'critical', timestamp: 1234, message: 'message2' }), 'UTF-8', expect.any(Function));
      expect(stderr).toHaveBeenNthCalledWith(3, sprintf('%j\n', { tag: 'alert', timestamp: 12345, message: 'message3' }), 'UTF-8', expect.any(Function));
      expect(stderr).toHaveBeenNthCalledWith(4, sprintf('%j\n', { tag: 'emergency', timestamp: 123456, message: 'message4', error: { message: err.message, stack: err.stack } }), 'UTF-8', expect.any(Function));
    });
  });

  describe('Test file output.', () => {
    afterEach(() => {
      jest.resetModules();
      jest.resetAllMocks();
    });

    test('Test file output.', async () => {
      fs.appendFile = jest.fn((path, text, callback) => {
        callback();
      });
      fs.mkdirSync = jest.fn(() => true);

      const fPlugin = new JsonPlugin('file/path/test.txt');
      const tags = [
        'error',
        'critical',
        'alert',
        'emergency',
        'warning',
        'debug',
        'info'
      ];

      let time = 10;
      for (const tag of tags) {
        await fPlugin.log(tag, time++, `This is a ${tag} message!`);
      }

      expect(fs.appendFile).toHaveBeenCalledTimes(7);
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        expect(fs.appendFile).toHaveBeenNthCalledWith(i + 1, expect.stringContaining('file/path/test.txt'), sprintf('%j\n', { tag: tag, timestamp: i + 10, message: `This is a ${tag} message!` }), expect.any(Function));
      }
    });
  });
});
