
let middleware = async (req, res, next) => {
  console.log(req.headers.authorization, '\n\n\n');
  var tok = req.headers['api-token'] || req.body['api-token'] || req.headers.authorization || req.header.Authorization;
  if (!tok) return res.status(403).json({ auth: false, message: 'Access Denied, No token provided.' + tok, error: 'Access Denied, No token provided' });
  else if (req.headers['api-token']) { var token = tok.split(' ')[1]; }
  else if (req.headers.authorization) { token = tok.split(' ')[1]; }
  else if (req.headers.Authorization) { token = tok.split(' ')[1]; }
  else { token = tok; }
  if (!token) return res.status(403).json({ auth: false, message: 'Access Denied, No token provided.', error: 'Access Denied, No token provided' });

  let valid = await Validate(token);
  if (!valid) return res.status(401).json({ error: "innvalid access token" });
  if (valid) next();
};

let Validate = async (token) => {
  console.log('token====>', token, '\n\n\n\n\n')
  if(token === '1234567890qwertyuiopasdfghhjkzxcvbnmkajahsgasfas')return true;
  return false;
};

module.exports = middleware;