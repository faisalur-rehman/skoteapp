import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000/api",
})

export async function postData(endpoint, data) {
  return api.post(`${endpoint}`, {
    ...data,
  })
}
