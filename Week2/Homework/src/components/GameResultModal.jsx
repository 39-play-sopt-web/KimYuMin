import { createPortal } from "react-dom";
import useModal from "../hooks/useModal";

export default function GameResultModal({ level, elapsed, onConfirm }) {
  const { dialogRef, preventClose } = useModal();

  return createPortal(
    <dialog
      ref={dialogRef}
      onCancel={preventClose}
      aria-labelledby="result-title"
      className="fixed inset-0 m-auto w-80 max-w-full rounded-2xl bg-card px-7 py-8 text-center text-primary backdrop:bg-primary/50"
    >
      <h2 id="result-title" className="mb-3 font-bold">🎉 Level {level} 클리어!</h2>
      <p className="text-3xl font-bold">{(elapsed / 1000).toFixed(2)}초</p>
      <button type="button" onClick={onConfirm} className="mt-6 w-full rounded-lg bg-selected py-2 font-bold">
        확인
      </button>
    </dialog>,
    document.body,
  );
}
