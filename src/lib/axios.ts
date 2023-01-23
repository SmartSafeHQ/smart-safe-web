import axios from 'axios'

export const nextApiRoutes = axios.create({
  baseURL: '/api'
})

export const tokenverseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TOKENVERSE_API_URL
})
