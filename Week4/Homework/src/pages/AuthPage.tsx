import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { Link } from 'react-router'
import { useAuthMutation } from '../hooks/useAuthMutation'
import { PARTS } from '../types/auth'
import type { Part } from '../types/auth'

export default function AuthPage() {
  const [part, setPart] = useState<Part | ''>('')
  const { mutate, isError } = useAuthMutation()

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!part) return
    mutate({ part })
  }

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold">회원 코드 발급</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-start gap-4">
        <label htmlFor="part">파트</label>
        <select
          id="part"
          value={part}
          onChange={(event) => {
            const selectedPart = PARTS.find((value) => value === event.target.value)
            setPart(selectedPart ?? '')
          }}
          className="border p-2"
        >
          <option value="" disabled>파트 선택</option>
          {PARTS.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>

        {isError && <p role="alert">회원 코드 발급에 실패했어요.</p>}

        <button
          type="submit"
          disabled={!part}
          className="border bg-primary px-4 py-2 transition-colors hover:bg-primary-hover"
        >
          코드 발급
        </button>
        <Link to="/posts" className="underline">게시글 목록으로</Link>
      </form>
    </section>
  )
}
