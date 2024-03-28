import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';
// import {SearchIcon} from '@heroicons/react/outline';
const Home = () => {

  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;
  

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState, isLoggedIn]);

 

  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          // <div className='bg-primary text-white h-[40vh] py-8 text-center'>
          //   <h1 className='text-2xl'> Welcome to Task Manager App</h1>
          //   <Link to="/signup" className='mt-10 text-xl block space-x-2 hover:space-x-4'>
          //     <span className='transition-[margin]'>Join now to manage your tasks</span>
          //     <span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-arrow-right"></i></span>
          //   </Link>
          // </div>
          <div className='relative bg-gradient-to-br from-green-300 to-blue-300 text-white min-h-screen flex flex-col justify-center items-center px-8 '>
          <h1 className='text-4xl mb-8'>Welcome to Task Manager App</h1>
          <Link to="/signup" className='text-xl block space-x-2 hover:space-x-4'>
            <span className='transition-[margin]'>Join now to manage your tasks</span>
            <span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-arrow-right"></i></span>
          </Link>
        </div>
        ) : (
          <>
          <div className='flex justify-between items-center mx-8 mt-8 mb-4'>
            <h1 className='text-lg mt-8 mx-8 border-b border-b-gray-300'>Welcome {authState.user.name}</h1>

            {/* <i className="fa-solid fa-bars"></i> */}
            {/* <SearchIcon className="h-6 w-6 absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400" /> Adjust right and top position */}
           
            </div>
            <Tasks />
          </>
        )}
      </MainLayout>
    </>
  )
}

export default Home

