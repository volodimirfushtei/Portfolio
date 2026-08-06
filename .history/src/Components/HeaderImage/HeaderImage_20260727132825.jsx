import React from 'react'

const HeaderImage = () => {
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