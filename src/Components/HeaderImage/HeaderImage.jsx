import React, { useLayoutEffect } from 'react'
import { imagesNavHeader } from '../../constants/navigations.js'
import styles from './HeaderImage.module.css'
import gsap from 'gsap'

const HeaderImage = ({ selectedLink }) => {
  const imageRef = React.useRef(null)

  const selectedImage = imagesNavHeader.find(
    image => image.link === selectedLink.path,
  )

  if (!selectedImage) return null

  useLayoutEffect(() => {
    if (!imageRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        },
      )
    }, imageRef)

    return () => ctx.revert()
  }, [selectedLink.path])


  return (
    <div

      className={styles.imageContainer}>
      <img ref={imageRef}
           src={selectedImage.src}
           alt="image"

      />
    </div>
  )
}

export default HeaderImage