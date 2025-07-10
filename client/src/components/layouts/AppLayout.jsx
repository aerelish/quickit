import Navbar from '@/components/Navbar'

function AppLayout({children}) {
  return (
    <div className='w-screen h-screen'>
      <Navbar/>
      {children}
    </div>
  )
}

export default AppLayout