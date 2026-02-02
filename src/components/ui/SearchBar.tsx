import React from 'react';
import '../../styles/SearchBar.css';

interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
    return (
        <div className="search-bar-container">
            <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    className="search-input"
                    placeholder="검색"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchBar;
