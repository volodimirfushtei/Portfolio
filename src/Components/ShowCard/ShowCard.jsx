import React, { useState } from "react";
import styles from "./ShowCard.module.css";

const ShowCard = ({ frontContent, backContent }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div className={styles.cardContainer} onClick={handleFlip}>
      <div className={`${styles.card} ${flipped ? styles.flipped : ""}`}>
        <div className={styles.front}>{frontContent}</div>
        <div className={styles.back}>{backContent}</div>
      </div>
    </div>
  );
};

export default ShowCard;
