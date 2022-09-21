import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {
   fetchTweet,
   deleteTweet,
   fetchUpdateTweet,
   fetchLikeTweet,
   fetchUnlikeTweet,
} from '../../../redux/ducks/tweet/actionCreators'
import { useSelector } from 'react-redux'
import {
   selectTweetData,
   selectIsTweetLoaded,
   selectIsTweetLoading,
} from '../../../redux/ducks/tweet/selectors'
import Tweet from '../../../components/Tweet'
import {
   LoadingOutlined,
   UserOutlined,
   HeartOutlined,
   RetweetOutlined,
   CommentOutlined,
   ToTopOutlined,
   MoreOutlined,
   HeartFilled,
} from '@ant-design/icons'
import { Spin, Button, Popover, Input, Popconfirm } from 'antd'
import { format } from 'date-fns'
import Avatar from 'antd/lib/avatar/avatar'
import { selectUserData } from '../../../redux/ducks/user/selectors'
import './style.scss'
import Modal from 'antd/lib/modal/Modal'
import CreateTweetForm from '../../../components/CreateTweetForm'
import Comment from '../../../components/Comment'

const FullTweet = () => {
   const [isChanging, setIsChanging] = useState(false)
   const [input, setInput] = useState('')
   const [liked, setLiked] = useState(false)
   const [visibleAddTweet, setVisibleAddTweet] = useState(false)
   const params = useParams()
   const history = useHistory()
   const id = params.id
   const dispatch = useDispatch()
   const user = useSelector(selectUserData)
   const tweetData = useSelector(selectTweetData)
   const isLoading = useSelector(selectIsTweetLoading)
   const loadingSpin = <LoadingOutlined style={{ fontSize: 40 }} spin />

   useEffect(() => {
      dispatch(fetchTweet(id))
   }, [dispatch, id])

   useEffect(() => {
      if (tweetData && user) {
         setInput(tweetData.text)
         setLiked(tweetData.likes.includes(user._id))
      }
   }, [tweetData])

   if (isLoading) {
      return (
         <div className='tweets__spinLoading'>
            <Spin indicator={loadingSpin} />
         </div>
      )
   }

   if (!tweetData) {
      return (
         <div className='tweets__spinLoading'>
            <Spin indicator={loadingSpin} />
         </div>
      )
   }

   const handleDeleteTweet = () => {
      dispatch(deleteTweet(id))
      history.goBack()
   }

   const handleIsChanging = (value) => {
      setIsChanging(value)
   }

   const handleUpdateTweet = () => {
      if (input.length > 0 && input.length <= 280) {
         dispatch(fetchUpdateTweet({ id, text: input }))
         setIsChanging(false)
      }
   }

   const handleLike = () => {
      if (liked) {
         dispatch(fetchUnlikeTweet(id))
         setLiked(false)
      } else {
         dispatch(fetchLikeTweet(id))
         setLiked(true)
      }
   }

   const openAddTweet = (e) => {
      setVisibleAddTweet(true)
   }

   const closeAddTweet = (e) => {
      setVisibleAddTweet(false)
   }

   const content = (
      <>
         <Popconfirm
            title='Are you sure want to delete this tweet?'
            onConfirm={handleDeleteTweet}
            // onCancel={cancelDelete}
            okText='Yes'
            cancelText='No'
         >
            <div style={{cursor: 'pointer'}}>Delete tweet</div>
         </Popconfirm>
         <div onClick={() => handleIsChanging(true)} style={{cursor: 'pointer'}}>Update tweet</div>
      </>
   )

   if (tweetData) {
      return (
         <div>
            <div className='full-tweet'>
               <div className='full-tweet__header'>
                  <div className='full-tweet__right-top'>
                     <div className='full-tweet__avatar'>
                        <Avatar
                           size={48}
                           className='tweet__avatar'
                           src={tweetData.user.avatar}
                           icon={<UserOutlined />}
                        />
                     </div>
                     <div className='full-tweet__name'>
                        <b>{tweetData.user.fullname}</b>
                        <span className='tweet__user-name'>
                           {' '}
                           @{tweetData.user.username}{' '}
                        </span>
                     </div>
                  </div>
                  {user && user._id == tweetData.user._id && (
                     <div className='full-tweet__more'>
                        <Popover
                           placement='topLeft'
                           content={content}
                           trigger='click'
                        >
                           <MoreOutlined />
                        </Popover>
                     </div>
                  )}
               </div>
               <div className='full-tweet__content'>
                  <div className='full-tweet__text'>
                     {isChanging ? (
                        <Input
                           onChange={(e) => setInput(e.target.value)}
                           value={input}
                        />
                     ) : (
                        <div className='full-tweet__text'>{tweetData.text}</div>
                     )}
                     {isChanging && (
                        <>
                           <Button
                              danger
                              onClick={() => handleIsChanging(false)}
                           >
                              Cancel
                           </Button>
                           <Button type='primary' onClick={handleUpdateTweet}>
                              Change
                           </Button>
                        </>
                     )}
                  </div>
                  <div className='full-tweet__date'>
                     <span>
                        {format(new Date(tweetData.createdAt), 'H:mm')} ·{' '}
                     </span>
                     <span>
                        {format(new Date(tweetData.createdAt), 'dd MMM. yyyy')}
                     </span>
                  </div>
               </div>
               <div className='full-tweet__btns'>
                  <div>
                     <Button type='text' onClick={handleLike}>
                        {liked ? (
                           <HeartFilled style={{ color: 'red' }} />
                        ) : (
                           <HeartOutlined />
                        )}

                        {tweetData.likes.length}
                     </Button>
                  </div>
                  {/* <div>
                  <Button type='text'>
                     <RetweetOutlined />
                  </Button>
               </div> */}
                  <div>
                     <Button type='text'>
                        <CommentOutlined onClick={openAddTweet} />
                        <Modal
                           style={{ top: 30 }}
                           className='full-tweet__comment-modal'
                           visible={visibleAddTweet}
                           onCancel={closeAddTweet}
                           footer={null}
                        >
                           <CreateTweetForm type='comment' />
                        </Modal>
                     </Button>
                  </div>
                  {/* <div>
                  <Button type='text'>
                     <ToTopOutlined />
                  </Button>
               </div> */}
               </div>
            </div>
            <div className="comments">
               {tweetData.comments.map(comment => <Comment key={comment._id} comment={comment}/>)}
            </div>
         </div>
      )
   }
}

export default FullTweet
