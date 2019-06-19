import Rondel from "../src/index";

const rondel = new Rondel();
test("Runs without crashing", () => {
  expect(rondel).toBeDefined();
});

it("createProtected", async () => {
  const human = { name: "John" };
  const myObj = rondel.createProtected({
    obj: human,
    modifiers: { exposeEmptyObj: false, setNotAllowed: false }
  });
  console.log(myObj.doesNotExist);
  console.log(myObj.name);
  myObj.age = 100;
  console.log(myObj.age);
});
