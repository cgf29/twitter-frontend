import React, { useState } from 'react'
import { Row, Col, Typography, Spin } from 'antd'
import { Route } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import './style.scss'
import SideMenu from '../../components/SideMenu'
import Tweet from '../../components/Tweet'
import SideSearch from '../../components/SideSearch'
import CreateTweetForm from '../../components/CreateTweetForm'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchTweets } from '../../redux/ducks/tweets/actionCreators'
import {
   selectTweetsItems,
   selectIsTweetsLoading,
} from '../../redux/ducks/tweets/selectors'
import GoBackButton from '../../components/GoBackButton'
import FullTweet from '../components/FullTweet/FullTweet'
import User from '../User'
import { selectUserData } from '../../redux/ducks/user/selectors'
import Following from '../Following'
import { getUserInfo } from '../../api/authApi'

const Home = () => {
   const dispatch = useDispatch()
   const tweets = useSelector(selectTweetsItems)
   const isLoading = useSelector(selectIsTweetsLoading)
   const [user, setUser] = useState()

   useEffect(async () => {
      const userId = window.location.pathname.split('/').pop()
      const userInfo = await getUserInfo(userId)
      setUser(userInfo.data)
   }, [window.location.pathname.split('/').pop()])

   useEffect(() => {
      dispatch(fetchTweets())
   }, [window.location.pathname])

   const loadingSpin = <LoadingOutlined style={{ fontSize: 40 }} spin />

   return (
      <div>
         <Row className='wrapper'>
            <Col span={6} className='menu'>
               <SideMenu />
            </Col>

            <Col className='tweets' span={12}>
               <div className='tweets__header header'>
                  <Route path={['/home/:any', '/user']}>
                     <GoBackButton />
                  </Route>
                  <Route path='/home/tweet'>
                     <Typography>Tweet</Typography>
                  </Route>
                  <Route exact path={['/home', '/home/search/:id']}>
                     <Typography>Home</Typography>
                  </Route>
                  <Route exact path={['/user', '/user/:id']}>
                     <Typography>{user ? user.username : 'User'}</Typography>
                  </Route>
                  <Route exact path={['/user/:id/followers', '/user/:id/following']}>
                     <Typography>{user ? user.username : 'User'}</Typography>
                  </Route>
               </div>
               <Route exact path={['/home', '/home/search/q=:id']}>
                  <CreateTweetForm type='add' />
                  <div style={{ backgroundColor: '#d9d9d9', height: 10 }}></div>
               </Route>
               <Route path='/home' exact>
                  {isLoading ? (
                     <div className='tweets__spinLoading'>
                        <Spin indicator={loadingSpin} />
                     </div>
                  ) : (
                     tweets.map((tweet) => <Tweet key={tweet._id} {...tweet} />)
                  )}
               </Route>
               <Route exact path='/home/tweet/:id'>
                  <FullTweet />
               </Route>
               <Route exact path='/user/:id'>
                  <User />
               </Route>
               <Route exact path={['/user/:id/following', '/user/:id/followers']}>
                  <Following />
               </Route>
            </Col>

            <Col span={6} className=''>
               <SideSearch />
            </Col>
         </Row>
      </div>
   )
}

export default Home
