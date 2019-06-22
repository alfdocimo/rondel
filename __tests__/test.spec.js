import Rondel from "../src/index";

const rondel = new Rondel();
test("Runs without crashing", () => {
  expect(rondel).toBeDefined();
});

it("should create protected object", () => {
  try {
    const human = { name: "John" };
    const myObj = rondel.createProtected({
      obj: human,
      modifiers: {}
    });
    myObj.age = 300;
    expect(myObj.doesNotExist).toEqual("unset property");
  } catch (e) {
    expect(e).toEqual(new RangeError("The age seems invalid"));
  }
});

describe("should be able to control default props from exposeDefault", () => {
  it("returns null from unset prop", () => {
    const myObj = rondel.createProtected({
      obj: { id: 1, value: "Random value" },
      modifiers: { exposeDefault: null }
    });
    expect(myObj.doesNotExist).toEqual(null);
  });
  it("returns empty string from unset prop", () => {
    const myObj = rondel.createProtected({
      obj: { id: 1, value: "Random value" },
      modifiers: { exposeDefault: "" }
    });
    expect(myObj.doesNotExist).toEqual("");
  });
  it("returns empty array from unset prop", () => {
    const myObj = rondel.createProtected({
      obj: { id: 1, value: "Random value" },
      modifiers: { exposeDefault: [] }
    });
    expect(myObj.doesNotExist).toEqual([]);
    expect(myObj.values.map).toBeTruthy();
    expect(myObj.value.map).toBeFalsy();
  });
});
