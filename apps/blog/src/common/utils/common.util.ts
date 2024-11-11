export const commonUtil = {
  deepFreeze,
};

function deepFreeze<T = any>(obj: T): T {
  // Freeze the object itself
  Object.freeze(obj);

  // Recursively freeze nested objects
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    if (
      obj.hasOwnProperty(prop) &&
      obj[prop] !== null &&
      (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
      !Object.isFrozen(obj[prop])
    ) {
      deepFreeze(obj[prop]);
    }
  });

  return obj;
}
