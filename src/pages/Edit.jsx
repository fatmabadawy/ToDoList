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
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Edit Task
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={onChange}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={data.description}
          onChange={onChange}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          type="date"
          name="due_date"
          value={data.due_date}
          onChange={onChange}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
        />

        <div className="flex items-center mb-4">
          <input
            id="completed"
            type="checkbox"
            checked={data.completed}
            onChange={(e) => setData({ ...data, completed: e.target.checked })}
            name="completed"
            className="mr-2"
          />
          <label htmlFor="completed" className="text-gray-700">
            Completed
          </label>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Update Task
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
