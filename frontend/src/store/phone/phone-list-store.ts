import {flow, makeAutoObservable} from 'mobx';
import PhoneService from '../../services/phone.service';
import {baseURL} from '../../utils/axios';

class PhoneListStore {
  private phoneService: PhoneService
  data: [] = []
  loading: boolean = false

  constructor () {
    this.phoneService = new PhoneService()
    makeAutoObservable(this, {
      loadPhones: flow
    })
  }

  * loadPhones (): Generator {
    try {
      this.loading = true
      const response: any = yield this.phoneService.getPhones()
      this.data = response.data.data
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }
  }

  getImageUrl (phone: any): string {
    return `${baseURL}/images/${phone.id}/${phone.image_file_name}`
  }
}

export default PhoneListStore