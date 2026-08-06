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
      gsap.fromTo(imageRef.current, {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          scale: 0.8,
          opacity: 0,
          duration: 1,
          ease: 'Power2.easeOut',
        }, {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'Power2.easeOut',
        },
      )


    })
    return () => {

      ctx.revert()


    }
  }, [selectedLink.path])


  return (
    <div

      className={styles.imageContainer}>
      <img ref={imageRef}
           src={selectedImage.src}
           width={300}
           height={180}
           alt="image"
      />
    </div>
  )
}

export default HeaderImage