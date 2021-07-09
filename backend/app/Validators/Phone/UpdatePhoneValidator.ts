import {schema, rules} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePhoneValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public refs = schema.refs({
    id: this.ctx.request.input('id'),
  })

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    id: schema.string({}, [
      rules.uuid(),
      rules.exists({table: 'phones', column: 'id'}),
    ]),
    name: schema.string({}, [
      rules.unique({
        table: 'phones', column: 'name', whereNot: {
          id: this.refs.id,
        },
      }),
    ]),
    manufacturer_id: schema.string({}, [
      rules.exists({table: 'manufacturers', column: 'id'}),
    ]),
    description: schema.string.optional(),
    color: schema.string(),
    price: schema.number(),
    image: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
    screen: schema.string(),
    processor: schema.string(),
    ram: schema.number(),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {}
}
