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
}

module.exports = RecaptchaProvider
