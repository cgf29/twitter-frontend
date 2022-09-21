import React from 'react'
import './style.scss'
import { Row, Col, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { formatDate } from '../../helpers/formatDate'

const Comment = ({comment}) => {

   return (
      <div className='comment'>
         <Row>
            <Col span={4}>
               {comment.user.avatar !== undefined ? (<Avatar size={48} className='comment__avatar' src={comment.user.avatar}/>) : (
                  <Avatar size={48} className='comment__avatar' icon={<UserOutlined/>} />
               )}
            </Col>
            <Col span={20}>
               <Typography className='tweetcomment__nick'>
                  <Link to={`/user/${comment.user._id}`}><b>{comment.user.fullname}</b></Link>
                  <span className='comment__user-name'> @{comment.user.username} </span>
                  {/* <span style={{}}>{formatDate(new Date(comment.createdAt))}</span> */}
               </Typography>
               <Typography className='comment__text'>
                  {comment.text}
               </Typography>
               {/* <div className="tweet__btns">
                  <div>
                     <Button type='text'>
                        <HeartOutlined />
                     </Button>
                  </div>
                  <div>
                     <Button type='text'>
                        <RetweetOutlined />
                     </Button>
                  </div>
                  <div>
                     <Button type='text'>
                        <CommentOutlined />
                     </Button>
                  </div>
                  <div>
                     <Button type='text'>
                        <ToTopOutlined />
                     </Button>
                  </div>
               </div> */}
            </Col>
         </Row>
      </div>
   )
}

export default Comment
