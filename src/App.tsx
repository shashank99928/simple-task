import { Suspense, lazy } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoadingSpinner from './components/common/LoadingSpinner'

const TaskListPage = lazy(() => import('./pages/TaskList/TaskListPage'))
const TaskDetails = lazy(() => import('./pages/TaskDetails/TaskDetails'))
const NotFound = lazy(() => import('./components/common/NotFound'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App
