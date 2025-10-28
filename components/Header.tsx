
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path></svg>
         <h1 className="text-4xl font-extrabold tracking-widest text-gray-700 dark:text-gray-100 uppercase">
            Todo
         </h1>
      </div>
    </header>
  );
};

export default Header;
