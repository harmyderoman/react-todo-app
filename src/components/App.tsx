import { Routes, Route, NavLink } from 'react-router-dom'
import List from 'pages/List'
import Note from 'pages/Note'

function App() {
  const activeClassName =
    'text-indigo-600 border-indigo-600 flex-1 whitespace-nowrap border-b-2 py-4 px-1 font-medium'
  const noActiveClassName =
    'text-gray-900 border-transparent flex-1 whitespace-nowrap border-b-2 py-4 px-1 font-medium'

  return (
    <div className="bg-white">
      <NavLink
        className={({ isActive }) =>
          isActive ? activeClassName : noActiveClassName
        }
        role="tab"
        type="button"
        to="/"
      >
        List
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive ? activeClassName : noActiveClassName
        }
        role="tab"
        type="button"
        to="/note"
      >
        Note
      </NavLink>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="note" element={<Note />} />
      </Routes>
    </div>
  )
}

export default App
