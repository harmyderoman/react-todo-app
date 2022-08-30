import { Routes, Route } from 'react-router-dom'
import List from 'pages/List'
import Note from 'pages/Note'
import NavTab from 'components/NavTab'

function App() {


  return (
    <div className="td-main-container">
      <div className="td-navbar">
        <NavTab to="/" label="List of Notes" />
        <NavTab to="/note" label="Note" />
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
