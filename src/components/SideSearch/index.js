import React from 'react'
import { Input, Button } from 'antd'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import './style.scss'
import Avatar from 'antd/lib/avatar/avatar'
import Tags from '../Tags'
import { selectNewestItems } from '../../redux/ducks/newest/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchNewest } from '../../redux/ducks/newest/actionCreators'
import { Link } from 'react-router-dom'
import Search from '../Search'

const SideSearch = () => {
   const users = useSelector(selectNewestItems)
   const dispatch = useDispatch()
   let newest = [...users]

   useEffect(() => {
      dispatch(fetchNewest())
      
   }, [])
   newest = users.slice(0, 3)

   return (
      <div className='search'>
         <Search />
         {/* <Tags /> */}
         <div className='who-to-follow'>
            <div className='title'>Newest users</div>
            <div>
               {newest.map((user) => (
                     <div className='who-to-follow__item item' key={user.id}>
                        <div className='who-to-follow__left'>
                           <Avatar
                              size={48}
                              src={user.avatar}
                              icon={<UserOutlined />}
                           />
                           <div className='who-to-follow__user-name'>
                              <Link to={`/user/${user._id}`}>
                                 <b>{user.fullname}</b>
                              </Link>
                              <span>@{user.username}</span>
                           </div>
                        </div>
                        <div></div>
                        {/* <Button
                              style={{ borderRadius: 20 }}
                              type='primary'
                              ghost
                           >
                              Follow
                           </Button> */}
                     </div>
                  ))}
            </div>
         </div>
      </div>
   )
}

export default SideSearch
