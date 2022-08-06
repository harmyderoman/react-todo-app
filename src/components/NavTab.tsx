import { NavLink } from 'react-router-dom'

type NavtabProps = {
  label: string
  to: string
}

export default function NavTab({ label, to }: NavtabProps) {
  const activeClassName =
    'text-indigo-600 border-indigo-600 flex-1 whitespace-nowrap border-b-2 px-1 font-medium'
  const noActiveClassName =
    'text-gray-900 border-transparent flex-1 whitespace-nowrap border-b-2 px-1 font-medium'

  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? activeClassName : noActiveClassName
      }
      role="tab"
      type="button"
      to={to}
    >
      {label}
    </NavLink>
  )
}
