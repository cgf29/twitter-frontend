import { axios } from './axios'

export const signInApi = (payload) => {
   return axios
      .post('/auth/login', {
         username: payload.payload.email,
         password: payload.payload.password,
      })
      .then(({ data }) => data)
}

export const signUpApi = (payload) => {
   console.log(payload)
   return axios
      .post('/auth/register', {
         username: payload.payload.username,
         fullname: payload.payload.fullname,
         email: payload.payload.email,
         password: payload.payload.password,
         password2: payload.payload.password2,
      })
      .then(({ data }) => data)
}

export const getMeApi = (payload) => {
   return axios
      .get('/users/me')
      .then(({ data }) => data)
}

export const getUserInfo = (id) => {
   return axios
      .get('/users/' + id)
      .then(({ data }) => data)
}

export const uploadAvatarApi = (payload) => {
   return axios
      .post('/users/upload/avatar', payload)
      .then(({ data }) => data)
}

export const followApi = (payload) => {
   return axios
      .patch('/users/follow/' + payload)
      .then(({ data }) => data)
}

export const getUsersApi = () => {
   return axios
      .get('/users/')
      .then(({ data }) => data)
}

export const getSearchUsersByLettersApi = (letters) => {
   return axios
      .get('/users/searchByLetters/' + letters)
      .then(({ data }) => data)
}