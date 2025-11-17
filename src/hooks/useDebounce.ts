import { useState, useEffect, useRef } from "react";

const useDebounce = <T>(value: T, delay: number) => {
  const [debouncefunction, setDebounceFunction] = useState(value);
  const constantRef = useRef<number>(null);

  useEffect(() => {
    if (constantRef.current) {
      clearTimeout(constantRef.current);
    }
    constantRef.current = setTimeout(() => {
      setDebounceFunction(value);
    }, delay);
  }, [delay, value]);
  return debouncefunction;
};

export default useDebounce;
