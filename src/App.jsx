import { Route, Routes } from 'react-router-dom'
import Demo from './Demo.jsx'
import Landing from './Landing.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/demo" element={<Demo />} />
    </Routes>
  )
}
