import { useEffect, useRef } from "react";

export default function useModal() {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();

    return () => dialog.close();
  }, []);

  function preventClose(event) {
    event.preventDefault();
  }

  return { dialogRef, preventClose };
}
