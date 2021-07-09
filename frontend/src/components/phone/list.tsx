import {Card, Row, Col, Image, Spin} from 'antd';
import {useContext, useEffect} from 'react';
import {Observer} from 'mobx-react'
import fallback from '../../utils/fallback-image';
import {DashboardContext} from '../../pages/dashboard';


const PhoneList = () => {
  const {store, phoneListStore} = useContext(DashboardContext)

  useEffect(() => {
    phoneListStore.loadPhones()
  }, [])

  return (
    <Observer>{() => (
      <Spin spinning={phoneListStore.loading} size={'large'}>
        <Row gutter={[16, 16]}>
          {phoneListStore.data.map((value: any) => (
            <Col span={6} key={value.id}>
              <Card
                onClick={() => store.setSelectedPhone(value)}
                style={{overflow: 'hidden'}}
                hoverable
                cover={<Image
                  style={{objectFit: 'cover'}}
                  height={250}
                  preview={false}
                  src={phoneListStore.getImageUrl(value)}
                  fallback={fallback}
                />}
              >
                <Card.Meta title={value.name} description={value.manufacturer.name}/>
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>
    )}</Observer>
  )
}

export default PhoneList