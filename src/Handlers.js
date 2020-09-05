import camelcase from 'camelcase';

class Handlers {
  constructor() {}

  getObjHandler({ modifiers }) {
    const {
      exposeDefault = 'unset property',
      setNotAllowed = false,
      restrictedPrivates = true,
      validateTypes = false,
      areStrings = [],
      areNumbers = [],
      areObjects = [],
      areBooleans = [],
    } = modifiers;

    const validPropsObj = [
      { propArray: areStrings, type: 'string' },
      { propArray: areNumbers, type: 'number' },
      { propArray: areObjects, type: 'object' },
      { propArray: areBooleans, type: 'boolean' },
    ];

    return {
      set: (_obj, key, value) => {
        if (restrictedPrivates && key[0] === '_') {
          throw new Error(`Invalid attempt to set private "${key}" property`);
        }

        if (setNotAllowed) {
          throw new Error('Not allowed to set properties to this object');
        }

        const validateProp = (validPropArray, key, value, type) =>
          validPropArray.includes(key) && typeof value !== type;

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
  }

  getArrayHandler({ assertionNames, assertions, prefix }) {
    return {
      get: (target, propKey) => {
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
    };
  }
}

export default Handlers;
