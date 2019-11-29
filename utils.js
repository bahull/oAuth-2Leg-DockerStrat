const parseBasicAuth = basicAuth => {
  // make authenticate path public
  // if (req.path === '/users/authenticate') {
  //     return next();
  // }

  // // check for basic auth header
  // if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
  //     return res.status(401).json({ message: 'Missing Authorization Header' });
  // }

  // verify auth credentials
  const base64Credentials = basicAuth.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");
  console.log("username, password: ", username, password);
  // const user = await userService.authenticate({ username, password });
  // if (!user) {
  //     return res.status(401).json({ message: 'Invalid Authentication Credentials' });
  // }

  // // attach user to request object
  // req.user = user

  // next();
  return {
      client_id: username,
      client_secret: password
    }
}

module.exports = {
  parseBasicAuth
};
