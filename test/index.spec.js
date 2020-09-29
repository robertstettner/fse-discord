const util = require("util");
const path = require("path");
const { assert } = require("chai");
const readFile = util.promisify(require("fs").readFile);
const undertest = require("../index");
const expectedAircraft = require("./fixtures/aircraft_expected.json");

describe("FSE Discord", () => {
  describe("parseAircraft", () => {
    it("should parse multiple aircraft from XML format", async () => {
      const xml = await readFile(
        path.resolve("test/fixtures/aircraft.xml"),
        "utf8"
      );
      const actual = await undertest.parseAircraft(xml);
      assert.deepEqual(actual, expectedAircraft);
    });
  });
});
