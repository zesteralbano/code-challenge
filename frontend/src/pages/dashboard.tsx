import React, {createContext} from 'react'
import {Button, Row, Col} from 'antd'
import {Observer} from 'mobx-react'
import CommonModal from '../components/common/modal';
import PhoneForm from '../components/phone/form';
import DashboardUIStore from '../store/dashboard/dashboard-ui.store';
import PhoneList from '../components/phone/list';
import PhoneView from '../components/phone/view';
import PhoneListStore from '../store/phone/phone-list-store';

const dashboardUiStore = new DashboardUIStore()
const phoneListStore = new PhoneListStore()

const DashboardContext = createContext<{ store: DashboardUIStore, phoneListStore: PhoneListStore }>({
  store: dashboardUiStore,
  phoneListStore,
})

const DashboardPage = () => {
  return (
    <>
      <Observer>{() => (
        <CommonModal
          title={'Add Phone'}
          visible={dashboardUiStore.formModal.visible}
          footer={false}
        >
          <PhoneForm/>
        </CommonModal>
      )}</Observer>
      <Observer>{() => (
        <CommonModal
          width={1028}
          visible={dashboardUiStore.viewPhoneModal.visible}
          footer={false}
        >
          <PhoneView/>
        </CommonModal>
      )}</Observer>
      <Row justify={'center'} style={{width: '100%', marginTop: 100}}>
        <Col span={16}>
          <Row justify={'end'} style={{marginBottom: 20}}>
            <Button onClick={dashboardUiStore.formModal.toggleVisibleBound} type={'primary'}>
              Add Phone
            </Button>
          </Row>
          <PhoneList/>
        </Col>
      </Row>
    </>
  )
}


export {DashboardContext}
export default DashboardPage