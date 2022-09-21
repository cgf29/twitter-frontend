import React, { useState } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Button, Input, Form, notification } from 'antd'
import { signInApi } from '../../../api/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSignIn } from '../../../redux/ducks/user/actionCreators'
import { useEffect } from 'react'
import { selectLoginLoadingState, selectUserLoadingState } from '../../../redux/ducks/user/selectors'

notification.config({
   duration: 3
})

const LoginModal = ({isVisible, setIsVisibleLogin}) => {
   const [input, setInput] = useState({email: '', password: ''})
   const dispatch = useDispatch()
   const loadingState = useSelector(selectUserLoadingState)

   const openNotificationWithIcon = (type, text) => {
      notification[type]({
        message: text,
      })
    };

   const handleSubmit = async () => {
      dispatch(fetchSignIn(input))
   }

   useEffect(() => {
      if(loadingState === 'LOADED'){
         // openNotificationWithIcon('success', 'Authorization was successful')
         setIsVisibleLogin(false)
      } else if(loadingState === 'ERROR'){
         // openNotificationWithIcon('error', 'Something went wrong')
      }
   }, [loadingState])

   const handleInput = e => {
      setInput(prevState => ({
         ...prevState,
         [e.target.name]: e.target.value
      }))
   }
   
   return (
      <div>
         <Modal
            className='modal-block'
            title='Sign In'
            centered
            visible={isVisible}
            onOk={() => setIsVisibleLogin(false)}
            onCancel={() => setIsVisibleLogin(false)}
            footer={null}
         >
            <Form
               onFinish={handleSubmit}
               name='basic'
            >

               <Form.Item
                  label='Email'
                  name='email'
                  rules={[
                     {
                        required: true,
                        message: 'Not valid email',
                        type: 'email'
                     },
                  ]}
               >
                  <Input value={input.email} onChange={handleInput} placeholder='Email' type='email' name='email'/>
               </Form.Item>

               <Form.Item
                  label='Password'
                  name='password'
                  rules={[
                     {
                        required: true,
                        message: 'Password must be at least 6 characters',
                        min: 6
                     },
                  ]}
               >
                  <Input.Password value={input.password} onChange={handleInput} type='password' placeholder='Password' name='password'/>
               </Form.Item>
               <Button key='submit' type='primary' htmlType='submit'>Next</Button>
            </Form>
         </Modal>
      </div>
   )
}

export default LoginModal
