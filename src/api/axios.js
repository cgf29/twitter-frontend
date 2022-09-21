import axios from 'axios'

axios.interceptors.request.use(config => {
   config.headers['token'] = localStorage.getItem('token')
   config.baseURL = 'https://twitter-backend-test.herokuapp.com'
   return config
})

export { axios }