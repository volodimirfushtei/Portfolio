import React from 'react';
import styles from './NoiseOverlay.module.css';

const NoiseOverlay = () => {
  return (
    <div className={styles.noise} aria-hidden="true" />
  );
};

export default NoiseOverlay;
