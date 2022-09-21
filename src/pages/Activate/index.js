import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserLoadingState, getUser } from '../../redux/ducks/user/actionCreators'
import axios from 'axios'
import { useHistory } from 'react-router'

const Activate = () => {
   const history = useHistory()
   const dispatch = useDispatch()

   useEffect(() => {
      const hash = window.location.pathname.split('/').pop()
      console.log(hash)
      axios.get('http://localhost:8888/auth/verify/' + hash).then(({data}) => {
         localStorage.setItem('token', data.data.token)
         dispatch(getUser())
         history.push('/home')
      })
   }, [])

   return null
}

export default Activate
