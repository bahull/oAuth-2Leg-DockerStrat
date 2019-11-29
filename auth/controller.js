const crypto = require("crypto");

const data = [
  //outstanding tokens
];

const allowedUsers = [
  {
    client_id: "testing_123",
    client_secret: "secret"
  }
];

const getToken = (grant_type, { client_id, client_secret }) => {
  let userAuth =
    allowedUsers.findIndex(
      curr =>
        curr.client_id === client_id && curr.client_secret === client_secret
    ) >= 0
      ? true
      : false;

  if (!userAuth) {
    throw `No user located`;
  }

  const authToken = crypto.randomBytes(16).toString("hex");
  const today = new Date();
  today.setHours(today.getHours() + 4);
  data.push({
    access_token: authToken,
    expires_on: today.getTime()
  });
  return {
    access_token: authToken,
    token_type: "bearer",
    expires_in: 14400000,
    refresh_token: null,
    scope: null
  };
};

const validateToken = access_token => {
  const tokenValidity = data.find(curr => curr.access_token === access_token);
  if (!tokenValidity) {
    throw `Invalid token`;
  }
  const tokenIsNotExpired = tokenValidity.expires_on >= Date.now();
  if (!tokenIsNotExpired) {
    throw `Token is expired. Please request a new token.`;
  }

  return true;
};

module.exports = {
  getToken,
  validateToken
};
