# Adonis ReCAPTCHA v2 Middleware

[![Greenkeeper badge](https://badges.greenkeeper.io/lookinlab/adonis-recaptcha2.svg)](https://greenkeeper.io/)

> Verifier for Google reCAPTCHA version 2 based on [recaptcha2](https://github.com/fereidani/recaptcha2)

## Installation
Make sure to install it using `adonis-cli`, `npm` or `yarn`.

```bash
# adonis
adonis install adonis-recaptcha2

# npm
npm i adonis-recaptcha2

# yarn
yarn add adonis-recaptcha2
```

## How to use

### Step 1: Get secret and site keys
You need to receive your site key and secret key for your domain from [Google reCAPTCHA](https://www.google.com/recaptcha)

Login and Follow the steps on this page to include the reCAPTCHA on your website.

### Step 2: Initialization
- Make sure to register the provider inside `start/app.js` file.
```js
const providers = [
  'adonis-recaptcha2/providers/RecaptchaProvider'
]
```

- Add to named middleware inside `start/kernel.js` file.
```js
const namedMiddleware = {
  recaptcha: 'Adonis/Middleware/Recaptcha'
}
```

- Add a variables to `.env` file of project:
```txt
...

RECAPTCHA_SITE_KEY=YOUR_KEY
RECAPTCHA_SECRET_KEY=YOUR_KEY
```

- Set options in `config/recaptcha.js`
```js
const Env = use('Env')

module.exports = {
  ...
  siteKey: Env.get('RECAPTCHA_SITE_KEY'),
  ...
  secretKey: Env.get('RECAPTCHA_SECRET_KEY')
}
```

### Step 3: Add middleware to routes `start/routes.js`
Example:
```js
 Route.post('login', 'AuthController.login').middleware(['recaptcha'])
```

This middleware be check `recaptcha` field in body request
```json
{
  "login": "admin",
  "password": "admin",
  "recaptcha": "osjoiadjaoisdjasijda..."
}
```
> field `recaptcha` it is Google reCAPTCHA response
