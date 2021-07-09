import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Manufacturer from 'App/Models/Manufacturer'

export default class ManufacturersController {
  public async index ({response}: HttpContextContract): Promise<any> {
    const manufacturers = await Manufacturer.all()

    return response.json({
      data: manufacturers,
    })
  }
}
