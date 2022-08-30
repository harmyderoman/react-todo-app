import { NavLink } from 'react-router-dom'

type NavtabProps = {
  label: string
  to: string
}

export default function NavTab({ label, to }: NavtabProps) {
  
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? 'td-navtab td-navtab-active' : 'td-navtab'
      }
      role="tab"
      type="button"
      to={to}
    >
      {label}
    </NavLink>
  )
}
