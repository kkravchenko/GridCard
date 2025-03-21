import { useEffect, useState } from 'react'
import { Slider } from '.'

export const Card = ({ cardData }) => {
  const [card, setCard] = useState()

  useEffect(() => {
    setCard(cardData)
  }, [cardData])

  return (
    <div className='card'>
      <Slider imagesData={card?.images ? card.images : []}></Slider>
      <div className='detail'>
        <div className='detail-container'>
          <div className='detail-name'>{card?.generalInfo?.name}</div>
          <div className='detail-price'>
            {card?.generalInfo?.price.toLocaleString('en-US')}
          </div>
        </div>
        <div className='detail-address'>{card?.generalInfo?.province}</div>
        <div className='detail-attrs'>
          <div className='attr detail-beds'>
            {card?.generalInfo?.rooms} Beds
          </div>
          <div className='attr detail-baths'>
            {card?.generalInfo?.bathrooms} Baths
          </div>
          <div className='attr detail-sqft'>{card?.generalInfo?.size} sqft</div>
        </div>
      </div>
    </div>
  )
}
