import React from 'react'

const HeroMedia = () => {
  return (
      {/* Image Content */}

      < className={styles.heroMediaWrapper}>
      <FadeInAnimate
        direction="up"
        delay={0.2}
        triggerOnce={false}
        duration={0.8}
      >
        <div className={styles.heroMediaContainer}>
          <div className={styles.videoWrapper}>
            <video
              src={introVideo}
              autoPlay
              muted
              loop
              playsInline
              className={styles.heroVideo}
            />

            {/* Modern gradient overlay */}
            <div className={styles.videoGradientOverlay} />

            {/* Floating particles effect */}
            <div className={styles.floatingParticles}>
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={styles.particle}
                  style={{
                    "--size": `${Math.random() * 0.5 + 0.3}rem`,
                    "--delay": `${i * 0.2}s`,
                    "--x-offset": `${Math.random() * 300 - 150}px`,
                    "--y-offset": `${Math.random() * 300 - 150}px`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Modern status badge */}
          <div className={styles.statusBadge}>
            <div className={styles.badgeContent}>
              <div className={styles.pulseDot} />
              <span className={styles.badgeText}>
                <i className="bi bi-lightning-charge-fill" />
                Available for collaborations
              </span>
            </div>
            <div className={styles.badgeGlow} />
          </div>
              </div>
              
        </FadeInAnimate>
    
      </div>
  )
}


export default HeroMedia