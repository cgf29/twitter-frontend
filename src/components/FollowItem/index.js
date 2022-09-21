import React from 'react'
// import './style.scss'
import { Link } from 'react-router-dom'
import Avatar from 'antd/lib/avatar/avatar'
import { UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFollow } from '../../redux/ducks/user/actionCreators'
import { selectUserData } from '../../redux/ducks/user/selectors'

const FollowItem = ({ user }) => {
   const dispatch = useDispatch()
   const currentUser = useSelector(selectUserData)

   const handleFollowButton = () => {
      dispatch(fetchFollow(user._id))
   }

   const followersIds = []
   for (let i = 0; i < user.followers.length; i++) {
      followersIds.push(user.followers[i])
   }
   return (
         <div className='who-to-follow__item item' key={user.id}>
            <div className='who-to-follow__left'>
            <Avatar size={48} src={user.avatar} icon={<UserOutlined />} />
            <div className='who-to-follow__user-name'>
            <Link to={`/user/${user._id}`}><b>{user.fullname}</b></Link>
               <span>@{user.username}</span>
            </div>
            </div>
            {currentUser._id !== user._id && <Button
               type={followersIds.includes(currentUser._id) ? 'default' : 'primary'}
               onClick={handleFollowButton}
               // ghost={followersIds.includes(currentUser._id)}
            >
               {followersIds.includes(currentUser._id) ? 'Unfollow' : 'Follow'}
            </Button>}
         </div>
   )
}

export default FollowItem
