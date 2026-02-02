import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
    currentView: 'NOTES' | 'TRASH';
    onViewChange: (view: 'NOTES' | 'TRASH') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange }) => {
    return (
        <div className="app-layout" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#18181b' }}>
            <Sidebar currentView={currentView} onViewChange={onViewChange} />
            <main className="main-content" style={{ flex: 1, padding: '24px 40px', overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
