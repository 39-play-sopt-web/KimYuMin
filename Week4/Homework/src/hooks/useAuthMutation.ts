import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { issueAuthorizationCode } from '../api/auth'
import { saveAuthorizationCode } from '../lib/authStorage'

export function useAuthMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: issueAuthorizationCode,
    onSuccess: (data) => {
      saveAuthorizationCode(data.authorizationCode)
      navigate('/posts')
    },
  })
}
