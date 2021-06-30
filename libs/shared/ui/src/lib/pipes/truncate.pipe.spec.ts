import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;
  const inputNotGitHub =
    'https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh';
  const inputGitHub = 'https://github.com/testing-library/angular-testing-library';

  beforeAll(() => {
    pipe = new TruncatePipe();
  });
  test('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  test('truncate long text to given length', () => {
    const actual = pipe.transform(inputNotGitHub, 20);
    expect(actual).toHaveLength(20 + 3);
    expect(actual.endsWith('...')).toBe(true);
  });
  test('truncate long text to given length from the end', () => {
    const actual: string = pipe.transform(inputNotGitHub, 20, true);
    expect(actual).toHaveLength(20 + 3);
    expect(actual.startsWith('...')).toBe(true);
  });
  test('Remove substring first', () => {
    const actual = pipe.transform(inputGitHub, 20, false, 'https://github.com/');
    expect(actual).toHaveLength(20 + 3);
    expect(actual.endsWith('...')).toBe(true);
    expect(actual.startsWith('https://github.com/')).toBe(false);
  });
});
