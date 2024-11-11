import { bcryptUtil } from './bcrypt.util';

describe('bcrypt util cases', () => {
  let hash123 = '';

  beforeAll(() => {
    // 123
    hash123 = '$2b$08$79T4t8dBxDHLrWLZBdTxg.j7kpAzZp5dyB67UhL2A1C5.j7RWCFf2';
  });

  afterAll(() => {
    hash123 = '';
  });

  it('bcrypt should be able to hash some random text', async () => {
    const result = await bcryptUtil.hashPassword('123');

    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should match some password with given hash text', async () => {
    const result = await bcryptUtil.matchPassword('123', hash123);

    expect(result).toBe(true);
  });

  it('should not match wrong password', async () => {
    const result = await bcryptUtil.matchPassword('1234', hash123);

    expect(result).toBe(false);
  });
});
