import {Avatar, Button, Col, Form, Input, InputNumber, Row, Select, Spin} from 'antd';
import {FormProps} from 'antd/es';
import {useForm} from 'antd/es/form/Form';
import React, {useContext, useEffect, useRef} from 'react'
import {Observer} from 'mobx-react'
import {CameraOutlined} from '@ant-design/icons'
import PhoneFormStore from '../../store/phone/phone-form.store';
import {DashboardContext} from '../../pages/dashboard';

const PhoneForm = (props: FormProps) => {
  const {store, phoneListStore} = useContext(DashboardContext)
  const [form] = useForm()
  const inputFileRef = useRef<any>(null);
  const phoneFormStore = new PhoneFormStore(form, store, phoneListStore)

  useEffect(() => {
    phoneFormStore.getManufacturers()
  }, [])

  const handleInputBrowse = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click()
    }
  }

  return (
    <Observer>{() => (
      <Spin spinning={phoneFormStore.loading} size={'large'} tip="Saving...">
        <Form {...props} layout={'vertical'} form={form} onFinish={phoneFormStore.onFinishForm}>
          <Row justify={'center'} style={{marginBottom: 20}}>
            <Col>
              <Observer>{() => (
                <div onClick={handleInputBrowse}>
                  <Avatar
                    src={phoneFormStore.tempImage}
                    icon={<CameraOutlined/>}
                    size={150}
                    shape={'square'}
                  />
                </div>
              )}</Observer>
              <input
                ref={inputFileRef}
                type={'file'}
                onChange={phoneFormStore.onChangeFile}
                style={{display: 'none'}}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={'name'}
                label={'Name'}
                validateStatus={phoneFormStore.getError('name').status}
                help={phoneFormStore.getError('name').message}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={'screen'}
                label={'Screen'}
                validateStatus={phoneFormStore.getError('screen').status}
                help={phoneFormStore.getError('screen').message}
              >
                <Input/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={'manufacturer_id'}
                label={'Manufacturer'}
                validateStatus={phoneFormStore.getError('manufacturer_id').status}
                help={phoneFormStore.getError('manufacturer_id').message}
              >
                <Select options={phoneFormStore.manufacturers}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={'processor'}
                label={'Processor'}
                validateStatus={phoneFormStore.getError('processor').status}
                help={phoneFormStore.getError('processor').message}
              >
                <Input/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={'color'}
                label={'Color'}
                validateStatus={phoneFormStore.getError('color').status}
                help={phoneFormStore.getError('color').message}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name={'ram'}
                label={'RAM'}
                validateStatus={phoneFormStore.getError('ram').status}
                help={phoneFormStore.getError('ram').message}
              >
                <InputNumber style={{width: '100%'}}/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name={'price'}
                label={'Price'}
                validateStatus={phoneFormStore.getError('price').status}
                help={phoneFormStore.getError('price').message}
              >
                <InputNumber style={{width: '100%'}}/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name={'description'} label={'Description'}>
                <Input.TextArea/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={'space-between'}>
            <Button onClick={store.formModal.toggleVisibleBound}>Cancel</Button>
            <Button type={'primary'} htmlType={'submit'}>Save</Button>
          </Row>
        </Form>
      </Spin>
    )}</Observer>
  )
}

export default PhoneForm