import React from 'react'
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <>
      <div  className='relative bg-gradient-to-br from-green-300 to-blue-300 min-h-screen  backdrop-filter backdrop-blur-lg overflow-x-hidden'  id ="kurale-regular">
        <Navbar />
        {children}
      </div>
    </>
  )
}

export default MainLayout;