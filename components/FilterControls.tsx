
import React from 'react';
import { FilterType } from '../types';

interface FilterControlsProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const FilterButton: React.FC<{
    currentFilter: FilterType;
    filterType: FilterType;
    onClick: (filter: FilterType) => void;
    children: React.ReactNode;
}> = ({ currentFilter, filterType, onClick, children }) => {
  const isActive = currentFilter === filterType;
  return (
    <button
      onClick={() => onClick(filterType)}
      className={`font-bold transition-colors duration-200 ${
        isActive
          ? 'text-primary'
          : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100'
      }`}
    >
      {children}
    </button>
  );
};


const FilterControls: React.FC<FilterControlsProps> = ({
  filter,
  setFilter,
  activeCount,
  completedCount,
  onClearCompleted,
}) => {
  return (
    <div className="flex items-center justify-between p-4 text-sm text-gray-500 dark:text-gray-400">
      <span>{activeCount} items left</span>
      <div className="hidden sm:flex items-center space-x-4">
        <FilterButton currentFilter={filter} filterType={FilterType.ALL} onClick={setFilter}>All</FilterButton>
        <FilterButton currentFilter={filter} filterType={FilterType.ACTIVE} onClick={setFilter}>Active</FilterButton>
        <FilterButton currentFilter={filter} filterType={FilterType.COMPLETED} onClick={setFilter}>Completed</FilterButton>
      </div>
      <button
        onClick={onClearCompleted}
        className="hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </div>
  );
};

export default FilterControls;
