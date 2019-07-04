import camelcase from 'camelcase';

class Rondel {
  constructor() {}

  createProtected = ({ obj, modifiers = {} }) => {
    // validate that the parameters are correct in order to invoke createProtected();
    if (typeof obj !== 'object' || typeof modifiers !== 'object')
      throw new Error('Parameters supplied are either not objects or not correctly named');

    // exposeDefault: can be used to set the default value of an unset prop for an object
    // setNotAllowed: used to protect object from any kind of set operation
    // restrictedPrivates: used to protect properties that use "_" as they are private properties. Set to true by default
    // validateTypes: triggers type validation. Set to false by default
    // are<Type>: array of props that are of that type.

    const {
      exposeDefault = 'unset property',
      setNotAllowed = false,
      restrictedPrivates = true,
      validateTypes = false,
      areStrings = [],
      areNumbers = [],
      areObjects = [],
    } = modifiers;

    const validPropsObj = [
      { propArray: areStrings, type: 'string' },
      { propArray: areNumbers, type: 'number' },
      { propArray: areObjects, type: 'object' },
    ];

    // aux function to validate props

    const validateProp = (validPropArray, key, value, type) =>
      validPropArray.includes(key) && typeof value !== type;

    const _handler = {
      set: (_obj, key, value) => {
        if (restrictedPrivates && key[0] === '_') {
          throw new Error(`Invalid attempt to set private "${key}" property`);
        }

        if (setNotAllowed) {
          throw new Error('Not allowed to set properties to this object');
        }

        // if triggered, go through all validPropsObj and check types
        if (validateTypes) {
          validPropsObj.forEach(({ propArray, type }) => {
            if (validateProp(propArray, key, value, type)) {
              throw new TypeError(`Expected a ${type} value for property ${key}`);
            }
          });
        }

        return (_obj[key] = value);
      },
      get: (_obj, prop) => {
        return prop in _obj ? _obj[prop] : exposeDefault;
      },
    };
    return new Proxy(obj, _handler);
  };

  getProtected = (arr) => {
    // TODO implement findOne to only return the first match instead of all

    const prefix = 'findWhere';
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

    return new Proxy(arr, {
      get(target, propKey) {
        if (propKey in target) return target[propKey];
        const assertionName = assertionNames.find((assertion) => propKey.endsWith(assertion));
        if (propKey.startsWith(prefix)) {
          const field = camelcase(
            propKey.substring(prefix.length, propKey.length - assertionName.length),
          );
          const assertion = assertions[assertionName];
          return (value) => {
            return target.filter((item) => assertion(item[field], value));
          };
        }
      },
    });
  };
}

export default Rondel;
