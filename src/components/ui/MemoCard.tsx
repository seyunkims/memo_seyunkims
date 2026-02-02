import React, { useState } from 'react';
import type { Memo } from '../../types';
import '../../styles/MemoCard.css';

interface MemoCardProps {
    memo: Memo;
    onUpdateMemo: (id: number, content: string) => void;
    onDeleteMemo: (id: number) => void;
    onRestoreMemo?: (id: number) => void; // Optional for Trash view
    isTrash?: boolean;
}

const MemoCard: React.FC<MemoCardProps> = ({ 
    memo, 
    onUpdateMemo, 
    onDeleteMemo, 
    onRestoreMemo,
    isTrash = false 
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(memo.content);

    const handleSave = () => {
        const trimmed = editContent.trim();
        if(!trimmed) return;
        onUpdateMemo(memo.id, trimmed);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
            setEditContent(memo.content); 
        }
    };

    return (
        <div className={`memo-card ${isEditing ? 'editing' : ''}`}>
            {isEditing ? (
                <div className="memo-card-editor">
                    <textarea 
                        className="card-textarea"
                        value={editContent} 
                        onChange={(e) => setEditContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                    <div className="card-actions-edit">
                        <button onClick={handleSave} className="action-btn save">저장</button>
                        <button onClick={() => setIsEditing(false)} className="action-btn cancel">취소</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="memo-card-content" onClick={() => !isTrash && setIsEditing(true)}>
                        <p>{memo.content}</p>
                    </div>
                    <div className="memo-card-footer">
                        <span className="date">{new Date(memo.createdAt).toLocaleDateString()}</span>
                        
                        <div className="card-actions">
                            {isTrash ? (
                                <>
                                    <button 
                                        className="icon-btn restore" 
                                        title="복구"
                                        onClick={(e) => { e.stopPropagation(); onRestoreMemo?.(memo.id); }}
                                    >
                                        ♻️
                                    </button>
                                    <button 
                                        className="icon-btn delete-forever" 
                                        title="영구 삭제"
                                        onClick={(e) => { e.stopPropagation(); onDeleteMemo(memo.id); }}
                                    >
                                        ❌
                                    </button>
                                </>
                            ) : (
                                <button 
                                    className="icon-btn delete" 
                                    title="삭제" 
                                    onClick={(e) => { e.stopPropagation(); onDeleteMemo(memo.id); }}
                                >
                                    🗑️
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MemoCard;
