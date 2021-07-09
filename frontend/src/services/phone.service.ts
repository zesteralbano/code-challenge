import axios from '../utils/axios';
import {AxiosResponse, AxiosInstance, AxiosRequestConfig, AxiosError} from 'axios'
import {v4 as uuid} from 'uuid'

class PhoneService {
  private _url: string = '/phones'
  private _configHeader: AxiosRequestConfig = {
    headers: {'Content-Type': 'multipart/form-data'}
  }

  constructor (private api: AxiosInstance = axios) {
  }

  async getPhones (): Promise<AxiosResponse | AxiosError> {
    try {
      return await this.api.get(this._url)
    } catch (error) {
      throw error.response
    }
  }

  async addPhone (data: FormData): Promise<AxiosResponse | AxiosError> {
    try {
      return await this.api.post(this._url, data, this._configHeader)
    } catch (error) {
      throw error.response.data
    }
  }

  async getPhone (id: typeof uuid): Promise<AxiosResponse | AxiosError> {
    try {
      return await axios.get(`${this._url}/${id}`)
    } catch (error) {
      throw error.response
    }
  }

  async updatePhone (data: FormData): Promise<AxiosResponse | AxiosError> {
    try {
      return await this.api.patch(this._url, data, this._configHeader)
    } catch (error) {
      throw error.response
    }
  }

  async deletePhone (id: typeof uuid): Promise<AxiosResponse | AxiosError> {
    try {
      return await axios.delete(`${this._url}/${id}`)
    } catch (error) {
      throw error.response
    }
  }
}

export default PhoneService