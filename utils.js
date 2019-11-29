const parseBasicAuth = basicAuth => {
  const base64Credentials = basicAuth.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");
  
  return {
      client_id: username,
      client_secret: password
    }
}

module.exports = {
  parseBasicAuth
};
