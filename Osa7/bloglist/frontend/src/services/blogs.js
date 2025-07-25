import axios from 'axios'
import storage from './storage'

const baseUrl = '/api/blogs'

const getConfit = () => ({
  headers: { Authorization: `Bearer ${storage.loadUser().token}` },
})

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const get = (id) => {
  const request = axios.get(`${baseUrl}/${id}`, getConfit())
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, getConfit())
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfit())
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfit())
  return response.data
}

const getUsers = async () => {
  const response = await axios.get('/api/users', getConfit())
  return response.data
}

const postComment = async (id, comment) => {
  const commentObject = {
    comment: comment,
  }
  const response = await axios.post(`${baseUrl}/${id}/comments`, commentObject, getConfit())
  return response.data
}

export default { getAll, create, update, remove, get, getUsers, postComment }
