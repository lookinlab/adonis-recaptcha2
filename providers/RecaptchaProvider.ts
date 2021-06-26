/*
 * adonis-recaptcha2
 *
 * (c) Lookin Anton <lookin@lookinlab.ru>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { RecaptchaConfig } from '@ioc:Adonis/Addons/Recaptcha2'

export default class RecaptchaProvider {
  public static needApplication = true
  constructor (protected app: ApplicationContract) {}

  public register (): void {
    this.app.container.singleton('Adonis/Addons/Recaptcha2', () => {
      const config: RecaptchaConfig = this.app.container
        .resolveBinding('Adonis/Core/Config')
        .get('recaptcha', {})

      return new (require('recaptcha2'))(config)
    })
  }

  public async boot (): Promise<void> {
    const config: RecaptchaConfig = this.app.container
      .resolveBinding('Adonis/Core/Config')
      .get('recaptcha', {})

    if (!config.views) {
      return
    }
    try {
      const View = this.app.container.resolveBinding('Adonis/Core/View')

      View.global('recaptcha', function (type = 'script') {
        return this.safe(
          (type !== 'script')
            ? `<div class="g-recaptcha" data-sitekey="${config.siteKey}"></div>`
            : '<script src="//www.google.com/recaptcha/api.js" async defer></script>'
        )
      })
    } catch (e) {
      console.warn(e)
    }
  }
}
