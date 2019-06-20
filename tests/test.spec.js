import Rondel from "../src/index";

const rondel = new Rondel();
test("Runs without crashing", () => {
  expect(rondel).toBeDefined();
});

it("createProtected", () => {
  try {
    const human = { name: "John" };
    const myObj = rondel.createProtected({
      obj: human,
      modifiers: { exposeEmptyObj: false, setNotAllowed: false }
    });
    console.log(myObj.doesNotExist);
    console.log(myObj.name);
    myObj.age = 300;
    expect(myObj.doesNotExist).toEqual("unset property");
  } catch (e) {
    expect(e).toEqual(new RangeError("The age seems invalid"));
  }
});
