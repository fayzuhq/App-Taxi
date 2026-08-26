import React, { useState } from 'react';
import { Car, PhoneCall, Building2, Moon, Sun } from 'lucide-react';
import DriverView from './DriverView';
import DispatcherView from './DispatcherView';
import AdminView from './AdminView';

function App() {
  const [role, setRole] = useState('driver'); // 'driver', 'dispatcher', 'admin'
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>

      {/* Global Navigation Shell */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold text-lg text-blue-600 dark:text-blue-400">
            <Car className="w-6 h-6" />
            <span className="hidden sm:inline">Taxis Grenoble</span>
          </div>

          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1 overflow-x-auto mx-2 flex-grow sm:flex-grow-0 justify-center">
            <button
              onClick={() => setRole('driver')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${role === 'driver' ? 'bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <Car className="w-4 h-4" />
              <span className="hidden sm:inline">Chauffeur</span>
            </button>
            <button
              onClick={() => setRole('dispatcher')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${role === 'dispatcher' ? 'bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <PhoneCall className="w-4 h-4" />
              <span className="hidden sm:inline">Standard</span>
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${role === 'admin' ? 'bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Direction</span>
            </button>
          </div>

          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto w-full">
        {role === 'driver' && <DriverView />}
        {role === 'dispatcher' && <DispatcherView />}
        {role === 'admin' && <AdminView />}
      </main>

    </div>
  );
}

export default App;
