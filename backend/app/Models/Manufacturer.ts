import {DateTime} from 'luxon'
import {BaseModel, column, beforeCreate} from '@ioc:Adonis/Lucid/Orm'
import {v4 as uuid} from 'uuid'

export default class Manufacturer extends BaseModel {
  @column({isPrimary: true})
  public id: typeof uuid

  @column()
  public name: string

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID (manufacturer: Manufacturer) {
    manufacturer.id = uuid() as typeof uuid
  }
}
