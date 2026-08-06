import React from 'react'
import { motion } from 'framer-motion';
import { imagesNavHeader } from '../../constants/navigations.js';
import styles from './HeaderImage.module.css';
const HeaderImage = ({src, selectedLink}) => {

 const opacity = {
    initial: {
        opacity: 0
    },
    open: {
        opacity: 1,
        scale: 1,
        transition: {duration: 0.35}
    },
    closed: {
        opacity: 0,
        scale: 0.8,
        transition: {duration: 0.35}
    }
}
const selectedImage = imagesNavHeader.find(image => image.link === selectedLink.path);
  if (!selectedImage) {
    return null; // Return null if no matching image is found
  }

  return (
        <motion.div variants={opacity} initial="initial" animate={selectedLink.isActive ? "open" : "closed"} className={styles.imageContainer}>
        <img 
        src={selectedImage.src}
        fill={true}
        alt="image"
        />
    </motion.div>
  )
}

export default HeaderImage