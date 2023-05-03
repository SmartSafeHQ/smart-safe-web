import axios from 'axios'

export const nextApiRoutes = axios.create({
  baseURL: '/api'
})

export const smartSafeApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SMART_SAFE_API_URL
})
