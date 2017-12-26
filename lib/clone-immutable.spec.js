import cloneImmutable from './clone-immutable';

describe('cloneImmutable', () => {
  let result;
  let input;

  beforeEach(() => {
    input = {
      sub1: {
        a: 1,
        b: 2,
      },
      sub2: [
        { id: 1 },
      ],
    };
    result = cloneImmutable(input);
  });

  it('should result in the equal props', () => {
    expect(result)
      .toEqual(input);
  });

  it('should not be the same instance recursively', () => {
    const check = (actual, notExpected, path) => {
      if (actual !== null && typeof actual === 'object') {
        expect(actual)
          .not.toBe(notExpected);

        Object.keys(actual)
          .forEach(prop => check(actual[prop], notExpected[prop], `${path}.${prop}`));
      }
    };

    check(result, input, '');
  });

  const checkWritable = (target, prop) =>
    // eslint-disable-next-line
    expect(() => target[prop] = 1)
      .not.toThrow();

  const checkNonWritable = (target, prop) =>
    // eslint-disable-next-line
    expect(() => target[prop] = 1)
      .toThrow();

  it('should freeze prop', () => {
    checkNonWritable(result, 'sub1');
  });

  it('should freeze array', () => {
    checkNonWritable(result.sub2, 'length');

    expect(() => result.sub2.push({}))
      .toThrow();
  });

  it('should freeze array item prop', () => {
    checkNonWritable(result.sub2[0], 'id');
  });

  it('should allow setting a prop', () => {
    checkWritable(result, 'name');
  });

  it('should allow setting on array item', () => {
    checkWritable(result.sub2[0], 'name');
  });
});
