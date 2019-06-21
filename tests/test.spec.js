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
      modifiers: { exposeEmptyObj: false, setNotAllowed: false }
    });
    myObj.age = 300;
    expect(myObj.doesNotExist).toEqual("unset property");
  } catch (e) {
    expect(e).toEqual(new RangeError("The age seems invalid"));
  }
});
