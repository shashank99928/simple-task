import './App.css'
import { Routes, Route } from 'react-router-dom'
import TaskListPage from './pages/TaskList/TaskListPage'
import TaskDetails from './pages/TaskDetails/TaskDetails'
import NotFound from './components/common/NotFound'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
