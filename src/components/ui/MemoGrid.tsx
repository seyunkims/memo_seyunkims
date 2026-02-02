import React from 'react';
import MemoCard from './MemoCard';
import type { Memo } from '../../types';
import '../../styles/MemoGrid.css';

interface MemoGridProps {
    memos: Memo[];
    onUpdateMemo: (id: number, content: string) => void;
    onDeleteMemo: (id: number) => void;
    onRestoreMemo?: (id: number) => void;
    isTrash?: boolean;
}

const MemoGrid: React.FC<MemoGridProps> = ({ 
    memos, 
    onUpdateMemo, 
    onDeleteMemo, 
    onRestoreMemo,
    isTrash = false
}) => {
    if (memos.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">{isTrash ? '🗑️' : '📝'}</div>
                <p>
                    {isTrash 
                        ? '휴지통이 비었습니다.' 
                        : '메모가 없습니다. 새로운 아이디어를 기록해보세요!'}
                </p>
            </div>
        );
    }

    return (
        <div className="memo-grid">
            {memos.map((memo) => (
                <MemoCard 
                    key={memo.id} 
                    memo={memo} 
                    onUpdateMemo={onUpdateMemo} 
                    onDeleteMemo={onDeleteMemo}
                    onRestoreMemo={onRestoreMemo}
                    isTrash={isTrash}
                />
            ))}
        </div>
    );
};

export default MemoGrid;
