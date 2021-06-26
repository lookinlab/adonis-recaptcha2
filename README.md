# Adonis ReCAPTCHA v2

Verifier for Google reCAPTCHA v2. Not working with ReCAPTCHA Enterprise or v3
> Works with AdonisJS v4 (legacy)

## Installation
Make sure to install it using [`adonis-cli`](https://github.com/adonisjs/adonis-cli), `npm` or `yarn`.

```bash
# adonis
adonis install adonis-recaptcha2@legacy

# npm
npm i adonis-recaptcha2@legacy

# yarn
yarn add adonis-recaptcha2@legacy
```

## How to use

### Step 1: Get secret and site keys
You need to receive your `siteKey` and `secretKey` for your domain from [Google reCAPTCHA v3 Admin Console](https://www.google.com/recaptcha/admin)

Login and Follow the steps on this page to include the reCAPTCHA on your website.

### Step 2: Initialization
- Make sure to register the provider inside `start/app.js` file.
```js
const providers = [
  'adonis-recaptcha2/providers/RecaptchaProvider'
]
```

- Add a variables to `.env` file of project.
```txt
...

RECAPTCHA_SITE_KEY=YOUR_KEY
RECAPTCHA_SECRET_KEY=YOUR_KEY
```

- Set options in `config/recaptcha.js`.
```js
const Env = use('Env')

module.exports = {
  ...
  siteKey: Env.get('RECAPTCHA_SITE_KEY'),
  ...
  secretKey: Env.get('RECAPTCHA_SECRET_KEY')
}
```

### Step 3: Add middleware for `start/routes.js`
Example:
```js
Route.post('login', 'AuthController.login').middleware(['recaptcha'])
```

This middleware be check `g-recaptcha-response` field in body request
```json
{
  "login": "admin",
  "password": "admin",
  "g-recaptcha-response": "osjoiadjaoisdjasijda..."
}
```
> Field `g-recaptcha-response` it is Google reCAPTCHA response

## Use on client in View
> **Note:** Require `Adonis/Src/View` from [`adonis-framework`](https://github.com/adonisjs/adonis-framework)

### Step 1: Enable `client` in `config/recaptcha.js`
```js
module.exports = {
  ... 
  client: true
}
```

### Step 2: Use `recaptcha()` function in views
```html
...
<head>
  ...
  {{ recaptcha('script') }}
</head>
<body>
  <section>
    ...
    <form action="/login">
      ...
      {{ recaptcha('form') }}
    </form>
  </section>
</body>
</html>
```
