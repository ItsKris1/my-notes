import { PropsWithChildren, useEffect, useRef } from "react";
import "./Modal.css";

export function Modal({
  children,
  onModalClose,
}: PropsWithChildren<{ onModalClose: () => void }>) {
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        childrenRef.current &&
        !childrenRef.current.contains(e.target as Node)
      ) {
        onModalClose();
      }
    }

    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, [onModalClose]);

  return (
    <div className="Modal">
      <div className="ModalContent" ref={childrenRef}>
        {children}
      </div>
    </div>
  );
}
