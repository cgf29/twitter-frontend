import React, { useState, useEffect, useRef, useCallback } from 'react'
import { PictureOutlined, CloseOutlined } from '@ant-design/icons'
import './style.scss'

const UploadImage = () => {
   const [images, setImages] = useState([])
   const inputRef = useRef()

   const handleInputChange = useCallback((e) =>  {
      if(e.target){
         console.log(e.target.files)
         const file = e.target.files[0]
         if(file){
            const fileObj = new Blob([file])
            setImages(prev => [...prev, URL.createObjectURL(fileObj)])
         }
      }
   }, [])

   const removeImage = url => {
      setImages(prev => prev.filter(image => image !== url)
      )
   }
   useEffect(() => {
      if(inputRef.current){
         inputRef.current.addEventListener('change', handleInputChange)
      }
      
      return () => {
         if(inputRef.current){
            inputRef.current.removeEventListener('change', handleInputChange)
         }
      }
   }, [])

   return (
      <div>
         <label className='upload-icon' htmlFor='input'>
            <PictureOutlined />
         </label>
         <input ref={inputRef} type="file" hidden id="input"/>
         <div className='images-list'> 
            {images.map(url => {
               return (
               <div>
                  <div key={url} className='images-list__item' style={{backgroundImage: `url(${url})`}}/>
                  <CloseOutlined onClick={() => removeImage(url)}/>
               </div>
               )
            })}
         </div>
      </div>
   )
}

export default UploadImage
