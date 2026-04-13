import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./TestError.module.css";

const errorTypes = [
  { key: "nullReference", label: "Null Reference" },
  { key: "undefinedFunction", label: "Undefined Function" },
  { key: "runtimeError", label: "Runtime Error" },
  { key: "range", label: "Range Error" },
];

const TestError = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [errorType, setErrorType] = useState(null);

  /* ── Reveal animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from(cardRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.15,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── Simulate errors ── */
  if (errorType) {
    switch (errorType) {
      case "nullReference":
        return <div>{null.someProperty}</div>;
      case "undefinedFunction":
        return <div>{{}.nonExistentFunction()}</div>;
      case "runtimeError":
        throw new Error("Simulated runtime error");
      case "range":
        return <div>{[1, 2, 3][10].toString()}</div>;
      default:
        return null;
    }
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* DotGrid background */}
      <div className={styles.noise} />

      {/* Card */}
      <div ref={cardRef} className={styles.card}>
        {/* Header */}
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          <span className={styles.eyebrowText}>Test Interface</span>
        </div>

        <h1 className={styles.title}>
          Error Boundary
          <br />
          <span className={styles.titleAccent}>Testing</span>
        </h1>

        <p className={styles.desc}>
          Click any button to trigger a specific error scenario.
        </p>

        {/* Error buttons */}
        <div className={styles.grid}>
          {errorTypes.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setErrorType(key)}
              className={styles.errorBtn}
              aria-label={`Trigger ${label} error`}
              type="button"
            >
              <span className={styles.errorBtnDot} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {/* Reset */}
        <button
          onClick={() => setErrorType(null)}
          className={styles.resetBtn}
          type="button"
        >
          <span>Reset</span>
          <span className={styles.resetArrow}>↺</span>
        </button>

        {/* Warning */}
        <p className={styles.warning} aria-live="polite">
          <span className={styles.warningIcon} aria-hidden="true">
            ⚠
          </span>
          Clicking these buttons will crash the component
        </p>
      </div>
    </section>
  );
};

export default TestError;
