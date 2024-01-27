export const config = {
  apiURL: process.env.REACT_APP_API_URL,
}

export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/