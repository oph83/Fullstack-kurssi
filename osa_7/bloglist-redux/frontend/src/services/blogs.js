import axios from 'axios'
import loggedUserService  from './loggedUser'

const baseUrl = '/api/blogs'

const config = () => {
  return {
    headers: {
      Authorization: `bearer ${loggedUserService.getToken()}`
    },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config())
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config())
  return response.data
}

const newComment = async (id, newObject) => {
  const response = await axios.post(`${baseUrl}/${id}/comments/`, newObject)
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, config())
}

export default { getAll, create, update, remove, newComment }