import {ModalProps, Modal} from 'antd';
import React, {ReactNode} from 'react'

interface ICommonModal extends ModalProps {
  children: ReactNode
}

const CommonModal = (props: ICommonModal) => {
  return (
    <Modal destroyOnClose={true} closable={false} width={752} {...props}>
      {props.children}
    </Modal>
  )
}

export default CommonModal