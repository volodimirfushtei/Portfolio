import { NavLink, useNavigate } from 'react-router-dom'
import { useOverlay } from '../Components/OverlayProvider/OverlayProvider.jsx'

export default function TransitionLink({
                                         to,
                                         children,
                                         className,
                                         ...props
                                       }) {
  const navigate = useNavigate()
  const { show } = useOverlay()

  const handleClick = async (e) => {
    e.preventDefault()

    if (window.location.pathname === to) return

    await show()
    navigate(to)
  }

  return (
    <NavLink
      to={to}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </NavLink>
  )
}