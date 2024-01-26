export const config = {
  apiURL: process.env.NEXT_PUBLIC_API_URL,
}

export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/