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
        title: 'Success',
        text: 'Task added successfully',
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
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={data.description}
            onChange={onChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="due_date" className="block text-gray-700 mb-2">
            Due Date
          </label>
          <input
            type="date"
            name="due_date"
            value={data.due_date}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="completed"
              checked={data.completed}
              onChange={(e) => setData({ ...data, completed: e.target.checked })}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Completed</span>
          </label>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150"
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition duration-150"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
