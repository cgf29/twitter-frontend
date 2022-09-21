import React, { useState } from 'react'
import { Spin, Tabs } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import './style.scss'
import SideSearch from '../../components/SideSearch'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
   selectTweetsItems,
   selectIsTweetsLoading,
} from '../../redux/ducks/tweets/selectors'
import { getUserInfo } from '../../api/authApi'
import { selectUserData } from '../../redux/ducks/user/selectors'
import FollowItem from '../../components/FollowItem'

const Following = () => {
   const history = useHistory()
   const userId = useParams().id
   const currentUser = useSelector(selectUserData)
   const [user, setUser] = useState()

   useEffect(async () => {
      const userInfo = await getUserInfo(userId)
      setUser(userInfo.data)
   }, [currentUser, window.location.pathname.split('/').pop()])
   const { TabPane } = Tabs

   if (user) {
      return (
         <div>
            <Tabs defaultActiveKey={history.location.pathname.split('/').pop()}>
               <TabPane tab='Followers' key='followers'>
                  {user !== undefined &&
                     user.followers.map((user) => <FollowItem key={user._id} user={user}/>)}
               </TabPane>
               <TabPane tab='Following' key='following'>
                  {user !== undefined &&
                  user.following.map((user) => <FollowItem key={user._id} user={user}/>)}
               </TabPane>
            </Tabs>
         </div>
      )
   }
   return null
}

export default Following
