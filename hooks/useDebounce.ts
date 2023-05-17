import { useRef, useEffect, useMemo } from "react";
import debounce from "../utils/debounce";
export default function useDebounce(callback) {
  const ref = useRef<() => void>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 500);
  }, []);

  return debouncedCallback;
}
