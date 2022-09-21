import React from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Form, Input, Button } from 'antd'
import './style.scss'

const ModalBlock = ({ modalInfo, setModalInfo }) => {
   // const [modalVisible, setModalVisible] = useState(false)

   return (
      <div>
         <Modal
            className='modal-block'
            title={modalInfo.title}
            centered
            visible={modalInfo.isVisible}
            onOk={() => setModalInfo({ isVisible: false })}
            onCancel={() => setModalInfo({ isVisible: false })}
            footer={[
               <Button
                  key='back'
                  onClick={() => setModalInfo({ isVisible: false })}
               >
                  Cancel
               </Button>,
               <Button key='submit' type='primary'>
                  Next
               </Button>,
            ]}
         >
            <Form
               // {...layout}
               name='basic'
               initialValues={{
                  remember: true,
               }}
               // onFinish={onFinish}
               // onFinishFailed={onFinishFailed}
            >
               {modalInfo.title === 'Sign Up' && (
                  <Form.Item
                     label='Name'
                     name='name'
                     rules={[
                        {
                           required: true,
                           message: 'Please input your username!',
                        },
                     ]}
                  >
                     <Input placeholder='Name' />
                  </Form.Item>
               )}

               <Form.Item
                  label='Email'
                  name='email'
                  rules={[
                     {
                        required: true,
                        message: 'Please input your email!',
                     },
                  ]}
               >
                  <Input placeholder='Email' />
               </Form.Item>

               <Form.Item
                  label='Password'
                  name='password'
                  rules={[
                     {
                        required: true,
                        message: 'Please input your password!',
                     },
                  ]}
               >
                  <Input.Password type='password' placeholder='Password' />
               </Form.Item>

               <Form.Item>
                  <Button type='primary' htmlType='submit'>
                     Submit
                  </Button>
               </Form.Item>
            </Form>
         </Modal>
      </div>
   )
}

export default ModalBlock
