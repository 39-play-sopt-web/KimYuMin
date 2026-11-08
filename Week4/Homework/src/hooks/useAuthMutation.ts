import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { issueAuthorizationCode } from '../api/auth'
import { saveAuthorizationCode, savePart } from '../lib/authStorage'

export function useAuthMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: issueAuthorizationCode,
    onSuccess: (data, variables) => {
      saveAuthorizationCode(data.authorizationCode)
      savePart(variables.part)
      navigate('/posts')
    },
  })
}
