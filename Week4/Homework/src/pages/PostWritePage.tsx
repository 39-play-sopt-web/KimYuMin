import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { Link } from 'react-router'
import { useCreatePostMutation } from '../hooks/usePostMutations'
import type { CreatePostRequest } from '../types/post'

const LABELS = { title: '제목', content: '본문', author: '작성자' }
const LIMITS = { title: 50, content: 1000, author: 20 }

type Step = keyof CreatePostRequest

export default function PostWritePage() {
  const [step, setStep] = useState<Step>('title')
  const [form, setForm] = useState<CreatePostRequest>({ title: '', content: '', author: '' })
  const { mutate } = useCreatePostMutation()

  const value = form[step]
  const limit = LIMITS[step]
  const isTooLong = value.length > limit
  const isInvalid = !value.trim() || isTooLong

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isInvalid) return

    if (step === 'title') {
      setStep('content')
    } else if (step === 'content') {
      setStep('author')
    } else {
      mutate(form)
    }
  }

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold">게시글 작성</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-start gap-4">
        <label htmlFor={step}>{LABELS[step]}</label>
        {step === 'content' ? (
          <textarea
            id={step}
            value={value}
            onChange={(event) => setForm({ ...form, [step]: event.target.value })}
            aria-invalid={isTooLong}
            aria-describedby={isTooLong ? 'write-error content-count' : 'content-count'}
            className="min-h-40 w-full border p-2"
          />
        ) : (
          <input
            id={step}
            type="text"
            value={value}
            onChange={(event) => setForm({ ...form, [step]: event.target.value })}
            aria-invalid={isTooLong}
            aria-describedby={isTooLong ? 'write-error' : undefined}
            className="border p-2"
          />
        )}

        {step === 'content' && <p id="content-count">{value.length} / 1000</p>}
        {isTooLong && <p id="write-error" role="alert">{LABELS[step]}은 {limit}자 이하로 입력해주세요.</p>}

        <button type="submit" disabled={isInvalid} className="border px-4 py-2">
          {step === 'author' ? '작성' : '다음'}
        </button>
        <Link to="/posts" className="underline">게시글 목록으로</Link>
      </form>
    </section>
  )
}
