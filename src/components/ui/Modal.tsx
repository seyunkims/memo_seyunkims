import { useEffect, useState } from "react";
import "../../styles/Modal.css";

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
      timer = window.setTimeout(() => {
        setIsVisible(true);
      }, 0);
    } else {
      timer = window.setTimeout(() => {
        setIsVisible(false);
      }, 300); // CSS transition duration과 동일
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // 완전히 닫힌 상태면 DOM에서 제거
  if (!isOpen && !isVisible) return null;

  return (
    <div
      className={`modal-overlay ${isVisible ? "show" : ""}`}
      onClick={onClose} // ✅ 배경 클릭 시 닫힘
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()} // 내부 클릭은 닫히지 않게
      >
        {children}
      </div>
    </div>
  );
}
