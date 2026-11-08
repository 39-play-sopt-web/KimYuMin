import ky from 'ky'
import { getAuthorizationCode } from '../lib/authStorage'

export const api = ky.create({
  prefix: import.meta.env.VITE_API_URL,
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const authorizationCode = getAuthorizationCode()
        if (authorizationCode) {
          request.headers.set('Authorization', authorizationCode)
        }
      },
    ],
  },
})
