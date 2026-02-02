import React from 'react';
import '../../styles/Sidebar.css';

interface SidebarProps {
    currentView: 'NOTES' | 'TRASH';
    onViewChange: (view: 'NOTES' | 'TRASH') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>📒 Notepad</h2>
            </div>
            
            <nav className="sidebar-nav">
                <button 
                    className={`nav-item ${currentView === 'NOTES' ? 'active' : ''}`}
                    onClick={() => onViewChange('NOTES')}
                >
                    <span className="icon">💡</span>
                    <span className="label">메모 (Notes)</span>
                </button>
                
                <button 
                    className={`nav-item ${currentView === 'TRASH' ? 'active' : ''}`}
                    onClick={() => onViewChange('TRASH')}
                >
                    <span className="icon">🗑️</span>
                    <span className="label">휴지통 (Trash)</span>
                </button>
            </nav>

            <div className="sidebar-footer">
                <p>© 2026 Seyun Kim</p>
            </div>
        </aside>
    );
};

export default Sidebar;
