import { AgedPipe } from './aged.pipe';

describe('AgedPipe', () => {
  it('create an instance', () => {
    const pipe = new AgedPipe();
    expect(pipe).toBeTruthy();
  });
});
