import { useState } from 'react'
import styles from '../Cards/Cards.module.css'

const cards = [
  {
    image: '/images/card_1.webp',
    alt: 'Abstract blue waves',
    label: 'Waves',
  },
  {
    image: '/images/card_3.webp',
    alt: 'Abstract 3D geometric structure',
    label: 'Structure',
  },
  {
    image: '/images/card_2.webp',
    alt: 'Abstract 3D curves and spheres',
    label: 'Curves',
  },
]

const Cards = () => {
  const [activeIndex, setActiveIndex] = useState(1)

  return (
    <div
      className={styles.container}
      onMouseLeave={() => setActiveIndex(1)}
    >
      {cards.map((card, index) => {
        const position = index - activeIndex
        const isActive = index === activeIndex

        return (
          <div
            key={card.image}
            className={`${styles.card} ${styles[`c${index + 1}`]} ${
              isActive ? styles.active : styles.inactive
            }`}
            style={{
              '--position': position,
              '--index': index,
            }}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <img
              src={card.image}
              alt={card.alt}
              className={styles.avatar}
              loading="lazy"
              width="100"
              height="100"
            />

            {/* Статус */}
            <span className={`${styles.avatarStatus} ${isActive ? styles.online : ''}`} />

            {/* Лейбл */}
            <span className={styles.label}>{card.label}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Cards