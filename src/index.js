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

    // if undefined return empty object
    const {
      exposeDefault = "unset property",
      exposeEmptyObj,
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
        return prop in obj ? obj[prop] : exposeEmptyObj ? {} : exposeDefault;
      }
    };
    return new Proxy(obj, _handler);
  };
}

export default Rondel;
