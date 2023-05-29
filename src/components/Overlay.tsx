import { PropsWithChildren, useEffect, useRef } from "react";

export function Overlay({ children, onModalClose }: PropsWithChildren<{ onModalClose: () => void }>) {
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (childrenRef.current && !childrenRef.current.contains(e.target as Node)) {
        onModalClose();
      }
    }

    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, [onModalClose]);

  return (
    <div className="Overlay">
      <div className="children" ref={childrenRef}>
        {children}
      </div>
    </div>
  );
}
