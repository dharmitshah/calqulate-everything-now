
import { useEffect, useState, useRef, RefObject } from 'react';

interface UseOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useOnScroll<T extends HTMLElement>(
  options: UseOnScrollOptions = {}
): [RefObject<T>, boolean] {
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    triggerOnce = true 
  } = options;
  
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(currentRef);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}

// Usage:
// 
// function Component() {
//   const [ref, isVisible] = useOnScroll<HTMLDivElement>();
//   return (
//     <div ref={ref} className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}>
//       Content here
//     </div>
//   );
// }
