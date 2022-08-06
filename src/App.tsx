import { Routes, Route } from 'react-router-dom'
import List from 'pages/List'
import Note from 'pages/Note'
import NavTab from 'components/NavTab'

function App() {
  return (
    <div className="bg-white py-4">
      <NavTab to="/" label="List" />
      <NavTab to="/note" label="New Note" />

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
