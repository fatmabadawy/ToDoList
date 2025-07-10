import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Edit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState({
    title: '',
    description: '',
    completed: false,
    due_date: '',
  })

  const getTask = async (id) => {
    try {
      const response = await axios.get(`/tasks/${id}`)
      const task = response.data
      setData({
        title: task.title,
        description: task.description,
        completed: task.completed,
        due_date: task.due_date ? task.due_date.split('T')[0] : '',
      })
    } catch (error) {
      console.error('Error fetching task:', error)
    }
  }

  useEffect(() => {
    getTask(id)
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/tasks/${id}`, data)
      Swal.fire({
        title: 'Success',
        text: 'Task updated successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/')
      })
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          ✏️ Edit Task
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={onChange}
            className="border border-gray-300 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring focus:ring-cyan-200"
            required
          />

          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={data.description}
            onChange={onChange}
            rows="4"
            className="border border-gray-300 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring focus:ring-cyan-200"
          />

          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            name="due_date"
            value={data.due_date}
            onChange={onChange}
            className="border border-gray-300 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring focus:ring-cyan-200"
          />

          <div className="flex items-center mb-4">
            <input
              id="completed"
              type="checkbox"
              checked={data.completed}
              onChange={(e) =>
                setData({ ...data, completed: e.target.checked })
              }
              name="completed"
              className="mr-2 h-5 w-5 text-cyan-600 focus:ring-cyan-500"
            />
            <label htmlFor="completed" className="text-gray-700">
              Completed
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-md font-semibold transition"
            >
              Update Task
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-md font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
