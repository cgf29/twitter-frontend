import { axios } from './axios'

export const fetchTweetsApi = (userId) => {
   return axios.get(userId ? `/tweets/user/${userId}` : '/tweets').then(({ data }) => (data.data))
}

export const fetchTweetDataApi = (id) => {
   return axios.get('/tweets/' + id).then(({ data }) => (data))
}

export const addTweetApi = (payload) => {
   return axios.post('/tweets/', { text: payload }).then(({ data }) => (data.data))
}

export const deleteTweetApi = (payload) => {
   return axios.delete('/tweets/' + payload).then(({ data }) => (data.data))
}

export const updateTweetApi = (payload) => {
   return axios.patch('/tweets/' + payload.id, { text: payload.text }).then(({ data }) => (data.data))
}

export const likeTweetApi = async (payload) => {
   return await axios.patch('/tweets/like/' + payload).then(({ data }) => (data.data))
}

export const unlikeTweetApi = async (payload) => {
   return await axios.patch('/tweets/unlike/' + payload).then(({ data }) => (data.data))
}

export const commentTweetApi = async (payload) => {
   return await axios.patch('/tweets/comment/' + payload.id, { comment: payload.text }).then(({ data }) => (data.data))
}