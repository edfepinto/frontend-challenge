import { useCallback, useEffect, useState } from "react";

interface CallbackValue {
  [key: string]: string;
}

export default function useDebouncedCallback(callback: (value: any) => void, delay: number) {
  const [timer, setTimer] = useState<number>();

  const debouncedCallback = useCallback((value: CallbackValue) => {
    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(() => {
        callback(value);
      }, delay)
    );
  }, [callback, delay]);

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return debouncedCallback;
}
