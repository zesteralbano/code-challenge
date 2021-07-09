import {DateTime} from 'luxon'
import {BaseModel, column, beforeCreate, BelongsTo, belongsTo} from '@ioc:Adonis/Lucid/Orm'
import {v4 as uuid} from 'uuid'
import Manufacturer from 'App/Models/Manufacturer';

export default class Phone extends BaseModel {
  @column({isPrimary: true})
  public id: typeof uuid

  @column()
  public name: string

  @column()
  public manufacturer_id: typeof uuid

  @column()
  public description: string | null

  @column()
  public color: string

  @column()
  public price: number

  @column()
  public image_file_name: string | null

  @column()
  public screen: string

  @column()
  public processor: string

  @column()
  public ram: number

  @belongsTo(() => Manufacturer, {
    foreignKey: 'manufacturer_id',
  })
  public manufacturer: BelongsTo<typeof Manufacturer>

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID (phone: Phone) {
    phone.id = uuid() as typeof uuid
  }
}
