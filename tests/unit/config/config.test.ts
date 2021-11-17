import { config } from '../../../src/config/config';

describe('Application Config', () => {
  it('should return config', () => {
    expect(config.env).toBe('test');
    expect(config.mongoose).toBeDefined();
  });
});
