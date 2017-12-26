export default function cloneImmutable(input) {
  if (input === null || typeof input !== 'object') {
    return input;
  }

  if (Array.isArray(input)) {
    return Object.freeze([...input.map(cloneImmutable)]);
  }

  return Object.keys(input)
    .reduce(
      (result, prop) => {
        const desc = Object.getOwnPropertyDescriptor(input, prop);
        desc.configurable = false;
        desc.writable = false;
        if (desc.value !== undefined) {
          desc.value = cloneImmutable(desc.value);
        } else if (typeof desc.get === 'function' && typeof desc.set === 'function') {
          desc.set = () => {
          };
        }
        Object.defineProperty(result, prop, desc);
        return result;
      },
      {});
}
