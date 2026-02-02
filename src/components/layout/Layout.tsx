import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
    currentView: 'NOTES' | 'TRASH';
    onViewChange: (view: 'NOTES' | 'TRASH') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange }) => {
    return (
        <div className="app-layout">
            <Sidebar currentView={currentView} onViewChange={onViewChange} />
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
