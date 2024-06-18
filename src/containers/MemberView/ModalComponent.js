import { Modal, Input, Row, Typography } from 'antd'
import { useState } from 'react'


const ModalComponent = ({ isModalOpen, setIsModalOpen, submitForm, formType }) => {
  const [state, setState] = useState({ ndc_no: '', product_desc: '', ther_shfs: '', therpeutic_class: '' })
  const [stateDiagnosis, setDiagnosis] = useState({ diagnosis: '', diagnosis_desc: '', hccv23: '' })
  const handleOk = () => {
    setIsModalOpen(false)
    submitForm(formType === 'medicationExpand' ? state : stateDiagnosis, formType)
  }

  const handleChange = (e, key) => {
    setState({
      ...state,
      [key]: e.target.value
    })
  }
  const handleChangeDiagnosis = (e, key) => {
    setDiagnosis({
      ...stateDiagnosis,
      [key]: e.target.value
    })
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      {formType === 'medicationExpand' ?
        (<Modal title='Medication' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText='Cancel' okText='Add'>
          <Row>
            <Typography.Title level={5} style={{ margin: '20px 0 5px 10px' }}>NDC No : </Typography.Title>
            <Input placeholder='NDC No' value={state.ndc_no} onChange={(e) => handleChange(e, 'ndc_no')} />
          </Row>
          <Row>
            <Typography.Title level={5} style={{ margin: '20px 0 5px 10px' }}>Product Description : </Typography.Title>
            <Input placeholder='Product Description' value={state.product_desc} onChange={(e) => handleChange(e, 'product_desc')} />
          </Row>
          <Row>
            <Typography.Title level={5} style={{ margin: '20px 0 5px 10px' }}>Ther ShFS : </Typography.Title>
            <Input placeholder='Ther ShFS' value={state.ther_shfs} onChange={(e) => handleChange(e, 'ther_shfs')} />
          </Row>
          <Row>
            <Typography.Title level={5} style={{ margin: '20px 0 5px 10px' }}>Therpeutic Class : </Typography.Title>
            <Input placeholder='Therpeutic Class' value={state.therpeutic_class} onChange={(e) => handleChange(e, 'therpeutic_class')} />
          </Row>
        </Modal>)
        :
        (<Modal title='Diagnosis' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText='Cancel' okText='Add'>
          <Row>
            <Typography.Title level={5} style={{ margin: '20px 0 5px 10px' }}>Diagnosis : </Typography.Title>
            <Input placeholder='Diagnosis' value={state.diagnosis} onChange={(e) => handleChangeDiagnosis(e, 'diagnosis')} />
          </Row>
          <Row>
            <Typography.Title level={5} style={{ margin: '20px 0 5px 10px' }}>Diagnosis Description : </Typography.Title>
            <Input placeholder='Diagnosis Description' value={state.diagnosis_desc} onChange={(e) => handleChangeDiagnosis(e, 'diagnosis_desc')} />
          </Row>
          <Row>
            <Typography.Title level={5} style={{ margin: '20px 0 5px 10px' }}>HCC v23 : </Typography.Title>
            <Input placeholder='Ther ShFS' value={state.hccv23} onChange={(e) => handleChangeDiagnosis(e, 'hccv23')} />
          </Row>
        </Modal>)
      }
    </>
  )
}

export default ModalComponent
