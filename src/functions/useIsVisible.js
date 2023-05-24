import { useEffect } from "react";

const useIsVisible = (ref, setState) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      setState(entry.isIntersecting);
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);
};

export default useIsVisible;
