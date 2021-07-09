import {v4 as uuid} from "uuid"

class Phone {
  // id: typeof uuid
  // name: string
  // manufacturer_id: typeof uuid
  // description: string | null
  // color: string
  // price: number
  // image_file_name: string | null
  // screen: string
  // processor: string
  // ram: string
  // created_at: Date
  // updated_at: Date

  constructor(props: any) {
    // Object.keys(this).forEach(keys => {
    //   this[keys] = props[keys]
    // })
  }

  //
  // getImagePath(): string {
  //   return `${this.id}/${this.image_file_name}`
  // }
}

export default Phone