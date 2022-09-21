import React, { useState } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Button, Input, Form, notification } from 'antd'
import { signInApi } from '../../../api/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { selectRegisterLoadingState, selectUserLoadingState } from '../../../redux/ducks/user/selectors'
import { fetchSignUp } from '../../../redux/ducks/user/actionCreators'

notification.config({
   duration: 3,
})

const RegisterModal = ({ isVisible, setIsVisibleRegister }) => {
   const [input, setInput] = useState({ email: '', username: '', fullname: '', password: '', password2: ''})
   const dispatch = useDispatch()
   const loadingState = useSelector(selectUserLoadingState)

   const openNotificationWithIcon = (type, text) => {
      notification[type]({
         message: text,
      })
   }

   const handleSubmit = async () => {
      dispatch(fetchSignUp(input))
      // console.log(input)
   }

   useEffect(() => {
      if (loadingState === 'LOADED') {
         // openNotificationWithIcon('success', 'Registration was successful')
         setIsVisibleRegister(false)
      } else if (loadingState === 'ERROR') {
         // openNotificationWithIcon('error', 'Registration went wrong')
      }
   }, [loadingState])

   const handleInput = (e) => {
      setInput((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }))
   }

   return (
      <div>
         <Modal
            className='modal-block'
            title='Sign Up'
            centered
            visible={isVisible}
            onOk={() => setIsVisibleRegister(false)}
            onCancel={() => setIsVisibleRegister(false)}
            footer={null}
         >
            <Form onFinish={handleSubmit} name='basic'>
            <Form.Item
                  label='Email'
                  name='email'
                  rules={[
                     {
                        min: 10,
                        max: 40,
                        message: 'Email must contain at least 10 characters to 40',
                     },
                     {
                        type: 'email',
                        message: 'Not valid email',
                     },
                     {
                        required: true,
                        message: 'This field is required'
                     },
                  ]}
               >
                  <Input
                     value={input.email}
                     onChange={handleInput}
                     placeholder='Email'
                     type='email'
                     name='email'
                  />
               </Form.Item>
            <Form.Item
                  label='Full name'
                  name='fullname'
                  rules={[
                     {
                        required: true,
                        // type: 'text',
                        message: 'This field is required'
                     },
                     {
                        min: 4,
                        max: 20,
                        message: 'Full name must contain at least 4 characters to 20',
                     }
                  ]}
               >
                  <Input
                     value={input.fullname}
                     onChange={handleInput}
                     placeholder='Full name'
                     type='text'
                     name='fullname'
                  />
               </Form.Item>
            <Form.Item
                  label='User name'
                  name='username'
                  rules={[
                     {
                        required: true,
                        // type: 'text',
                        message: 'This field is required'
                     },
                     {
                        min: 2,
                        max: 40,
                        message: 'User name must contain at least 2 characters to 40'
                     },
                  ]}
               >
                  <Input
                     value={input.username}
                     onChange={handleInput}
                     placeholder='User name'
                     type='text'
                     name='username'
                  />
               </Form.Item>
               <Form.Item
                  label='Password'
                  name='password'
                  hasFeedback
                  rules={[
                     {
                        required: true,
                        message: 'This field is required'
                     },
                     {
                        min: 6,
                        max: 40,
                        message: 'Password must contain at least 6 characters to 40'
                     },
                  ]}
               >
                  <Input.Password
                     value={input.password}
                     onChange={handleInput}
                     type='password'
                     placeholder='Password'
                     name='password'
                  />
               </Form.Item>
               <Form.Item
                  label='Confirm password'
                  name='confirm'
                  hasFeedback
                  dependencies={['password']}
                  rules={[
                     {
                        required: true,
                        message: 'This field is required'
                     },
                     ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Passwords do not matching'));
                        },
                      })
                  ]}
               >
                  <Input.Password
                     value={input.password2}
                     onChange={handleInput}
                     type='password'
                     placeholder='Confirm password'
                     name='password2'
                  />
               </Form.Item>
               <Button key='submit' type='primary' htmlType='submit'>
                  Next
               </Button>
            </Form>
         </Modal>
      </div>
   )
}

export default RegisterModal
