import React, { useEffect } from 'react'
import './style.scss'
import { Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTags } from '../../redux/ducks/tags/actionCreators'
import { selectIsTagsLoading, selectTagsItems } from '../../redux/ducks/tags/selectors'
import { Link } from 'react-router-dom'

const Tags = () => {
   const dispatch = useDispatch()
   const tags = useSelector(selectTagsItems)
   const isLoading = useSelector(selectIsTagsLoading)
   useEffect(() => {
      dispatch(fetchTags())
   }, [dispatch])
   return (
      <div>
         <div className='trends'>
            <Typography className='title'>Trends for you</Typography>
            <div>
               {tags && tags.map((item) => (
                  <div key={item._id}>
                  <Link to={`/home/search/q=${item.name}`}>
                  <div className='trends__item item'>
                     <b>{item.name}</b>
                     <span>{item.count} Tweets</span>
                  </div>
                  </Link>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Tags
