import React from 'react'
import { Button, Popover } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { UpOutlined, UserOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserData } from '../../redux/ducks/user/selectors'
import './style.scss'
import { Link } from 'react-router-dom'
import { signOut } from '../../redux/ducks/user/actionCreators'

const SideUserMenu = () => {
   const user = useSelector(selectUserData)
   const dispatch = useDispatch()

   const handleLogOut = () => {
      dispatch(signOut())
   }

   const content = user && (
      <div>
         <ul className='popup'>
            <li>
               <Link style={{ color: 'black' }} to={`/user/${user._id}`}>
                  My profile
               </Link>
            </li>
            <li>
               <span onClick={handleLogOut}>Log out</span>
            </li>
         </ul>
      </div>
   )

   if (!user) {
      return null
   }

   return (
      <Popover placement='topLeft' content={content} trigger='click'>
         <div className='side-user'>
            <Avatar
               size={40}
               src={user.avatar ? user.avatar : ''}
               icon={<UserOutlined />}
            />
            <div className='side-user__name'>
               <b>{user.fullname}</b>
               <span>@{user.username}</span>
            </div>
            <UpOutlined />
         </div>
      </Popover>
   )
}

export default SideUserMenu
