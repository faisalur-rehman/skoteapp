import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000/api",
})

export async function postData(endpoint, data) {
  return api.post(`${endpoint}`, {
    ...data,
  })
}
export async function formPostData(endpoint, data, token) {
  return api.post(
    `${endpoint}`,
    {
      ...data,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  )
}
export async function formGetData(endpoint, token) {
  return api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
}
export async function patchData(endpoint, id, data, token) {
  return api.patch(
    `${endpoint}/${id}`,
    { ...data },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  )
}
export async function deleteData(endpoint, id, token) {
  return api.patch(`${endpoint}/${id}`, {
    headers: {
      "x-auth-token": token,
    },
  })
}
