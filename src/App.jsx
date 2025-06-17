import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Todo from './pages/Todo';
import Water from './pages/Water';
import './css/App.css'

function App() {
  
  return (
    <>
      <Navbar/>
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Todo/>}/>
          <Route path="/water" element={<Water/>}/>
        </Routes>
      </main>
      {/* <Footer/> */}
    </>
  )
}

export default App
