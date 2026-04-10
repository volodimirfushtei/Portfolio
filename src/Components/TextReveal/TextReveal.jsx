import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const TextReveal = ({ text, className = '', delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay * 0.1 },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 60,
      rotate: 4,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.25em',
      }}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {words.map((word, index) => (
        <span key={index} style={{ display: 'inline-block' }}>
          <motion.span variants={child}>{word}&nbsp;</motion.span>
        </span>
      ))}
    </motion.div>
  )
}

export default TextReveal
