/*
 * adonis-recaptcha2
 *
 * (c) Lookin Anton <lookin@lookinlab.ru>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare module '@ioc:Adonis/Addons/Recaptcha2' {
  import Recaptcha2, { Options } from 'recaptcha2'

  export interface RecaptchaConfig extends Options {
    views?: boolean;
  }
  export const recaptcha2: Recaptcha2
  export default recaptcha2
}
