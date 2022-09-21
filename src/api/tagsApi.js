import axios from "axios"

export const fetchTagsApi = () => {
   return axios.get('/tags').then(({ data }) => (data))
}