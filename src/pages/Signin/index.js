import React, { useState } from 'react'
import './style.scss'
import { TwitterOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'

const Signin = () => {
   const [isVisibleLogin, setIsVisibleLogin] = useState(false)
   const [isVisibleRegister, setIsVisibleRegister] = useState(false)
   return (
      <div className='wrapper'>
         <div className='left-block'>
            <TwitterOutlined />
         </div>
         <div className='right-block'>
            <div className='right-block__top-icon'>
               <TwitterOutlined />
            </div>
            <div className='right-block__text'>
               <h2>Happening now</h2>
               <h4>Join Twitter today.</h4>
            </div>
            <div className='right-block__btns'>
               <Button block type='primary' className='right-block__signup' onClick={() => {setIsVisibleRegister(true)}}>
                  Sign Up
               </Button>
               <Button block className='right-block__login'onClick={() => {setIsVisibleLogin(true)}}>
                  Log In
               </Button>
               <LoginModal isVisible={isVisibleLogin} setIsVisibleLogin={setIsVisibleLogin}/>
               <RegisterModal isVisible={isVisibleRegister} setIsVisibleRegister={setIsVisibleRegister}/>
            </div>
         </div>
      </div>
   )
}

export default Signin
