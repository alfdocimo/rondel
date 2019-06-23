import camelcase from "camelcase";

class Rondel {
  constructor() {}

  createProtected = ({ obj, modifiers }) => {
    // validate that the parameters are correct
    if (typeof obj !== "object" || typeof modifiers !== "object")
      throw new Error(
        "Parameters supplied are either not objects or not correctly named"
      );

    // exposeDefault can be used to set the default value of an unset prop for an object
    const {
      exposeDefault = "unset property",
      setNotAllowed = false
    } = modifiers;

    const _handler = {
      set: _obj => {
        if (setNotAllowed)
          throw new Error("Not allowed to set properties to this object");
      },
      get: (_obj, prop) => {
        return prop in _obj ? _obj[prop] : exposeDefault;
      }
    };
    return new Proxy(obj, _handler);
  };

  getProtected = arr => {
    const prefix = "findWhere";
    const assertions = {
      Equals: (object, value) => object === value,
      IsNull: object => object === null,
      IsUndefined: object => object === undefined,
      IsEmpty: object => object === 0,
      Includes: (object, value) => object.includes(value),
      IsLowerThan: (object, value) => object < value,
      IsGreaterThan: (object, value) => object > value
    };
    const assertionNames = Object.keys(assertions);

    return new Proxy(arr, {
      get(target, propKey) {
        if (propKey in target) return target[propKey];
        const assertionName = assertionNames.find(assertion =>
          propKey.endsWith(assertion)
        );
        if (propKey.startsWith(prefix)) {
          const field = camelcase(
            propKey.substring(
              prefix.length,
              propKey.length - assertionName.length
            )
          );
          const assertion = assertions[assertionName];
          return value => {
            return target.filter(item => assertion(item[field], value));
          };
        }
      }
    });
  };
}

export default Rondel;
