import Rondel from '../src/index';

const rondel = new Rondel();
test('Runs without crashing', () => {
  expect(rondel).toBeDefined();
});

describe('should validate types', () => {
  it('should throw error if params are not specified type', () => {
    try {
      const myObj = rondel.createProtected({
        obj: { name: 'John', lastName: 'Doe' },
        modifiers: { validateTypes: true, areStrings: ['lastName', 'name'] },
      });
      myObj.name = 123;
    } catch (error) {
      expect(error).toEqual(new TypeError('Expected a string value for property name'));
    }
  });

  it('should throw error if params are not specified type', () => {
    try {
      const myObj = rondel.createProtected({
        obj: { name: 'John', lastName: 'Doe', age: 23 },
        modifiers: { validateTypes: true, areStrings: ['lastName', 'name'], areNumbers: ['age'] },
      });
      myObj.age = 'invalid age';
    } catch (error) {
      expect(error).toEqual(new TypeError('Expected a number value for property age'));
    }
  });

  it('should throw error if params are not specified type', () => {
    try {
      const myCar = rondel.createProtected({
        obj: { type: 'Opel', year: 2007 },
        modifiers: {
          validateTypes: true,
          areStrings: ['type'],
          areNumbers: ['year'],
        },
      });
      const myObj = rondel.createProtected({
        obj: { name: 'John', lastName: 'Doe', age: 23, car: myCar },
        modifiers: {
          validateTypes: true,
          areStrings: ['John'],
          areNumbers: ['age'],
          areObjects: ['car'],
        },
      });

      myObj.car.type = 123;
    } catch (error) {
      expect(error).toEqual(new TypeError('Expected a string value for property type'));
    }
  });
});

it('should throw error if params are not correct', () => {
  try {
    rondel.createProtected({ name: 'John', lastName: 'Doe' });
  } catch (e) {
    expect(e).toEqual(
      new Error('Parameters supplied are either not objects or not correctly named'),
    );
  }
});

it('should be able to create an object without a modifiers obj', () => {
  const myObj = rondel.createProtected({
    obj: { name: 'John', lastName: 'Doe' },
  });
  myObj.name = 'Maria';
  expect(myObj.name).toEqual('Maria');
});

it('should create protected object', () => {
  const human = { name: 'John', lastName: 'Doe' };
  const myObj = rondel.createProtected({
    obj: human,
    modifiers: {},
  });
  expect(myObj.doesNotExist).toEqual('unset property');
});

it('should create protected object and throw error', () => {
  try {
    const human = { name: 'John', lastName: 'Doe' };
    const myObj = rondel.createProtected({
      obj: human,
      modifiers: { setNotAllowed: true },
    });
    myObj.settingProp = 'value';
  } catch (e) {
    expect(e).toEqual(new Error('Not allowed to set properties to this object'));
  }
});

it('should not allow to set private property', () => {
  try {
    const human = { name: 'John', _secretProp: 'shhh!' };
    const myObj = rondel.createProtected({
      obj: human,
      modifiers: { restrictedPrivates: true },
    });
    myObj.nonSecretProp = 'Hey there!';
    myObj._secretProp = 'Very obvious value';
  } catch (e) {
    expect(e).toEqual(new Error(`Invalid attempt to set private "_secretProp" property`));
  }
});

describe('should be able to control default props from exposeDefault', () => {
  it('returns null from unset prop', () => {
    const myObj = rondel.createProtected({
      obj: { id: 1, value: 'Random value' },
      modifiers: { exposeDefault: null },
    });
    expect(myObj.doesNotExist).toEqual(null);
  });
  it('calls spyFunction from unset prop', () => {
    const spyFunction = jest.fn();
    const myObj = rondel.createProtected({
      obj: { id: 1, value: 'Random value' },
      modifiers: { exposeDefault: spyFunction },
    });
    myObj.doesNotExist();
    expect(spyFunction).toHaveBeenCalled();
  });
  it('returns empty string from unset prop', () => {
    const myObj = rondel.createProtected({
      obj: { id: 1, value: 'Random value' },
      modifiers: { exposeDefault: '' },
    });
    expect(myObj.doesNotExist).toEqual('');
  });
  it('returns empty array from unset prop', () => {
    const myObj = rondel.createProtected({
      obj: { id: 1, value: 'Random value' },
      modifiers: { exposeDefault: [] },
    });
    expect(myObj.doesNotExist).toEqual([]);
    expect(myObj.values.map).toBeTruthy();
    expect(myObj.value.map).toBeFalsy();
  });
});

describe('should be able to interact with Objects through getProtected', () => {
  const arr = rondel.getProtected([
    {
      name: 'John',
      age: 30,
      skills: ['React', 'Node'],
      position: 'Sr Dev',
      salary: 100000,
    },
    { name: 'Mathew', age: 26, skills: ['JavaScript'], salary: 0 },
    {
      name: 'Claudia',
      nationality: null,
      age: 33,
      skills: ['AWS', 'Azure', 'DevOps', 'JavaScript'],
      salary: 80000,
    },
  ]);

  it('findWhereXEquals', () => {
    expect(arr.findWhereNameEquals('John')).toEqual([
      {
        name: 'John',
        age: 30,
        skills: ['React', 'Node'],
        position: 'Sr Dev',
        salary: 100000,
      },
    ]);
  });

  it('findWhereXIsNull', () => {
    expect(arr.findWhereNationalityIsNull()).toEqual([
      {
        name: 'Claudia',
        nationality: null,
        age: 33,
        skills: ['AWS', 'Azure', 'DevOps', 'JavaScript'],
        salary: 80000,
      },
    ]);
  });

  it('findWhereXIsUndefined', () => {
    expect(arr.findWherePositionIsUndefined()).toEqual([
      { name: 'Mathew', age: 26, skills: ['JavaScript'], salary: 0 },
      {
        name: 'Claudia',
        nationality: null,
        age: 33,
        skills: ['AWS', 'Azure', 'DevOps', 'JavaScript'],
        salary: 80000,
      },
    ]);
  });

  it('findWhereXIsEmpty', () => {
    expect(arr.findWhereSalaryIsEmpty()).toEqual([
      { name: 'Mathew', age: 26, skills: ['JavaScript'], salary: 0 },
    ]);
  });

  it('findWhereXIncludes', () => {
    expect(arr.findWhereSkillsIncludes('JavaScript')).toEqual([
      { name: 'Mathew', age: 26, skills: ['JavaScript'], salary: 0 },
      {
        name: 'Claudia',
        nationality: null,
        age: 33,
        skills: ['AWS', 'Azure', 'DevOps', 'JavaScript'],
        salary: 80000,
      },
    ]);
  });

  it('findWhereXIsLowerThan', () => {
    expect(arr.findWhereSalaryIsLowerThan(90000)).toEqual([
      { name: 'Mathew', age: 26, skills: ['JavaScript'], salary: 0 },
      {
        name: 'Claudia',
        nationality: null,
        age: 33,
        skills: ['AWS', 'Azure', 'DevOps', 'JavaScript'],
        salary: 80000,
      },
    ]);
  });

  it('findWhereXIsGreaterThan', () => {
    expect(arr.findWhereSalaryIsGreaterThan(90000)).toEqual([
      {
        name: 'John',
        age: 30,
        skills: ['React', 'Node'],
        position: 'Sr Dev',
        salary: 100000,
      },
    ]);
  });
});
