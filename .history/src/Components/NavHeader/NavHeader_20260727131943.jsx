import React, {useLayoutEffect, useRef} from 'react';
import {NAV_ITEMS} from '../../constants/navigations.js';
import TransitionLink from '../../hooks/useTransitionLink.jsx';
import FullscreenButton from '../FullScreenButton/FullScreenButton.jsx';
import styles from './NavHeader.module.css';
import gsap from 'gsap';
import {motion} from 'framer-motion';

const SvgIcon = React.memo (({id, className = '', width = 24, height = 24}) => (
  <svg
    className={`${styles.icon} ${className}`}
    width={width}
    height={height}
    aria-hidden="true"
  >
    <use href={`/sprite.svg#${id}`} />
  </svg>
));

const NavHeader = () => {
  const navRef = useRef (null);

  useLayoutEffect (() => {
    const tl = gsap.timeline ();

    tl.fromTo (
      navRef.current,
      {
        clipPath: 'polygon(0 0,100% 0,100% 0,0 0)',
      },
      {
        clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)',
        duration: 1,
        ease: 'expo.out',
      }
    );
  }, []);

  const translate = {
    initial: {
      y: '100%',
      opacity: 0,
    },
    enter: i => ({
      y: 0,
      opacity: 1,
      transition: {duration: 1, ease: [0.76, 0, 0.24, 1], delay: i[0]},
    }),
    exit: i => ({
      y: '100%',
      opacity: 0,
      transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i[1]},
    }),
  };
  return (
    <div className={styles.wrapper} ref={navRef}>
      <div className={styles.frame} />
      <div className={styles.fullscreenButton}>
        <FullscreenButton aria-label="Toggle fullscreen mode" />
      </div>
      <nav className={styles.nav}>

        {NAV_ITEMS.map (item => (
          <TransitionLink
            key={item.path}
            to={item.path}
            className={({isActive}) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            {item.label}

          </TransitionLink>
        ))}

      </nav>
      <div className={styles.footer}>
        <ul>
          <motion.li
            custom={[0.3, 0]}
            variants={translate}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <span>Made by:</span>Studio Fush
          </motion.li>
        </ul>
        <ul>
          <motion.li
            custom={[0.3, 0]}
            variants={translate}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <span>Typography:</span> Google Fonts
          </motion.li>
        </ul>
        <ul>
          <motion.li
            custom={[0.3, 0]}
            variants={translate}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <span>Images:</span> Envato
          </motion.li>
        </ul>
        <ul>
          <motion.li
            custom={[0.3, 0]}
            variants={translate}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            Privacy Policy
          </motion.li>
          <motion.li
            custom={[0.3, 0]}
            variants={translate}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            Terms & Conditions 2026
          </motion.li>
        </ul>
      </div>
    </div>
  );
};

export default NavHeader;
