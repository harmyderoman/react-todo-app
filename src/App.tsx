import { Routes, Route } from 'react-router-dom'
import List from 'pages/List'
import Note from 'pages/Note'
import NavTab from 'components/NavTab'

function App() {
  return (
    <div className="bg-white py-4 flex flex-col items-center border">
      <div className="w-max pb-3 gap-2 flex">
        <NavTab to="/" label="List" />
        <NavTab to="/note" label="New Note" />
      </div>

      <Routes>
        <Route path="/" element={<List />} />
        <Route path="note" element={<Note />}>
          <Route path=":noteId" element={<Note />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
