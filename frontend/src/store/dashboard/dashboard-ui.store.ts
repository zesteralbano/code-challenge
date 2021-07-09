import ModalUIStore from '../common/modal-ui.store';
import {action, flow, makeAutoObservable} from 'mobx';
import PhoneService from '../../services/phone.service';
import {baseURL} from '../../utils/axios';

class DashboardUIStore {
  private phoneService: PhoneService
  formModal: ModalUIStore
  viewPhoneModal: ModalUIStore
  selectedPhone: { [key: string]: any } = {}
  selectedPhoneLoading: boolean = false

  constructor () {
    this.formModal = new ModalUIStore()
    this.viewPhoneModal = new ModalUIStore()
    this.phoneService = new PhoneService()
    makeAutoObservable(this, {
      setSelectedPhone: flow
    })
  }

  * setSelectedPhone (phone: any): Generator {
    try {
      this.selectedPhoneLoading = true
      this.viewPhoneModal.toggleVisible()

      const response: any = yield this.phoneService.getPhone(phone.id)
      this.selectedPhone = response.data.data
    } catch (error) {
      console.log(error)
    } finally {
      this.selectedPhoneLoading = false
    }
  }

  getImageUrl (phone: any): string {
    return `${baseURL}/images/${phone.id}/${phone.image_file_name}`
  }
}

export default DashboardUIStore