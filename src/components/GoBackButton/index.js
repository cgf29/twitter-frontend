import React from 'react'
import './style.scss'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router'

const GoBackButton = () => {
   const history = useHistory()

   const handleClick = e => {
      history.goBack()
   }

   return (
      <div className='go-back'>
         <ArrowLeftOutlined onClick={handleClick}/>
      </div>
   )
}

export default GoBackButton
