const controller = require("./controller");

describe("Auth Tests", () => {
  test("getToken returns appropriate data", () => {
    const result = controller.getToken("client_credentials", {
      client_id: "testing_123",
      client_secret: "secret"
    });
    const expectedResult = {
      access_token: expect.any(String),
      token_type: "bearer",
      expires_in: expect.any(Number),
      refresh_token: null,
      scope: null
    };

    expect(result).toEqual(expectedResult);
  });

  test("validateToken to return true if valid token is used", () => {
    const token = controller.getToken("client_credentials", {
      client_id: "testing_123",
      client_secret: "secret"
    });
    const result = controller.validateToken(token.access_token);
    expect(result).toBe(true);
  });

  test("validateToken to return throw if invalid token", () => {
    expect(() => {
      controller.validateToken("12a");
    }).toThrow();
  });
});
