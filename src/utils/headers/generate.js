const Joi = require('@hapi/joi');
const base64 = require('js-base64').Base64;

const _instance = Joi.string();
const _email = Joi.string().email();
const _password = Joi.string().min(1);
const _token = Joi.string().min(1);

module.exports = (options = {}) => {
  const { error } = Joi.object({
    instance: _instance,
    email: _email.required(),
    password: _password,
    token: _token
  })
    .xor('password', 'token')
    .validate(options);
  if (error) throw new Error(error.details[0].message);

  // Allow for either 'password' or 'token' for authentication
  const { email, password, token } = options;
  const auth = token ? `${email}/token:${token}` : `${email}:${password}`;
  const encoded = base64.encode(auth);

  // default to 'application/json', override when needed
  return {
    'Content-Type': 'application/json',
    Authorization: `Basic ${encoded}`
  };
};
