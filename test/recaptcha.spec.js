'use strict'

/*
 * adonis-recaptcha2
 *
 * (c) Lookin Anton <lookin@lookinlab.ru>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const test = require('japa')
const { Config } = require('@adonisjs/sink')

const Recaptcha = require('../src/Recaptcha')

test.group('Recaptcha', () => {
  test('recaptcha config merge', (assert) => {
    const config = new Config()
    config.set('recaptcha.ssl', false)

    const recaptcha = new Recaptcha(config)
    assert.isFalse(recaptcha.options.ssl)
  })

  test('get 400 status code when not set recaptcha response', async (assert) => {
    const config = new Config()
    config.set('recaptcha.siteKey', '6LciB3EUAAAAACxioyycxI9ndxgaxywEVw8uKSu7')
    config.set('recaptcha.secretKey', '6LciB3EUAAAAAPrHpjgfLdHAAYN8ogu90gOFJ9v')
    config.set('recaptcha.ssl', false)

    const recaptcha = new Recaptcha(config)

    const response = {
      code: 200,
      body: null,
      status (code) {
        this.code = code
        return this
      },
      send (message) {
        this.body = message
        return this
      }
    }
    const request = {
      inputs: {
        'g-recaptcha-response': false
      },
      input (name) {
        return this.inputs[name]
      }
    }

    try {
      await recaptcha.handle({ response, request }, function () {})
    } catch (e) {
      assert.equal(400, e.status)
      assert.equal('E_CAPTCHA: The response parameter is missing.', e.message)
    }
  })

  test('get request error when recaptcha is invalid', async (assert) => {
    const config = new Config()
    config.set('recaptcha.siteKey', '6LciB3EUAAAAACxioyycxI9ndxgaxywEVw8uKSu7')
    config.set('recaptcha.secretKey', '6LciB3EUAAAAAPrHpjgfLdHAAYN8ogu90gOFJ9v')
    config.set('recaptcha.ssl', false)

    const recaptcha = new Recaptcha(config)

    const response = {
      code: 200,
      body: null,
      status (code) {
        this.code = code
        return this
      },
      send (message) {
        this.body = message
        return this
      }
    }
    const request = {
      inputs: {
        'g-recaptcha-response': 'ksdfisdfbisb123df123335p394.dlfdlfjgdf123130098u'
      },
      input (name) {
        return this.inputs[name]
      }
    }
    try {
      await recaptcha.handle({ response, request }, function () {})
    } catch (e) {
      assert.equal(400, e.status)
      assert.equal('E_CAPTCHA: The response parameter is invalid or malformed.', e.message)
    }
  })
})
