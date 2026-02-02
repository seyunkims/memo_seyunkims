import { useState, useEffect } from "react";
import MemoForm from "./components/MemoForm";
import Layout from "./components/layout/Layout";
import SearchBar from "./components/ui/SearchBar";
import MemoGrid from "./components/ui/MemoGrid";
import Modal from "./components/ui/Modal";
import type { Memo } from "./types";
import "./styles/App.css";

const MEMO_STORAGE_KEY = import.meta.env.VITE_MEMO_STORAGE_KEY;

interface ModalState {
    isOpen: boolean;
    title: string;
    message: string;
    type: "primary" | "danger";
    onConfirm: () => void;
}

function App() {
    // --- State ---
    const [memos, setMemos] = useState<Memo[]>(() => {
        const savedMemos = localStorage.getItem(MEMO_STORAGE_KEY);
        return savedMemos ? JSON.parse(savedMemos) : [];
    });

    const [view, setView] = useState<'NOTES' | 'TRASH'>('NOTES');
    const [searchQuery, setSearchQuery] = useState("");
    
    const [modal, setModal] = useState<ModalState>({
        isOpen: false,
        title: "",
        message: "",
        type: "primary",
        onConfirm: () => {},
    });

    // --- Effects ---
    useEffect(() => {
        localStorage.setItem(MEMO_STORAGE_KEY, JSON.stringify(memos));
    }, [memos]);

    // --- Modal Helpers ---
    const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

    const confirmAction = (title: string, message: string, onConfirm: () => void, type: "primary" | "danger" = "primary") => {
        setModal({ isOpen: true, title, message, type, onConfirm: () => { onConfirm(); closeModal(); } });
    };

    // --- Memo Actions ---
    const handleAddMemo = (content: string) => {
        const newMemo: Memo = {
            id: Date.now(),
            content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isDeleted: false,
            isPinned: false
        };
        setMemos([newMemo, ...memos]);
    };

    const handleUpdateMemo = (id: number, content: string) => {
        setMemos(memos.map(memo => memo.id === id ? { ...memo, content, updatedAt: new Date().toISOString() } : memo));
    };

    // Soft Delete (Move to Trash)
    const handleSoftDelete = (id: number) => {
        confirmAction("휴지통으로 이동", "이 메모를 휴지통으로 이동하시겠습니까?", () => {
            setMemos(memos.map(memo => memo.id === id ? { ...memo, isDeleted: true } : memo));
        }, "danger");
    };

    // Restore from Trash
    const handleRestore = (id: number) => {
        setMemos(memos.map(memo => memo.id === id ? { ...memo, isDeleted: false } : memo));
    };

    // Permanent Delete
    const handleDeleteForever = (id: number) => {
        confirmAction("영구 삭제", "이 메모를 영구적으로 삭제하시겠습니까? 되돌릴 수 없습니다.", () => {
            setMemos(memos.filter(memo => memo.id !== id));
        }, "danger");
    };

    // Empty Trash
    const handleEmptyTrash = () => {
        confirmAction("휴지통 비우기", "휴지통의 모든 메모를 삭제하시겠습니까?", () => {
            setMemos(memos.filter(memo => !memo.isDeleted));
        }, "danger");
    };

    // --- Computed Data ---
    const filteredMemos = memos
        .filter(memo => {
            const matchesView = view === 'TRASH' ? memo.isDeleted : !memo.isDeleted;
            const matchesSearch = memo.content.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesView && matchesSearch;
        })
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sort by new

    const trashCount = memos.filter(m => m.isDeleted).length;

    return (
        <Layout currentView={view} onViewChange={setView}>
            
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

            {view === 'NOTES' && (
                <div style={{ marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
                    <MemoForm onAddMemo={handleAddMemo} />
                </div>
            )}

            {view === 'TRASH' && trashCount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                     <button className="delete-all-button" onClick={handleEmptyTrash}>
                        휴지통 비우기
                    </button>
                </div>
            )}

            <MemoGrid 
                memos={filteredMemos} 
                onUpdateMemo={handleUpdateMemo}
                onDeleteMemo={view === 'TRASH' ? handleDeleteForever : handleSoftDelete}
                onRestoreMemo={handleRestore}
                isTrash={view === 'TRASH'}
            />

            <Modal
                isOpen={modal.isOpen}
                title={modal.title}
                message={modal.message}
                type={modal.type}
                confirmText="확인"
                cancelText="취소"
                onConfirm={modal.onConfirm}
                onCancel={closeModal}
            />
        </Layout>
    );
}

export default App;
