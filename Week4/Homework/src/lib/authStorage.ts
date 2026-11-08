import { PARTS } from '../types/auth'
import type { Part } from '../types/auth'

export function getAuthorizationCode() {
  return localStorage.getItem('authorizationCode')
}

export function saveAuthorizationCode(authorizationCode: string) {
  localStorage.setItem('authorizationCode', authorizationCode)
}

export function getPart() {
  const storedPart = localStorage.getItem('part')
  return PARTS.find((part) => part === storedPart) ?? null
}

export function savePart(part: Part) {
  localStorage.setItem('part', part)
}

export function clearAuth() {
  localStorage.removeItem('authorizationCode')
  localStorage.removeItem('part')
}
