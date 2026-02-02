import { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: number | undefined;

    if (isOpen) {
      // 👉 effect 내부에서 동기 setState 금지 → 비동기로 분리
      timer = window.setTimeout(() => {
        setIsVisible(true);
      }, 0);
    } else {
      // 👉 닫힐 때 애니메이션 끝난 뒤 unmount
      timer = window.setTimeout(() => {
        setIsVisible(false);
      }, 300); // CSS transition duration과 동일
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  // 완전히 닫힌 상태면 DOM에서 제거
  if (!isOpen && !isVisible) return null;

  return (
    <div className={`modal-overlay ${isVisible ? "show" : ""}`}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
