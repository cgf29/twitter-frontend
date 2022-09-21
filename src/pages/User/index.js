import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserData } from '../../redux/ducks/user/selectors'
import { useEffect } from 'react'
import {
   selectTweetsItems,
   selectIsTweetsLoading,
} from '../../redux/ducks/tweets/selectors'
import { fetchTweets } from '../../redux/ducks/tweets/actionCreators'
import { Spin, Button } from 'antd'
import {
   LoadingOutlined,
   CalendarOutlined,
   UserOutlined,
} from '@ant-design/icons'
import Tweet from '../../components/Tweet'
import { getUserInfo } from '../../api/authApi'
import Avatar from 'antd/lib/avatar/avatar'
import { format } from 'date-fns'
import './style.scss'
import Modal from 'antd/lib/modal/Modal'
import {
   fetchUploadAvatar,
   fetchFollow,
} from '../../redux/ducks/user/actionCreators'
import { Link } from 'react-router-dom'

const User = () => {
   const dispatch = useDispatch()
   // const user = useSelector(selectUserData)
   const tweets = useSelector(selectTweetsItems)
   const isLoading = useSelector(selectIsTweetsLoading)
   const currentUser = useSelector(selectUserData)
   const [user, setUser] = useState()
   const [visibleAddTweet, setVisibleAddTweet] = useState(false)
   const [avatar, setAvatar] = useState()
   const [formData, setFormData] = useState()

   useEffect(async () => {
      const userId = window.location.pathname.split('/').pop()
      dispatch(fetchTweets(userId))
      const userInfo = await getUserInfo(userId)
      setUser(userInfo.data)
   }, [currentUser ,window.location.pathname.split('/').pop()])

   const loadingSpin = <LoadingOutlined style={{ fontSize: 40 }} spin />

   if (!user) {
      return null
   }

   const openAddTweet = (e) => {
      setVisibleAddTweet(true)
   }

   const closeAddTweet = (e) => {
      setVisibleAddTweet(false)
   }

   const handleFileInputChange = async (e) => {
      const reader = new FileReader()
      setFormData(e.target.files[0])

      reader.onload = (e) => {
         setAvatar(e.target.result)
      }
      reader.readAsDataURL(e.target.files[0])
   }

   const handleUploadAvatarButton = () => {
      const fd = new FormData()
      fd.append('avatar', formData)

      dispatch(fetchUploadAvatar(fd))
   }

   const handleFollowButton = () => {
      dispatch(fetchFollow(user._id))
   }
   const followersIds = []
   for (let i = 0; i < user.followers.length; i++) {
      followersIds.push(user.followers[i]._id)
   }

   return (
      <div className='user'>
         <div className='user___info'>
            <div className='user__background-image'></div>
            <div className='user__detail-info'>
               <div className='user__avatar'>
                  <div>
                     <Avatar
                        src={user.avatar ? user.avatar : ''}
                        size={120}
                        icon={<UserOutlined />}
                        onClick={openAddTweet}
                     />
                     <Modal
                        // style={{ top: 190 }}
                        className='user__avatar-img'
                        visible={visibleAddTweet}
                        onCancel={closeAddTweet}
                        footer={null}
                     >
                        <div>
                           <div style={{ textAlign: 'center' }}>
                              <input
                                 onChange={handleFileInputChange}
                                 multiple={false}
                                 type='file'
                                 id='avatar-input'
                                 hidden
                              />
                              <label htmlFor='avatar-input'>
                                 <Avatar
                                    src={avatar ? avatar : user.avatar}
                                    size={120}
                                    icon={<UserOutlined />}
                                    onClick={openAddTweet}
                                 />
                              </label>
                           </div>
                           <div style={{ textAlign: 'right' }}>
                              <Button
                                 type='primary'
                                 onClick={handleUploadAvatarButton}
                              >
                                 Save
                              </Button>
                           </div>
                        </div>
                     </Modal>
                  </div>
                  {currentUser._id !== user._id && (
                     <Button type={followersIds.includes(currentUser._id) ? 'default' : 'primary'} onClick={handleFollowButton}>
                        {followersIds.includes(currentUser._id) ? 'Unfollow' : 'Follow'}
                     </Button>
                  )}
               </div>
               <div className='user__name'>
                  <b>{user.fullname}</b>
                  <span>@{user.username}</span>
               </div>
               <div className='user__joined'>
                  <CalendarOutlined /> Joined{' '}
                  {format(new Date(user.createdAt), 'MMMM y')}
               </div>
               <div className='user__following'>
                  <Link to={`/user/${user._id}/following`}>
                     <b>{user.following.length}</b> Following
                  </Link>
                  <Link to={`/user/${user._id}/followers`}>
                     <b>{user.followers.length}</b> Followers
                  </Link>
               </div>
            </div>
         </div>
         {isLoading ? (
            <div className='tweets__spinLoading'>
               <Spin indicator={loadingSpin} />
            </div>
         ) : (
            tweets.map((tweet) => <Tweet key={tweet._id} {...tweet} />)
         )}
      </div>
   )
}

export default User
