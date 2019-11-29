const router = require("express").Router();
const authController = require("./controller");
const { parseBasicAuth } = require("../utils");

router.post("/", (req, res) => {
  const { grant_type, client_id, client_secret } = req.body;
  const { authorization } = req.headers;
  let creds = {};

  if (grant_type !== "client_credentials") {
    res.status(400).send({
      error: "invalid_request",
      error_description: `grant_type of [${grant_type}] is unknown.`
    });
    return;
  }

  if (authorization) {
    creds = parseBasicAuth(authorization);
  } else if (client_id && client_secret) {
    creds = {
      client_id,
      client_secret
    };
  } else {
    res.status(400).send({
      error: "invalid_request",
      error_description:
        "Request was missing a required parameter: [grant_type, client_id andclient_secret or authorization header]"
    });
    return;
  }

  try {
    const data = authController.getToken(grant_type, creds);
    res.status(200).send(data);
  } catch (e) {
    if (e === "No user located") {
      res.sendStatus(401);
    } else {
      res.status(500).send(e);
    }
  }
});

router.post("/validate", (req, res) => {
  const { access_token } = req.body;
  try {
    const data = authController.validateToken(access_token);
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
