import React, { useState } from 'react';
import { Car, Moon, Sun, LogOut } from 'lucide-react';
import DriverView from './DriverView';
import DispatcherView from './DispatcherView';
import AdminView from './AdminView';
import Login from './components/Login';

function App() {
  const [role, setRole] = useState(null); // 'driver', 'dispatcher', 'admin'
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    setRole(null);
  };

  if (!role) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="absolute top-4 right-4 z-50">
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        <Login onLogin={setRole} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>

      {/* Global Navigation Shell */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold text-lg text-blue-600 dark:text-blue-400">
            <Car className="w-6 h-6" />
            <span className="hidden sm:inline">Taxis Grenoble</span>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={handleLogout} className="flex items-center space-x-1 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">Déconnexion</span>
            </button>
          </div>
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
