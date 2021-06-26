import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'
import recaptcha2 from '@ioc:Adonis/Addons/Recaptcha2'

/**
 * ReCAPTCHA middleware is meant to check recaptcha response
 * when POST/PUT requests
 *
 * You must register this middleware inside `start/kernel.ts` file under the list
 * of named middleware
 */
export default class Recaptcha {
  public async handle ({ request }: HttpContextContract, next: () => Promise<void>): Promise<void> {
    const recaptchaResponse = request.input('g-recaptcha-response')
    try {
      await recaptcha2.validate(recaptchaResponse)
    } catch (errors) {
      throw new Exception(recaptcha2.translateErrors(errors || 'invalid-input-response'), 400, 'E_CAPTCHA')
    }
    await next()
  }
}
