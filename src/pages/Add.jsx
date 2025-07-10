import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function Add() {
  const navigate = useNavigate()

  const [data, setData] = useState({
    title: '',
    description: '',
    completed: false,
    due_date: '',
  })

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/tasks', data)
      Swal.fire({
        title: 'Task Created',
        text: 'Your task has been added successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/')
      })
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white p-10 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2  focus:ring-cyan-700  focus:border-cyan-700"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={data.description}
              onChange={onChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2  focus:ring-cyan-700  focus:border-cyan-700"
            />
          </div>

          <div>
            <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="due_date"
              value={data.due_date}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-700  focus:border-cyan-700 "
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="completed"
              checked={data.completed}
              onChange={(e) => setData({ ...data, completed: e.target.checked })}
              className="h-5 w-5 text-cyan-700 border-gray-300 rounded"
            />
            <label htmlFor="completed" className="ml-3 text-sm text-gray-700">
              Mark as completed
            </label>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition duration-150"
            >
              Save Task
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition duration-150"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
