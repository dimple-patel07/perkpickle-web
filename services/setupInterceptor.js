import { getLocalAccessToken } from "./token"

const onRequest = (config) => {
  const token = getLocalAccessToken()
  if (config.headers) {
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    config.headers.identity = 'user'
  }
  return config
}

const onRequestError = (error) => Promise.reject(error)

const onResponse = (response) => response

const onResponseError = async (error) => Promise.reject(error)

export const setupInterceptorsTo = (axiosObj) => {
  axiosObj?.interceptors?.request?.use(onRequest, onRequestError)
  axiosObj?.interceptors?.response?.use(onResponse, onResponseError)
  return axiosObj
}