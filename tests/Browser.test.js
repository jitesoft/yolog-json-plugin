/**
 * @jest-environment jsdom
 */
import JsonPlugin from '../src/web/index';
const plugin = new JsonPlugin();

describe('Test web plugin.', () => {
  test('that Debug is printed to standard console.', async () => {
    window.console.log = jest.fn();
    await plugin.log('debug', 123, 'message');
    expect(window.console.log).toHaveBeenCalledWith({ tag: 'debug', timestamp: 123, message: 'message' });
  });

  test('that Info is printed to the info console.', async () => {
    window.console.info = jest.fn();
    await plugin.log('info', 123, 'message');
    expect(window.console.info).toHaveBeenCalledWith({ tag: 'info', timestamp: 123, message: 'message' });
  });

  test('that Warning is printed to the warn console.', async () => {
    window.console.warn = jest.fn();
    await plugin.log('warning', 123, 'message');
    expect(window.console.warn).toHaveBeenCalledWith({ tag: 'warning', timestamp: 123, message: 'message' });
  });

  test('that error types are printed to the error console.', async () => {
    window.console.error = jest.fn();
    await plugin.log('error', 123, 'message1');
    await plugin.log('critical', 1234, 'message2');
    await plugin.log('alert', 12345, 'message3');
    await plugin.log('emergency', 123456, 'message4');

    expect(window.console.error).toHaveBeenCalledTimes(4);
    expect(window.console.error).toHaveBeenNthCalledWith(1, { tag: 'error', timestamp: 123, message: 'message1' });
    expect(window.console.error).toHaveBeenNthCalledWith(2, { tag: 'critical', timestamp: 1234, message: 'message2' });
    expect(window.console.error).toHaveBeenNthCalledWith(3, { tag: 'alert', timestamp: 12345, message: 'message3' });
    expect(window.console.error).toHaveBeenNthCalledWith(4, { tag: 'emergency', timestamp: 123456, message: 'message4' });
  });
});
