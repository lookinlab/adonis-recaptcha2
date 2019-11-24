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
const GE = require('@adonisjs/generic-exceptions')
const defaultConfig = require('../../config/recaptcha.js')

class Recaptcha {
  constructor (Config) {
    this.options = Config.merge('recaptcha', defaultConfig)
  }
  async handle ({ request, response }, next) {
    const recaptchaResponse = request.input('g-recaptcha-response')
    const recaptcha = new ReCAPTCHA(this.options)
    try {
      await recaptcha.validate(recaptchaResponse)
    } catch (errors) {
      throw new GE.HttpException(recaptcha.translateErrors(errors || 'invalid-input-response'), 400, 'E_CAPTCHA')
    }
    await next()
  }
}

module.exports = Recaptcha
