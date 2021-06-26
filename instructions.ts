/*
 * adonis-recaptcha2
 *
 * (c) Lookin Anton <lookin@lookinlab.ru>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import * as sinkStatic from '@adonisjs/sink'
import { join } from 'path'

/**
 * Instructions to be executed when setting up the package.
 */
export default async function instructions (
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
): Promise<void> {
  const middlewareDir = app.resolveNamespaceDirectory('middleware') || 'app/Middleware'

  const middlewarePath = join(middlewareDir, 'Recaptcha.ts')
  const middlewareTemplate = join(__dirname, 'templates/middleware/Recaptcha.txt')

  const middleware = new sink.files.TemplateLiteralFile(projectRoot, middlewarePath, middlewareTemplate)
  if (middleware.exists()) {
    sink.logger.action('create').skipped(`${middlewarePath} file already exists`)
  } else {
    middleware.apply().commit()
    sink.logger.action('create').succeeded(middlewarePath)
  }
}
