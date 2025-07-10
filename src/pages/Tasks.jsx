import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa'

export default function Tasks() {
  let i = 1;
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await axios.get('/tasks')
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`)
      setTasks(e => e.filter(task => task.id !== id))
      Swal.fire('Deleted!', 'The task has been deleted.', 'success')
    } catch (err) {
      Swal.fire('Error!', 'Something went wrong while deleting.', 'error')
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-gray-800">📝 Task Manager</h1>
        <Link
          to="/Add"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow"
        >
          <FaPlus />
          <span>Add Task</span>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Completed</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No tasks available
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">{i++}</td>
                  <td className="px-6 py-4">{task.title}</td>
                  <td className="px-6 py-4">{task.description}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        task.completed
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {task.completed ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {task.due_date
                      ? new Date(task.due_date).toLocaleDateString()
                      : '-'}
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <Link to={`/Edit/${task.id}`} title="Edit Task">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      title="Delete Task"
                      onClick={() => {
                        Swal.fire({
                          title: 'Are you sure?',
                          text: `You won't be able to undo deleting task #${task.id}!`,
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#d33',
                          cancelButtonColor: '#3085d6',
                          confirmButtonText: 'Yes, delete it!',
                          cancelButtonText: 'Cancel',
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteTask(task.id);
                            Swal.fire(
                              'Deleted!',
                              `Task #${task.id} has been deleted.`,
                              'success'
                            )
                          }
                        })
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
