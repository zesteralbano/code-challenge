import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import * as fs from 'fs'

export default class ImagesController {
  public async getImage ({params, response}: HttpContextContract) {
    const {name, id} = params

    const image = fs.createReadStream(Application.tmpPath(`uploads/${id}/${name}`))

    return response.stream(image)
  }
}
