import {useContext} from 'react';
import {Descriptions, Row, Image, Button, Spin} from 'antd';
import {observer} from 'mobx-react'
import {DashboardContext} from '../../pages/dashboard';
import fallback from '../../utils/fallback-image';

const PhoneView = () => {
  const {store} = useContext(DashboardContext)
  const phone = store.selectedPhone

  return (
    <Spin spinning={store.selectedPhoneLoading} size={'large'} tip={'Loading...'}>
      <Row justify={'center'} style={{marginBottom: 25}}>
        <Image
          style={{objectFit: 'cover'}}
          width={250}
          height={250}
          preview={false}
          src={store.getImageUrl(phone)}
          fallback={fallback}
        />
      </Row>
      <Descriptions title="Phone Information" bordered>
        <Descriptions.Item label="Name">{phone.name}</Descriptions.Item>
        <Descriptions.Item label="Manufacturer">{phone?.manufacturer?.name}</Descriptions.Item>
        <Descriptions.Item label="Color">{phone.color}</Descriptions.Item>
        <Descriptions.Item label="Description" span={3}>
          {phone.description || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Screen">{phone.screen}</Descriptions.Item>
        <Descriptions.Item label="Processor">{phone.processor}</Descriptions.Item>
        <Descriptions.Item label="RAM">{phone.ram}</Descriptions.Item>
        <Descriptions.Item label="Price" span={3}>{phone.price}</Descriptions.Item>
      </Descriptions>
      <Row justify={'space-between'} style={{marginTop: 25}}>
        <Button onClick={store.viewPhoneModal.toggleVisibleBound}>Close</Button>
      </Row>
    </Spin>
  )
}

export default observer(PhoneView)