import { useRef } from 'react'
import clsx from 'clsx'
import styles from './Button.module.css'

/**
 * Button — Premium interactive button with shimmer & ripple effects.
 *
 * Variants:  primary | secondary | ghost | outline | glow
 * Sizes:     sm | md | lg | xl
 */
export default function Button({
children,
  variant = 'secondary',
  size = 'md',
  className,
  onClick,
  disabled,
  type = 'button',
  ...props
}) {
  const rippleRef = useRef(null)

  const handleClick = (e) => {
    // Ripple effect
    const btn = e.currentTarget
    const ripple = document.createElement('span')
    const rect = btn.getBoundingClientRect()
    const diameter = Math.max(rect.width, rect.height) * 2
    const x = e.clientX - rect.left - diameter / 2
    const y = e.clientY - rect.top - diameter / 2

    ripple.style.cssText = `
      position:absolute;
      width:${diameter}px;
      height:${diameter}px;
      left:${x}px;
      top:${y}px;
      border-radius:50%;
      background:rgba(242, 116, 116, 0.18);
      transform:scale(0);
      animation:${styles.rippleAnim || 'btnRipple'} 0.55s linear;
      pointer-events:none;
    `
    btn.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove())

    onClick?.(e)
  }

  return (
    <button
     
      type={type}
      disabled={disabled}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        className,
      )}
      onClick={!disabled ? handleClick : undefined}
      {...props}
    >
      {/* shimmer sweep */}
      <span className={styles.shimmer} aria-hidden="true" />
      {/* content */}
      
      <span className={styles.inner}>{children}</span>
    </button>
  )
}