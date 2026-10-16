import clsx from 'clsx'
import styles from './Button.module.css'

export default function Button({
                                 children,
                                 variant = 'secondary',
                                 size = 'sm',
                                 className,
                                 ...props
                               }) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}