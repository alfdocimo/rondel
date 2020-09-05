const assertions = {
  Equals: (object, value) => object === value,
  IsNull: (object) => object === null,
  IsUndefined: (object) => object === undefined,
  IsEmpty: (object) => object === 0,
  Includes: (object, value) => object.includes(value),
  IsLowerThan: (object, value) => object < value,
  IsGreaterThan: (object, value) => object > value,
};
const assertionNames = Object.keys(assertions);

export { assertionNames, assertions };
