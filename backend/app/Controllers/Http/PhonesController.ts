import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Phone from 'App/Models/Phone'
import CreatePhoneValidator from 'App/Validators/Phone/CreatePhoneValidator'
import UpdatePhoneValidator from 'App/Validators/Phone/UpdatePhoneValidator'

export default class PhonesController {
  public async index ({response}: HttpContextContract): Promise<void> {
    const phones = await Phone.query()
      .select('id', 'name', 'manufacturer_id', 'image_file_name')
      .preload('manufacturer')

    return response.json({
      data: phones,
    })
  }

  public async create ({request, response}: HttpContextContract): Promise<void> {
    const {image, ...data} = await request.validate(CreatePhoneValidator)

    const phone = await Phone.create({...data, image_file_name: null})

    if (image) {
      await image.move(Application.tmpPath(`uploads/${phone.id}`), {name: `cover-photo.${image.extname}`})
      phone.image_file_name = `${image.fileName}`
      await phone.save()
    }

    return response.json({
      data: phone,
    })
  }

  public async view ({params, response}: HttpContextContract): Promise<void> {
    const {id} = params

    const phone = await Phone.query().where('id', id).preload('manufacturer').first()

    return response.json({
      data: phone,
    })
  }

  public async update ({request, response}: HttpContextContract): Promise<void> {
    const {image, ...data} = await request.validate(UpdatePhoneValidator)

    let phone = await Phone.findOrFail(data.id)

    phone = await phone.merge(data)

    if (image) {
      await image.move(Application.tmpPath(`uploads/${phone.id}`))
      phone.image_file_name = `${image.fileName}`
    }

    phone = await phone.save()

    return response.json({
      data: phone,
    })
  }

  public async destroy ({params, response}: HttpContextContract): Promise<void> {
    const {id} = params

    const phone = await Phone.findOrFail(id)

    await phone.delete()

    return response.json({
      deleted: true,
    })
  }
}
