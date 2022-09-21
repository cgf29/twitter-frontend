import React from 'react'
import './style.scss'
import Avatar from 'antd/lib/avatar/avatar'
import { UserOutlined, SmileOutlined, PictureOutlined } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'
import { Button, notification } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAddTweet } from '../../redux/ducks/tweets/actionCreators'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAddFormState } from '../../redux/ducks/tweets/selectors'
import UploadImage from '../UploadImage'
import { fetchCommentTweet } from '../../redux/ducks/tweet/actionCreators'
import { useHistory } from 'react-router'
import { selectUserData } from '../../redux/ducks/user/selectors'

const CreateTweetForm = ({ type }) => {
   const [inputValue, setInputValue] = useState('')
   const dispatch = useDispatch()
   const addFormState = useSelector(selectAddFormState)
   const user = useSelector(selectUserData)
   const history = useHistory()
   const tweetId = history.location.pathname.split('/').pop()

   useEffect(() => {
      if (addFormState === 'ERROR') {
         notification.open({
            style: { backgroundColor: '#ffd2da' },
            message: 'Error while adding a tweet',
         })
      }
   }, [addFormState])

   const handleChangeValue = (e) => {
      if (e.currentTarget.value.length <= 280) {
         setInputValue(e.currentTarget.value)
      }
   }

   const handleClickAddTweet = () => {
      if (type === 'add') {
         dispatch(fetchAddTweet(inputValue))
      } else if (type === 'comment') {
         dispatch(fetchCommentTweet({ id: tweetId, text: inputValue }))
      }

      setInputValue('')
   }
   return (
      <div className='create-tweet'>
         <div className='create-tweet__avatar'>
            {user && user.avatar ? (
               <Avatar src={user.avatar} size={48} icon={<UserOutlined />} />
            ) : (
               <Avatar size={48} icon={<UserOutlined />} />
            )}
         </div>
         <div className='create-tweet__main'>
            <div className='create-tweet__text-area'>
               <TextArea
                  autoSize={{ maxRows: 15 }}
                  placeholder="What's happening?"
                  bordered={false}
                  value={inputValue}
                  onChange={handleChangeValue}
               />
            </div>
            <div className='create-tweet__btns'>
               <div>
                  {/* <UploadImage /> */}
                  <span>{inputValue.length} / 280</span>
               </div>
               <Button
                  loading={addFormState === 'LOADING'}
                  disabled={!inputValue}
                  onClick={handleClickAddTweet}
                  type='primary'
                  style={{ borderRadius: 20, height: 30, width: 70 }}
               >
                  Tweet
               </Button>
            </div>
         </div>
      </div>
   )
}

export default CreateTweetForm
