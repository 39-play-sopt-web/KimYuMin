import { useEffect, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { getAuthorizationCode } from '../lib/authStorage'

export default function ProtectedRoute() {
  const navigate = useNavigate()
  const authorizationCode = getAuthorizationCode()
  const hasAlerted = useRef(false)

  useEffect(() => {
    if (!authorizationCode && !hasAlerted.current) {
      hasAlerted.current = true
      window.alert('회원 코드를 발급받아주세요.')
      navigate('/auth')
    }
  }, [authorizationCode, navigate])

  return authorizationCode ? <Outlet /> : null
}
