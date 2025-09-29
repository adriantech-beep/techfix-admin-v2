import { useEffect, useRef, type RefObject } from "react";

export function useOutsideClick<T extends HTMLElement>(
  handler: (event: MouseEvent) => void,
  listenCapturing: boolean = true
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current) return;

      if (ref.current.contains(e.target as Node)) return;

      if ((e.target as HTMLElement).closest("button[data-toggle]")) {
        return;
      }
      handler(e);
    }

    document.addEventListener("click", handleClick, listenCapturing);
    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
}
