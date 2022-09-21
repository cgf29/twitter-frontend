import axios from 'axios'

export const uploadImage = async (image) => {
   const formData = new formData()
   formData.append('image', image)

   const {data} = await axios.post('http://localhost:8888/upload', formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      }
   })
   return data
}