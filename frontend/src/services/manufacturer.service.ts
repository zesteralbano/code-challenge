import {AxiosResponse, AxiosInstance, AxiosError} from 'axios'
import axios from '../utils/axios';

class ManufacturerService {
  private _url: string = '/manufacturers'

  constructor (private api: AxiosInstance = axios) {
  }

  async getManufacturers (): Promise<AxiosResponse | AxiosError> {
    try {
      return await this.api.get(this._url)
    } catch (error) {
      throw error.response
    }
  }
}

export default ManufacturerService