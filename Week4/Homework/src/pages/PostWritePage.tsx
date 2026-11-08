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
    <section className="page-shell">
      <h1 className="text-xl font-semibold">게시글 작성</h1>
      <p className="my-5 text-sm text-muted">
        <span className={step === 'title' ? 'font-medium text-primary' : ''}>제목</span>
        {' → '}
        <span className={step === 'content' ? 'font-medium text-primary' : ''}>본문</span>
        {' → '}
        <span className={step === 'author' ? 'font-medium text-primary' : ''}>작성자</span>
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor={step} className="text-sm font-medium">{LABELS[step]}</label>
        {step === 'content' ? (
          <textarea
            id={step}
            value={value}
            onChange={(event) => setForm({ ...form, [step]: event.target.value })}
            aria-invalid={isTooLong}
            aria-describedby={isTooLong ? 'write-error content-count' : 'content-count'}
            className="field min-h-56 resize-y"
          />
        ) : (
          <input
            id={step}
            type="text"
            value={value}
            onChange={(event) => setForm({ ...form, [step]: event.target.value })}
            aria-invalid={isTooLong}
            aria-describedby={isTooLong ? 'write-error' : undefined}
            className="field"
          />
        )}

        {step === 'content' && <p id="content-count" className="text-right text-xs tabular-nums text-muted">{value.length} / 1000</p>}
        {isTooLong && <p id="write-error" role="alert" className="text-sm text-danger">{LABELS[step]}은 {limit}자 이하로 입력해주세요.</p>}

        <button type="submit" disabled={isInvalid} className="button-primary mt-2 self-end">
          {step === 'author' ? '작성' : '다음'}
        </button>
        <Link to="/posts" className="button-secondary self-end">게시글 목록으로</Link>
      </form>
    </section>
  )
}
