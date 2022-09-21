import React from 'react'
import Signin from './pages/Signin'
import { Switch, Route, useHistory } from 'react-router-dom'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, getUser } from './redux/ducks/user/actionCreators'
import { getMeApi } from './api/authApi'
import { useEffect } from 'react'
import {
   selectIsAuth,
   selectUserLoadingState
} from './redux/ducks/user/selectors'
import { Spin } from 'antd'
import { selectLoadingState } from './redux/ducks/user/selectors'
import { TwitterOutlined } from '@ant-design/icons'
import User from './pages/User'
import Activate from './pages/Activate'

const App = () => {
   const dispatch = useDispatch()
   const history = useHistory()
   const isAuth = useSelector(selectIsAuth)
   const loadingState = useSelector(selectUserLoadingState)

   const checkAuth = async () => {
      try {
         const { data } = await getMeApi()
         dispatch(setUser(data))
         // history.replace('/home')
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      dispatch(getUser())
   }, [])

   useEffect(() => {
      console.log(isAuth)
      if (!isAuth) {
         history.push('/signup')
      }
      else if(history.location.pathname === '/signup' && isAuth){
         history.push('/home')
      }
   }, [isAuth])

   const spinIcon = <TwitterOutlined style={{ color: '#1DA1F2', fontSize: 50 }} />

   if (loadingState === 'LOADING') {
      return (
         <div
            style={{
               backgroundColor: '#fff',
               width: '100vw',
               height: '100vh',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            <Spin indicator={spinIcon} />
         </div>
      )
   }

   return (
      <div>
         <Switch>
            <Route exact path='/signup' component={Signin} />
            {/* <Route exact path='/user/activate/:hash' component={Activate} />  */}
            {/* <Route exact path='/user' component={User} /> */}
            <Route path='/' component={Home} />
             
         </Switch>
      </div>
   )
}

export default App
