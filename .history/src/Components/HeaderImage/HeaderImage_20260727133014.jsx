import React from 'react'
import { motion } from 'framer-motion';
const HeaderImage = () => {

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


  return (
        <motion.div variants={opacity} initial="initial" animate={selectedLink.isActive ? "open" : "closed"} className={styles.imageContainer}>
        <img 
        src={`/images/${src}`}
        fill={true}
        alt="image"
        />
    </motion.div>
  )
}

export default HeaderImage