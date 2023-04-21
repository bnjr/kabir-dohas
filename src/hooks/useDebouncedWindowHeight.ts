import { useState, useEffect } from 'react';

function useDebouncedWindowHeight(debounceDelay: number) {
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    const debouncedHandleResize = debounce(handleResize, debounceDelay);

    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [debounceDelay]);

  return windowHeight;
}

function debounce(fn: () => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(), delay);
  };
}

export default useDebouncedWindowHeight;
