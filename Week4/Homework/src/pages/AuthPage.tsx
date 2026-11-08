import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link } from "react-router";
import { useAuthMutation } from "../hooks/useAuthMutation";
import { PARTS } from "../types/auth";
import type { Part } from "../types/auth";

export default function AuthPage() {
  const [part, setPart] = useState<Part | "">("");
  const { mutate, isError } = useAuthMutation();

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!part) return;
    mutate({ part });
  }

  return (
    <section className="flex min-h-svh items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-semibold">회원 코드 발급</h1>
        <p className="mt-3 text-sm text-muted">
          파트를 선택하면 코드가 발급됩니다.
        </p>
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="flex gap-2">
            <select
              id="part"
              value={part}
              onChange={(event) => {
                const selectedPart = PARTS.find(
                  (value) => value === event.target.value,
                );
                setPart(selectedPart ?? "");
              }}
              className="field min-w-0 flex-1"
            >
              <option value="" disabled>
                파트 선택
              </option>
              {PARTS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={!part}
              className="button-primary shrink-0"
            >
              코드 발급
            </button>
          </div>
          {isError && (
            <p role="alert" className="text-sm text-danger mt-3">
              회원 코드 발급에 실패했어요.
            </p>
          )}
          <Link to="/posts" className="button-secondary mt-3 w-full">
            게시글 목록으로
          </Link>
        </form>
      </div>
    </section>
  );
}
