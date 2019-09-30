import JsonPlugin from '../src/node/index';
import sprintf from '@jitesoft/sprintf';

const plugin = new JsonPlugin();

describe('Test node plugin.', () => {
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
    expect(stdout).toHaveBeenCalledWith(sprintf('%j', { tag: 'debug', timestamp: 123, message: 'message' }), 'UTF-8', expect.any(Function));
  });

  test('Test that Info is printed to standard output.', async () => {
    await plugin.log('info', 123, 'message');
    expect(stdout).toHaveBeenCalledWith(sprintf('%j', { tag: 'info', timestamp: 123, message: 'message' }), 'UTF-8', expect.any(Function));
  });

  test('Test that Warning is printed standard output.', async () => {
    await plugin.log('warning', 123, 'message');
    expect(stdout).toHaveBeenCalledWith(sprintf('%j', { tag: 'warning', timestamp: 123, message: 'message' }), 'UTF-8', expect.any(Function));
  });

  test('Test that error types are printed to error output.', async () => {
    await plugin.log('error', 123, 'message1');
    await plugin.log('critical', 1234, 'message2');
    await plugin.log('alert', 12345, 'message3');
    await plugin.log('emergency', 123456, 'message4');

    expect(stderr).toHaveBeenCalledTimes(4);
    expect(stderr).toHaveBeenNthCalledWith(1, sprintf('%j', { tag: 'error', timestamp: 123, message: 'message1' }), 'UTF-8', expect.any(Function));
    expect(stderr).toHaveBeenNthCalledWith(2, sprintf('%j', { tag: 'critical', timestamp: 1234, message: 'message2' }), 'UTF-8', expect.any(Function));
    expect(stderr).toHaveBeenNthCalledWith(3, sprintf('%j', { tag: 'alert', timestamp: 12345, message: 'message3' }), 'UTF-8', expect.any(Function));
    expect(stderr).toHaveBeenNthCalledWith(4, sprintf('%j', { tag: 'emergency', timestamp: 123456, message: 'message4' }), 'UTF-8', expect.any(Function));
  });
});
