export const PARTS = ['WEB', 'iOS', 'ANDROID'] as const

export type Part = (typeof PARTS)[number]

export type IssueAuthorizationCodeRequest = {
  part: Part
}

export type AuthorizationCodeResponse = {
  isSuccess: boolean
  code: string
  message: string
  data: {
    authorizationCode: string
  } | null
}
