'use strict'

/*
 * adonis-recaptcha2
 *
 * (c) Lookin Anton <lookin@lookinlab.ru>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const ReCAPTCHA = require('recaptcha2')
const defaultConfig = require('../../config/recaptcha.js')

class Recaptcha {
  constructor (Config) {
    this.options = Config.merge('recaptcha', defaultConfig)
  }
  async handle ({ request, response }, next) {
    const recaptchaResponse = request.input('recaptcha')
    const recaptcha = new ReCAPTCHA(this.options)
    try {
      await recaptcha.validate(recaptchaResponse)
    } catch (errors) {
      response.send(401, recaptcha.translateErrors(errors || 'invalid-input-response'))
    }
    await next()
  }
}

module.exports = Recaptcha
