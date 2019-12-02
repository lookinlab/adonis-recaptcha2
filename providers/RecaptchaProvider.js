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
    this.app.bind('Adonis/Middleware/Recaptcha', (app) => {
      const Recaptcha = require('../src/Recaptcha')
      return new Recaptcha(app.use('Adonis/Src/Config'))
    })
  }

  boot () {
    const Server = this.app.use('Adonis/Src/Server')
    Server.registerNamed({ recaptcha: 'Adonis/Middleware/Recaptcha' })

    this._bootRecaptchaClient()
  }

  /**
   * Boot Recaptcha for use in views
   *
   * @private
   */
  _bootRecaptchaClient () {
    const Config = this.app.use('Adonis/Src/Config')
    const params = Config.get('recaptcha')
    if (!params.client) return

    try {
      const View = this.app.use('View')

      View.global('recaptcha', function (type = 'script') {
        return this.safe(
          (type !== 'script')
            ? `<div class="g-recaptcha" data-sitekey="${params.siteKey}"></div>`
            : '<script src="//www.google.com/recaptcha/api.js" async defer></script>'
        )
      })
    } catch ({ message }) {
      console.warn(message)
    }
  }
}

module.exports = RecaptchaProvider
