import {action, autorun, makeAutoObservable} from 'mobx';
import {FormInstance} from 'antd';
import PhoneService from '../../services/phone.service';
import DashboardUIStore from '../dashboard/dashboard-ui.store';
import ManufacturerService from '../../services/manufacturer.service';
import PhoneListStore from './phone-list-store';


class PhoneFormStore {
  private phoneService: PhoneService
  private manufacturerService: ManufacturerService
  loading: boolean = false
  errors: { field: string, message: string }[] = []
  tempImage?: string
  manufacturers: [] = []

  constructor (private form: FormInstance, private dashboardStore: DashboardUIStore, private phoneListStore: PhoneListStore) {
    this.phoneService = new PhoneService()
    this.manufacturerService = new ManufacturerService()
    makeAutoObservable(this, {
      onFinishForm: action.bound,
      onChangeFile: action.bound,
      getError: action,
      getManufacturers: action
    })
  }

  onChangeFile (event: any): void {
    const file = event.target.files[0]

    this._getBase64(file, (image) => {
      this.form.setFieldsValue({image: file})
      this.tempImage = image
    })
  }

  async onFinishForm (data: any): Promise<any> {
    this.loading = true
    const formData = new FormData()

    if (this.form.getFieldsValue(['image']).image) {
      formData.append('image', this.form.getFieldsValue(['image']).image)
    }
    Object.keys(data).forEach(key => {
      if (!data[key]) return
      formData.append(key, data[key])
    })

    try {
      await this.phoneService.addPhone(formData)
      await this.phoneListStore.loadPhones()
      this.dashboardStore.formModal.toggleVisible()
    } catch ({errors}) {
      this.errors = errors.map(({field, message}: { field: string, message: string }) => {
        return {
          field,
          message
        }
      })
    } finally {
      this.loading = false
    }
  }

  getError (field: string): { status: 'error' | 'success', message: string | null } {
    const error = this.errors.find(value => value.field === field)

    if (!error) {
      return {
        status: 'success',
        message: null
      }
    }

    return {
      status: 'error',
      message: error.message
    }
  }

  getManufacturers (): void {
    this.manufacturerService.getManufacturers()
      .then(({data}: any) => {
        this.manufacturers = data.data.map(({id, name}: any) => ({label: name, value: id}))
      }).catch(error => {
      console.log(error)
    })
  }

  private _getBase64 (image: any, callback: (image: any) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(image);
  };
}

export default PhoneFormStore