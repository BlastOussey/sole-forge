import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Customize from './pages/Customize.jsx'
import Collection from './pages/Collection.jsx'
import EditSneaker from './pages/EditSneaker.jsx'

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Customize />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/edit/:id" element={<EditSneaker />} />
      </Routes>
    </div>
  )
}
