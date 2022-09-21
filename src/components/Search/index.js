import React from 'react'
import './style.scss'
import { Input, Popover } from 'antd'
import { SearchOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
   fetchSearchUsers,
   setSearchUsers,
} from '../../redux/ducks/searchUsers/actionCreators'
import { selectSearchUsers } from '../../redux/ducks/searchUsers/selectors'
import Avatar from 'antd/lib/avatar/avatar'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import {selectUserData} from '../../redux/ducks/user/selectors'

const Search = () => {
   const history = useHistory()
   const dispatch = useDispatch()
   const users = useSelector(selectSearchUsers)
   const currentUser = useSelector(selectUserData)
   const [visible, setVisible] = useState(false)
   const [input, setInput] = useState('')
   const usersWithoutMe = [...users]

   useEffect(() => {
      setVisible(false)
      setInput('')
   }, [history.location.pathname])

   const handleInputChange = (e) => {
      if (e.target.value.length !== 0) {
         setInput(e.target.value)
         dispatch(fetchSearchUsers(e.target.value))
         setVisible(true)
      } else if (e.target.value.length == 0) {
         setInput(e.target.value)
         dispatch(setSearchUsers([]))
         setVisible(false)
      }
   }
   

   return (
      <div className='search__input'>
         <Input
            value={input}
            onChange={handleInputChange}
            className='search__input'
            style={{ borderRadius: 20 }}
            size='large'
            placeholder='Search Twitter'
            prefix={<SearchOutlined />}
         />
         <Popover
            placement='bottom'
            visible={visible}
            content={users.length > 0 &&
               <div style={{overflow: 'auto', maxHeight: 400}}>
               {usersWithoutMe.map((user) => (
                  <Link to={`/user/${user._id}`}>
                  <div
                     style={{ background: '#fff', minWidth: 200, marginBottom: 10 }}
                     className='search-item'
                     key={user.id}
                  >
                        <div className='who-to-follow__left'>
                           <Avatar
                              size={48}
                              src={user.avatar}
                              icon={<UserOutlined />}
                           />
                           <div className='who-to-follow__user-name'>
                              <b>{user.fullname}</b>
                              <span>@{user.username}</span>
                           </div>
                        </div>
                  </div>
                  </Link>
               ))}</div>}
            trigger='click'
         >
            
         </Popover>
      </div>
   )
}

export default Search
