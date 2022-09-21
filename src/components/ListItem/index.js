import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import './style.scss'
import classNames from 'classnames'

const ListItem = ({title, icon, to}) => {
   return (
         <li className={classNames(title ? 'list-item' : 'twitter')}>
            <Link to={to}>
               {icon}
               {title && <Typography level={5}>{title}</Typography>}
            </Link>
         </li>
   )
}

export default ListItem
