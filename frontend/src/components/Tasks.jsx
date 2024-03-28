import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {

  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalCount: 0
  });
  // const fetchTasks = useCallback(() => {
  //   const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
  //   fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  // }, [authState.token, fetchData]);

  const fetchTasks = useCallback((page, limit) => {
    const config = {
      url: `/tasks?page=${page}&limit=${limit}`,
      method: "GET",
      headers: { Authorization: authState.token }
    };
  
    fetchData(config, { showSuccessToast: false }).then(data => {
      // Update state with the fetched tasks
      setTasks(data.tasks);
      // Optionally, update state with pagination metadata
      setPagination({
        page: data.page,
        totalPages: data.totalPages,
        totalCount: data.totalCount
      });
    }).catch(error => {
      console.error('Error fetching tasks:', error);
      // Handle error
    });
  }, [authState.token, fetchData]);
  
  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);


  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  }

  // const handleDelete = (id) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete?");
  //   if (confirmDelete) {
  //     const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
  //     fetchData(config)
  //       .then(() => {
  //         // Fetch tasks after successful deletion
  //         fetchTasks();
  //       })
  //       .catch((error) => {
  //         // Handle delete error
  //         console.error("Error deleting task:", error);
  //       });
  //   } else {
  //     // Handle cancellation of delete action
  //     console.log("Delete action canceled");
  //     // Optionally, you can display a message or perform other actions
  //   }
  // };
  
  // const handleDelete = (id) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete?");
  //   if (confirmDelete) {
  //     const config = {
  //       url: `/tasks/${id}`,
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: authState.token
  //       },
  //       body: JSON.stringify({ confirmation: true }) // Include confirmation flag
  //     };
  
  //     fetch(`/tasks/${id}`, config)
  //       .then(response => {
  //         if (response.ok) {
  //           // Handle success
  //           fetchTasks(pagination.page, 4); // Optionally, fetch tasks again to update the UI
  //         } else {
  //           // Handle error
  //           console.error("Error deleting task:", response.statusText);
  //         }
  //       })
  //       .catch(error => {
  //         // Handle network error
  //         console.error("Network error:", error);
  //       });
  //     // fetchData(config).then(() => fetchTasks());
  //   } else {
  //     // Cancel delete action
  //     console.log("Delete action canceled");
  //     alert("dlete action canceled")
  //   }
  // };


  
  return (
    <>
      <div className="my-2 mx-auto max-w-[700px] py-4">

        {tasks.length !== 0 && <h2 className='my-2 ml-2 md:ml-0 text-xl'>Your tasks ({tasks.length})</h2>}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks.length === 0 ? (

              <div className='w-[600px] h-[300px] flex items-center justify-center gap-4'>
                <span>No tasks found</span>
                <Link to="/tasks/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2">+ Add new task </Link>
              </div>

            ) : (
              tasks.map((task, index) => (
                <div key={task._id} className='bg-white my-4 p-4 text-gray-600 rounded-md shadow-md'>
                  <div className='flex'>

                    <span className='font-medium'>Task #{index + 1}</span>

                    <Tooltip text={"Edit this task"} position={"top"}>
                      <Link to={`/tasks/${task._id}`} className='ml-auto mr-2 text-green-600 cursor-pointer'>
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </Tooltip>

                    <Tooltip text={"Delete this task"} position={"top"}>
                      <span className='text-red-500 cursor-pointer' onClick={() => handleDelete(task._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </Tooltip>

                  </div>
                  <div className='whitespace-pre'>{task.description}</div>
                </div>
              ))
            )}
            <div className="flex justify-center mt-4">
                  {pagination.page > 1 && (
                    <button className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2" onClick={() => fetchTasks(pagination.page - 1, 4)}>Previous</button>
                  )}
                  <span className='px-4 py-2'>{pagination.page} of {pagination.totalPages}</span>
                  {pagination.page < pagination.totalPages && (
                    <button className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2" onClick={() => fetchTasks(pagination.page + 1, 4)}>Next</button>
                  )}
                </div>
          </div>
        )}
      </div>
    </>
  )

}

export default Tasks