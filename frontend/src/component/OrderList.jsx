import React from 'react'
import "../CSS/OrderList.css"
const OrderList = ({image,name,price,category}) => {
  return (
    <div className='flex'>
      <div className="product">
        <img src={image} alt="iamge" />
        <p>{name}</p>
      </div>
      <div className="price">
        {price}
      </div>
      <div className='category'>
        {category}
      </div>
      <div className='status'>
        pending
      </div>
    </div>
  )
}

export default OrderList
