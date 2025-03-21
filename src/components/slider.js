import { useEffect, useState } from 'react'
import { Bage, Wishlist } from '.'

export const Slider = ({ imagesData }) => {
  const [images, setImages] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    setImages(imagesData)
  }, [imagesData])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className='slider'>
      <div
        className='slides'
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {images.map((image, idx) => (
          <div
            key={idx}
            className='slide'
            style={{ backgroundImage: `url(${image.small})` }}
          >
            <Bage text='New building'></Bage>
            <Wishlist />
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className='slider-button'>
        Назад
      </button>
      <button onClick={nextSlide} className='slider-button prev'>
        Вперед
      </button>
    </div>
  )
}
