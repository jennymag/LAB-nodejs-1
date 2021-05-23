const expect = require("chai").expect;
const request = require("request");

describe("Increase counter by one api", () => {
  const url = "http://localhost:3000/api/increase";

  it("return status 200", (done) => {
    request(url, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it("return json format data", (done) => {
    request(url, (err, res, body) => {
      const contentType = res.headers["content-type"];
      expect(contentType).includes("application/json");
      done();
    });
  });

  it("check if increased", (done) => {
    request(url, (err, res, body) => {
      let { oldValue, newValue } = JSON.parse(body);
      expect(+newValue).to.equal(+oldValue + 1);
      done();
    });
  });
});
