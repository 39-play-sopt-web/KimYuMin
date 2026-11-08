import { api } from './client'
import type { AuthorizationCodeResponse, IssueAuthorizationCodeRequest } from '../types/auth'

export async function issueAuthorizationCode(payload: IssueAuthorizationCodeRequest) {
  const response = await api
    .post('members/authorization-code', { json: payload })
    .json<AuthorizationCodeResponse>()

  if (!response.isSuccess || !response.data?.authorizationCode) {
    throw new Error(response.message || '회원 코드 발급에 실패했어요.')
  }

  return response.data
}
