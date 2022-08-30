import { NavLink } from 'react-router-dom'

type NavtabProps = {
  label: string
  to: string
}

export default function NavTab({ label, to }: NavtabProps) {
  const activeClassNames =
    'text-indigo-600 border-indigo-600 flex-1 whitespace-nowrap border-b-2 px-1 font-medium text-2xl'
  const noActiveClassNames =
    'text-gray-900 border-transparent flex-1 whitespace-nowrap border-b-2 px-1 font-medium text-2xl'

  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? activeClassNames : noActiveClassNames
      }
      role="tab"
      type="button"
      to={to}
    >
      {label}
    </NavLink>
  )
}
