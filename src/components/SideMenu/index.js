import React from 'react'
import ListItem from '../ListItem'
import { Button } from 'antd'
import {
   TwitterOutlined,
   SearchOutlined,
   BellOutlined,
   MailOutlined,
   UnorderedListOutlined,
   UserOutlined,
} from '@ant-design/icons'
import './style.scss'
import { useState } from 'react'
import Modal from 'antd/lib/modal/Modal'
import CreateTweetForm from '../CreateTweetForm'
import SideUserMenu from '../SideUserMenu'
import { useSelector } from 'react-redux'
import { selectUserData } from '../../redux/ducks/user/selectors'

const SideMenu = () => {
   const [visibleAddTweet, setVisibleAddTweet] = useState(false)
   const user = useSelector(selectUserData)

   const openAddTweet = (e) => {
      setVisibleAddTweet(true)
   }

   const closeAddTweet = (e) => {
      setVisibleAddTweet(false)
   }

   return (
      <div className='menu'>
         <ul className='menu__list'>
            <ListItem
               to='/home'
               icon={<TwitterOutlined style={{ color: '#1DA1F2' }} />}
            />
            {/* <ListItem title='Home' icon={<HomeOutlined />}/> */}
            <ListItem title='Search' icon={<SearchOutlined />} />
            <ListItem title='Notifications' icon={<BellOutlined />} />
            <ListItem title='Messages' icon={<MailOutlined />} />
            {/* <ListItem title='Lists' icon={<UnorderedListOutlined />}/> */}
            <ListItem title='Lists' icon={<UnorderedListOutlined />} />
            <ListItem
               to={user && `/user/${user._id}`}
               title='Profile'
               icon={<UserOutlined />}
            />
            {/* <ListItem title='More' icon={<EllipsisOutlined />}/> */}
            <Button
               onClick={openAddTweet}
               style={{ borderRadius: 30, height: 48 }}
               type='primary'
               className='menu__tweet-btn'
            >
               Tweet
            </Button>
            <Modal
               style={{ top: 30 }}
               className='menu-list__create-modal'
               visible={visibleAddTweet}
               onCancel={closeAddTweet}
               footer={null}
            >
               <CreateTweetForm type='add'/>
            </Modal>
         </ul>
         <SideUserMenu />
      </div>
   )
}

export default SideMenu
