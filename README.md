# Adonis ReCAPTCHA v2

[![npm-image]][npm-url] [![license-image]][license-url] [![typescript-image]][typescript-url]

Verifier for Google ReCAPTCHA v2. Not working with ReCAPTCHA Enterprise or v3

Docs [for **Adonis v4**](https://github.com/lookinlab/adonis-recaptcha2/tree/v1)

## Installation

Make sure to install it using `npm` or `yarn`.

```bash
# npm
npm i adonis-recaptcha2
node ace configure adonis-recaptcha2

# yarn
yarn add adonis-recaptcha2
node ace configure adonis-recaptcha2
```

## How to use

### Step 1: Get secret and site keys

You need to receive your `siteKey` and `secretKey` for your domain from [Google reCAPTCHA v3 Admin Console](https://www.google.com/recaptcha/admin)

Login and Follow the steps on this page to include the reCAPTCHA on your website.

### Step 2: Initialization

- Make sure to register the provider inside `.adonisrc.json` file.

```json
{
  "providers": [
    "...other packages",
    "adonis-recaptcha2"
  ] 
}
```

- Add variables to `.env` file of project.

```txt
...
RECAPTCHA_SITE_KEY=YOUR_KEY
RECAPTCHA_SECRET_KEY=YOUR_KEY
```

- Add fields to `env.ts` file of project.

```ts
import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  // ...
  RECAPTCHA_SITE_KEY: Env.schema.string(),
  RECAPTCHA_SECRET_KEY: Env.schema.string(),
})
```

- Set options in `config/recaptcha.ts`.

```ts
import Env from '@ioc:Adonis/Core/Env'
import { RecaptchaConfig } from '@ioc:Adonis/Addons/Recaptcha2'

const recaptchaConfig: RecaptchaConfig = {
  // ...
  siteKey: Env.get('RECAPTCHA_SITE_KEY'),
  // ...
  secretKey: Env.get('RECAPTCHA_SECRET_KEY'),
}
export default recaptchaConfig
```

### Step 3: Add named middleware to `start/kernel.ts`

```ts
Server.middleware.registerNamed({
  recaptcha: () => import('App/Middleware/Recaptcha')
})
```

### Step 4: Add middleware for `start/routes.ts`

Example:
```ts
Route.post('login', 'AuthController.login').middleware('recaptcha')
```

This middleware will check `g-recaptcha-response` field in body request
```json
{
  "login": "admin",
  "password": "admin",
  "g-recaptcha-response": "osjoiadjaoisdjasijda..."
}
```
> Field `g-recaptcha-response` it is Google reCAPTCHA v2 response

## Use in Views
> **Note:** Required [View](https://docs.adonisjs.com/guides/views/introduction) (@adonisjs/view)

### Step 1: Enable `views` in `config/recaptcha.ts`
```ts
const recaptchaConfig: RecaptchaConfig = {
  // ... 
  views: true
}
```

### Step 2: Use `recaptcha()` function in templates
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

[npm-image]: https://img.shields.io/npm/v/adonis-recaptcha2?logo=npm&style=for-the-badge
[npm-url]: https://www.npmjs.com/package/adonis-recaptcha2

[license-image]: https://img.shields.io/npm/l/adonis-recaptcha2?style=for-the-badge&color=blueviolet
[license-url]: https://github.com/lookinlab/adonis-recaptcha2/blob/develop/LICENSE.md

[typescript-image]: https://img.shields.io/npm/types/adonis-recaptcha2?color=294E80&label=%20&logo=typescript&style=for-the-badge
[typescript-url]: https://github.com/lookinlab
