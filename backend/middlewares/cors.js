const whitelist = [
  'http://spanko.mesto.nomoredomains.monster',
  'https://spanko.mesto.nomoredomains.monster',
  'http://localhost:3000',
  'https://localhost:3000',
];

module.exports = (req, callback) => {
  let corsOptions;
  if (whitelist.includes(req.header('Origin'))) {
    corsOptions = {
      origin: true,
      credentials: true,
    };
  } else {
    corsOptions = {
      origin: false,
      credentials: true,
    };
  }
  callback(null, corsOptions);
};
