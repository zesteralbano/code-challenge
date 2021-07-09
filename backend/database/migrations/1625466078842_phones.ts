import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Phones extends BaseSchema {
  protected tableName = 'phones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.uuid('manufacturer_id').notNullable()
      table.string('description')
      table.string('color').notNullable()
      table.double('price', 2).notNullable()
      table.string('image_file_name')
      table.string('screen').notNullable()
      table.string('processor').notNullable()
      table.integer('ram', 2).notNullable()
      table.foreign('manufacturer_id').references('manufacturers.id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', {useTz: true})
      table.timestamp('updated_at', {useTz: true})
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('manufacturer_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
