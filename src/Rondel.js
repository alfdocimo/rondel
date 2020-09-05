import { assertionNames, assertions } from './constants';

class Rondel {
  constructor(handlers) {
    this.handlers = handlers;
  }

  protected({ obj, modifiers }) {
    if (typeof obj !== 'object' || typeof modifiers !== 'object')
      throw Error('Parameters supplied are either not objects or not correctly named');

    return new Proxy(obj, this.handlers.getObjHandler({ modifiers }));
  }

  searchable({ arr, prefix = 'findWhere' }) {
    return new Proxy(arr, this.handlers.getArrayHandler({ assertionNames, assertions, prefix }));
  }
}

export default Rondel;
