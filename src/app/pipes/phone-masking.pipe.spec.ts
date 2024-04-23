import { PhoneMaskingPipe } from './phone-masking.pipe';

describe('PhoneMaskingPipe', () => {
  it('create an instance', () => {
    const pipe = new PhoneMaskingPipe();
    expect(pipe).toBeTruthy();
  });
});
