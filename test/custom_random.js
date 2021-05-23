const expect = require("chai").expect;
const request = require("request");

describe("Get random number between 0 and X", () => {
  const url = "http://localhost:3000/api/random";

  it("return json format data", (done) => {
    request(url, (err, res, body) => {
      const contentType = res.headers["content-type"];
      expect(contentType).includes("application/json");
      done();
    });
  });

  it("Is number at least 0", (done) => {
    request(url, (err, res, body) => {
      let { number } = JSON.parse(body);
      expect(+number).to.be.at.least(0);
      done();
    });
  });
});
