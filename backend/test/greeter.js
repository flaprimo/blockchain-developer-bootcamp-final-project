const Greeter = artifacts.require("Greeter");
contract("Greeter", function (/* accounts */) {
  it("should assert true", async function () {
    await Greeter.deployed();
    return assert.isTrue(true);
  });
  describe("greet()", () => {
    it("returns 'Hello, World!'", async () => {
      const greeter = await Greeter.deployed();
      const expected = "Hello, World!";
      const actual = await greeter.greet();
      assert.equal(actual, expected, "greeted with'Hello, World!'");
    });
  });
});
