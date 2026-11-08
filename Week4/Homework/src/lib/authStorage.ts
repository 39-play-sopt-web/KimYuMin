export function getAuthorizationCode() {
  return localStorage.getItem('authorizationCode')
}

export function saveAuthorizationCode(authorizationCode: string) {
  localStorage.setItem('authorizationCode', authorizationCode)
}
