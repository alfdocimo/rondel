class Rondel {
  constructor() {
    console.log("Library constructor loaded");
  }

  createProtected = ({ obj, modifiers }) => {
    // validate that the parameters are correct
    if (typeof obj !== "object" || typeof modifiers !== "object") {
      console.error(
        "Please make sure to provide a valid object to the function"
      );
      return null;
    }

    // exposeDefault can be used to set the default value of an unset prop for an object
    const {
      exposeDefault = "unset property",
      setNotAllowed
    } = modifiers;

    const _handler = {
      set: (obj, prop, value) => {
        if (setNotAllowed) throw new Error("Not allowed to set this property!");
        if (prop === "age") {
          if (!Number.isInteger(value)) {
            throw new TypeError("The age is not an integer");
          }
          if (value > 200) {
            throw new RangeError("The age seems invalid");
          }
        }

        // The default behavior to store the value
        obj[prop] = value;

        // Indicate success
        return true;
      },
      get: (obj, prop) => {
        return prop in obj ? obj[prop] : exposeDefault;
      }
    };
    return new Proxy(obj, _handler);
  };
}

export default Rondel;
