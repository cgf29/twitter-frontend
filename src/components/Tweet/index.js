import React from 'react'
import { Row, Col, Typography, Button } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { RetweetOutlined, ToTopOutlined, HeartOutlined, CommentOutlined, UserOutlined } from '@ant-design/icons'
import './style.scss'
import { Link } from 'react-router-dom'
import { formatDate } from '../../helpers/formatDate'

const Tweet = ({user, text, _id, createdAt}) => {
   return (
      <Link to={`/home/tweet/${_id}`}>
      <div className='tweet'>
         <Row>
            <Col span={4}>
               {user.avatar ? (<Avatar size={48} className='tweet__avatar' src={user.avatar}/>) : (
                  <Avatar size={48} className='tweet__avatar' icon={<UserOutlined/>} />
               )}
            </Col>
            <Col span={20}>
               <Typography className='tweet__nick'>
                  <Link to={`/user/${user._id}`}><b>{user.fullname}</b></Link>
                  <span className='tweet__user-name'> @{user.username} </span>
                  <span style={{}}>{formatDate(new Date(createdAt))}</span>
               </Typography>
               <Typography className='tweet__text'>
                  {text}
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
      </Link>
   )
}

export default Tweet
