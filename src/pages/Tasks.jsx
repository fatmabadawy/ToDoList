import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa'

export default function Tasks() {
  let i = 1
  const [tasks, setTasks] = useState([])

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
      setTasks((e) => e.filter((task) => task.id !== id))
    } catch (err) {
      Swal.fire('Error!', 'Something went wrong while deleting.', 'error')
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="min-h-screen bg-gray-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">📝 Task Manager</h1>
          <Link
            to="/Add"
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md shadow-md transition"
          >
            <FaPlus />
            <span>Add Task</span>
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl bg-white border border-gray-200 shadow">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-200 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-400">
                    No tasks available.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">{i++}</td>
                    <td className="px-6 py-4 font-medium">{task.title}</td>
                    <td className="px-6 py-4">{task.description}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
                        <button className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-md shadow-sm transition">
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        title="Delete Task"
                        onClick={() => {
                          Swal.fire({
                            title: 'Are you sure?',
                            text: `You won't be able to undo deleting task `,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#e11d48',
                            cancelButtonColor: '#6b7280',
                            confirmButtonText: 'Yes, delete it!',
                            cancelButtonText: 'Cancel',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteTask(task.id)
                              Swal.fire(
                                'Deleted!',
                                `Task has been deleted.`,
                                'success'
                              )
                            }
                          })
                        }}
                        className="bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-md shadow-sm transition"
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
    </div>
  )
}
