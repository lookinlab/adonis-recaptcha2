'use strict'

/*
 * adonis-recaptcha2
 *
 * (c) Lookin Anton <lookin@lookinlab.ru>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { ServiceProvider } = require('@adonisjs/fold')

class RecaptchaProvider extends ServiceProvider {
  register () {
    const Config = this.app.use('Adonis/Src/Config')

    this.app.bind('Adonis/Middleware/Recaptcha', () => {
      const Recaptcha = require('../src/Recaptcha')
      return new Recaptcha(Config)
    })

    if (Config.get('recaptcha').client) {
      this._bootRecaptchaClient(Config)
    }
  }
  _bootRecaptchaClient (Config) {
    try {
      const View = this.app.use('View')
      const options = Config.get('recaptcha')

      View.global('recaptcha', function (type = 'script') {
        return this.safe(
          (type !== 'script')
            ? `<div class="g-recaptcha" data-sitekey="${options.siteKey}"></div>`
            : '<script src="//www.google.com/recaptcha/api.js" async defer></script>'
        )
      })
    } catch ({ message }) {
      console.warn(message)
    }
  }
}

module.exports = RecaptchaProvider
